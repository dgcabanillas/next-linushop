import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware( req: NextRequest | any, ev: NextFetchEvent ) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if ( !session ) {
    const requestedPage = req.page.name;
    const { origin } = req.nextUrl;
    return NextResponse.redirect(`${origin}/auth/login?p=${ requestedPage }`);
  }
  return NextResponse.next();
}