import { IProductSize } from './';

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  size?: IProductSize;
  slug: string;
  title: string;
  gender: 'men'|'women'|'kid'|'unisex';
  quantity: number;
}
