import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps, NextPage } from 'next';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { AuthLayout } from '../../source/components/layouts';
import { AuthContext } from '../../source/context';
import { validations } from '../../source/utils';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage: NextPage = () => {

  const router = useRouter();
  const { registerUser } = useContext( AuthContext );

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [ showError, setShowError ] = useState(false);

  const onRegisterForm = async( {  name, email, password }: FormData ) => {
    setShowError(false);
    const { hasError } = await registerUser(name, email, password);

    if ( hasError ) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    await signIn('credentials',{ email, password });
  }

  return (
    <AuthLayout title='LinuShop | Registrar'>
      <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Crear cuenta</Typography>
              <Chip
                label="No reconocemos ese usuario / contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex': 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth
                variant='filled'
                label='Nombre completo'
                { ...register('name', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
                error={ !!errors.name }
                helperText={ errors.name?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth
                type='email'
                label='Email' 
                variant='filled' 
                { ...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail
                })}
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth
                type='password' 
                label='Password' 
                variant='filled'
                { ...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                color='secondary' 
                className='circular-btn' 
                size='large'
                fullWidth
              >
                Registrar
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink 
                passHref
                href={`/auth/login${router.query.p ? `?p=${router.query.p}`: ''}`} 
              >
                <Link underline='always'>
                  ¿Ya tienes cuenta?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });
  const { p = '/' } = query;
  if ( session ) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default RegisterPage;