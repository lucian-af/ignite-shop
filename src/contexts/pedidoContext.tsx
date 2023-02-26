import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { CarrinhoDto, PedidoItemDto } from '../dtos/pedidoItemDto';
import useStorage from '../hooks/useStorage';
import {
  adicionarPedidoItemAction,
  removerPedidoItemAction,
  reiniciarCarrinhoAction,
  confirmarPedidoAction,
} from '../reducers/actions';
import { pedidosReducer } from '../reducers/reducers';

type PedidoContextType = {
  pedidoItems: PedidoItemDto[];
  adicionarPedidoItem: (item: PedidoItemDto) => void;
  removerPedidoItem: (item: PedidoItemDto) => void;
  confirmarPedido: () => void;
  valorTotalCarrinho: () => number;
  quantidadeItensCarrinho: () => number;
  carrinho: () => CarrinhoDto[];
};

export const PedidoContext = createContext({} as PedidoContextType);

type PedidoContextProviderProps = {
  children: ReactNode;
};

export function PedidoContextProvider({
  children,
}: PedidoContextProviderProps) {
  const { getItem, setItem, removeItem } = useStorage();
  const [init, setInit] = useState('');
  const [pedidoState, dispatch] = useReducer(
    pedidosReducer,
    {
      pedidoItems: [],
    },
    () => {
      setInit(getItem('@ignite-shop:1.0.0', 'local'));

      return {
        pedidoItems: [],
      };
    },
  );

  const { pedidoItems } = pedidoState;

  function adicionarPedidoItem(item: PedidoItemDto) {
    dispatch(adicionarPedidoItemAction(item));
  }

  function removerPedidoItem(item: PedidoItemDto) {
    dispatch(removerPedidoItemAction(item));
  }

  function valorTotalCarrinho(): number {
    const valorTotal =
      pedidoItems.reduce(
        (acc: number, next: PedidoItemDto) => acc + next.price,
        0,
      ) ?? 0;

    return valorTotal;
  }

  function carrinho(): CarrinhoDto[] {
    return pedidoItems.map((item: PedidoItemDto) => {
      return {
        priceId: item.priceId,
        quantity: item.quantity,
      } as CarrinhoDto;
    });
  }

  function quantidadeItensCarrinho(): number {
    return pedidoItems.length;
  }

  function confirmarPedido() {
    removeItem('@ignite-shop:1.0.0', 'local');
    setInit('');
    dispatch(confirmarPedidoAction());
  }

  useEffect(() => {
    if (init) {
      const items: PedidoItemDto[] = JSON.parse(init);

      if (items.length > 0) {
        dispatch(reiniciarCarrinhoAction(items));
      }
    }
  }, [init]);

  useEffect(() => {
    const items = JSON.stringify(pedidoItems);
    setItem('@ignite-shop:1.0.0', items, 'local');
  }, [pedidoItems, setItem]);

  return (
    <PedidoContext.Provider
      value={{
        pedidoItems,
        adicionarPedidoItem,
        removerPedidoItem,
        confirmarPedido,
        valorTotalCarrinho,
        quantidadeItensCarrinho,
        carrinho,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
