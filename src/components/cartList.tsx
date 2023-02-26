import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import Image from 'next/image';
import { X } from 'phosphor-react';
import { useContext, useState } from 'react';
import { PedidoContext } from '../contexts/pedidoContext';
import { PedidoItemDto } from '../dtos/pedidoItemDto';
import { formatCurrency } from '../lib/formatCurrency';
import {
  Content,
  CloseButton,
  Title,
  Product,
  ProductImage,
  ProductContent,
  Summary,
  CartEmpty,
  List,
} from '../styles/components/cartList';

export function CartList() {
  const {
    pedidoItems,
    removerPedidoItem,
    valorTotalCarrinho,
    quantidadeItensCarrinho,
    carrinho,
  } = useContext(PedidoContext);
  const [isRedirectCheckout, setRedirectCheckout] = useState(false);

  const totalItens = quantidadeItensCarrinho();
  const valorTotal = formatCurrency(valorTotalCarrinho());

  function handleRemoverItem(item: PedidoItemDto) {
    removerPedidoItem(item);
  }

  async function handleBuyProduct() {
    setRedirectCheckout(true);

    try {
      const itens = carrinho();
      const response = await axios.post('/api/checkout', {
        itens,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      alert('Falha ao redirecionar para o checkout!');
    }
  }

  function cartEmpty() {
    return (
      <>
        <CartEmpty>Carrinho vazio!</CartEmpty>
      </>
    );
  }

  return (
    <Dialog.Portal>
      <Content>
        <CloseButton asChild>
          <X size={24} />
        </CloseButton>

        {totalItens <= 0 ? (
          cartEmpty()
        ) : (
          <>
            <Title>Sacola de compras</Title>

            <List>
              {pedidoItems.map((item) => {
                return (
                  <Product key={item.id}>
                    <ProductImage>
                      <Image
                        src={item.imageUrl}
                        width={95}
                        height={95}
                        alt=""
                      />
                    </ProductImage>
                    <ProductContent>
                      <p>{item.description}</p>
                      <span>{formatCurrency(item.price)}</span>
                      <button onClick={() => handleRemoverItem(item)}>
                        Remover
                      </button>
                    </ProductContent>
                  </Product>
                );
              })}
            </List>

            <Summary>
              <div>
                <span>Quantidade</span>
                <span>
                  {totalItens > 1
                    ? `${totalItens} itens`
                    : `${totalItens} item`}
                </span>
              </div>

              <div>
                <span>Valor total</span>
                <span>{valorTotal}</span>
              </div>

              <button disabled={isRedirectCheckout} onClick={handleBuyProduct}>
                Finalizar compra
              </button>
            </Summary>
          </>
        )}
      </Content>
    </Dialog.Portal>
  );
}
