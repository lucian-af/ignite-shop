import * as Dialog from '@radix-ui/react-dialog';
import { Handbag } from 'phosphor-react';
import { useContext } from 'react';
import { CartList } from '../components/cartList';
import { PedidoContext } from '../contexts/pedidoContext';
import { CartAmount, CartContainer } from '../styles/components/cartButton';

export function CartButton() {
  const { quantidadeItensCarrinho } = useContext(PedidoContext);

  const quantidadeItens = quantidadeItensCarrinho();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartContainer>
          <Handbag size={32} />
          <CartAmount show={quantidadeItens > 0}>
            {quantidadeItens || ''}
          </CartAmount>
        </CartContainer>
      </Dialog.Trigger>

      <CartList />
    </Dialog.Root>
  );
}
