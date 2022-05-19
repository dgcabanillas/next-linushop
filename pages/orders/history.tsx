import { NextPage } from 'next';
import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../source/components/layouts'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100, sortable: false },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300, sortable: false },
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

const rows = [
  { id: 1, paid: true, fullname: 'Diego Cabanillas' },
  { id: 2, paid: false, fullname: 'Maricarmen Castro' },
  { id: 3, paid: false, fullname: 'Nicol Campos' },
  { id: 4, paid: true, fullname: 'Dayanna Rodriguez' },
  { id: 5, paid: false, fullname: 'Azucena Cabanillas' }
]

const HistoryPage: NextPage = () => {
  return (
    <ShopLayout
      title='LinuShop | Historial de órdenes'
      pageDescription='Historial de órdenes del cliente'
    >
      <Typography variant='h1' component='h1'>Historial de órdenes</Typography>

      <Grid container>
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

export default HistoryPage