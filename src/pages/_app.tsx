import type { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';
import { Container, Header } from '../styles/pages/app';

import logoImg from '../assets/logo.svg';
import Image from 'next/image';
import Head from 'next/head';
import { CartButton } from '../components/cartButton';
import { PedidoContextProvider } from '../contexts/pedidoContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();
  const router = useRouter();

  const showCartList = !router.asPath.includes('/success');

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <PedidoContextProvider>
          <Header>
            <Link href="/" prefetch={false}>
              <Image src={logoImg} alt="" />
            </Link>
            {showCartList && <CartButton />}
          </Header>

          <Component {...pageProps} />
        </PedidoContextProvider>
      </Container>
    </>
  );
}
