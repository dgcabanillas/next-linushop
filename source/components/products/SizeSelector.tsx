import { PropsWithChildren } from 'react';
import { Box, Button } from '@mui/material';
import { IProductSize } from '../../interfaces';

interface IProps {
  selectedSize: IProductSize;
  sizes: IProductSize[];
}

export const SizeSelector = ({ selectedSize, sizes }: PropsWithChildren<IProps>) => {
  return (
    <Box>
      {
        sizes.map(size => (
          <Button
            key={size}
            size='small'
            color={selectedSize === size ? 'primary' : 'info'}
          >
            { size }
          </Button>
        ))
      }
    </Box>
  )
}
