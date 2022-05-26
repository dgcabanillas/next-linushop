import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { IProductSize } from '../../interfaces';

interface IProps {
  selectedSize?: IProductSize;
  sizes: IProductSize[];
  onSelectedSize: (size: IProductSize) => void;
}

export const SizeSelector: FC<IProps> = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box>
      {
        sizes.map(size => (
          <Button
            key={size}
            size='small'
            color={selectedSize === size ? 'primary' : 'info'}
            onClick={() => onSelectedSize(size)}
          >
            { size }
          </Button>
        ))
      }
    </Box>
  )
}
