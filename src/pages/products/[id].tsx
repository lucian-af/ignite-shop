import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useState } from 'react';
import Stripe from 'stripe';
import { PedidoContext } from '../../contexts/pedidoContext';
import { PedidoItemDto } from '../../dtos/pedidoItemDto';
import { formatCurrency } from '../../lib/formatCurrency';
import { stripe } from '../../lib/stripe';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product';

type ProductProps = {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
  };
};

export default function Products({ product }: ProductProps) {
  // TODO: adicionar produto na sacola - abrir sacola ?
  const { adicionarPedidoItem, carrinho } = useContext(PedidoContext);

  function handleAdicionarItemCarrinho(item: any) {
    adicionarPedidoItem({
      description: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      priceId: item.defaultPriceId,
      quantity: 1,
    } as PedidoItemDto);
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatCurrency(product.price)}</span>
          <p>{product.description}</p>
          <button onClick={() => handleAdicionarItemCarrinho(product)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  const umaHora = 60 * 60 * 1;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: umaHora,
  };
};
