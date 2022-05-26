import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../source/components/layouts'
import { IOrder } from '../../source/interfaces';
import { DBOrders } from '../../source/database';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
  { 
    field: 'paid', 
    headerName: 'Pagada',  
    description: 'Muestra información si está pagada la orden o no',
    width: 140,
    renderCell: (params: GridValueGetterParams) => {
      return (
        params.row.paid
          ? <Chip color='success' label='Pagado' variant='outlined'/>
          : <Chip color='error' label='No pagado' variant='outlined'/>
      )
    }
  },
  {
    field: 'id',
    headerName: 'Ver orden',
    width: 100,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline='always'>
            revisar
          </Link>
        </NextLink>
      )
    }
  }
]

interface IProps {
  orders: IOrder[]
}

const HistoryPage: NextPage<IProps> = ({ orders }) => {

  const rows = orders.map((order, index) => ({
    id: index + 1,
    paid: order.isPaid,
    fullname: `${ order.shippingAddress.firstName } ${ order.shippingAddress.lastName }`,
    orderId: order._id
  }))

  return (
    <ShopLayout
      title='LinuShop | Historial de órdenes'
      pageDescription='Historial de órdenes del cliente'
    >
      <Typography variant='h1' component='h1'>Historial de órdenes</Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });
  if ( !session ) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      }
    }
  }

  const orders = await DBOrders.getOrdersByUser( session.user._id );

  return {
    props: {
      orders
    }
  }
}

export default HistoryPage;