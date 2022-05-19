import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../source/database';
import { Product } from '../../source/models';

type Data = { message: string }

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
  if( process.env.NODE_ENV === 'production' ) {
    return res.status(401).json({ message: 'Acceso restringido' });
  }

  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(seedDatabase.initialData.products);

  await db.disconnect();

  res.status(200).json({ message: 'Proceso realizado correctamente' })
}