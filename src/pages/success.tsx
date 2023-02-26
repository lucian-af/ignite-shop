import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import Stripe from 'stripe';
import { PedidoContext } from '../contexts/pedidoContext';
import { stripe } from '../lib/stripe';
import { ImageContainer, ImageItem, SuccessContainer } from '../styles/pages/success';

type Product = {
  name: string;
  imageUrl: string;
  productId: string;
};

type SuccessProps = {
  customerName: string;
  products: Product[];
};

export default function Success({ customerName, products }: SuccessProps) {
  const { confirmarPedido, pedidoItems } = useContext(PedidoContext);

  if (pedidoItems.length > 0 && products.length > 0) {
    confirmarPedido();
  }

  const productsImages = distinctProducts();

  function distinctProducts(): Product[] {
    return products.reduce(
      (objRetorno: any, product: Product, i: any, a: any) => {
        if (!objRetorno[0][product.productId]) {
          objRetorno[1].push((objRetorno[0][product.productId] = product));
        }
        if (i < a.length - 1) {
          return objRetorno;
        } else {
          return objRetorno[1];
        }
      },
      [{}, []],
    );
  }

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <ImageContainer>
          {productsImages.map((product: Product) => {
            return (
              <ImageItem key={product.productId}>
                <Image src={product.imageUrl} width={120} height={110} alt="" />
              </ImageItem>
            );
          })}
        </ImageContainer>
        <h1>Compra efetuada!</h1>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length}{' '}
          camisetas já está a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const customerName = session.customer_details.name;
  const products = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product;
    return {
      productId: product.id,
      name: product.description,
      imageUrl: product.images[0],
    };
  });

  return {
    props: {
      customerName,
      products,
    },
  };
};
