import { PedidoItemDto } from '../dtos/pedidoItemDto';

export enum ActionTypes {
  ADICIONAR_ITEM = 'ADICIONAR_ITEM',
  REMOVER_ITEM = 'REMOVER_ITEM',
  REINICIAR_CARRINHO = 'REINICIAR_CARRINHO',
  CONFIRMAR_PEDIDO = 'CONFIRMAR_PEDIDO',
}

export function adicionarPedidoItemAction(item: PedidoItemDto) {
  return {
    type: ActionTypes.ADICIONAR_ITEM,
    payload: {
      item,
    },
  };
}

export function removerPedidoItemAction(item: PedidoItemDto) {
  return {
    type: ActionTypes.REMOVER_ITEM,
    payload: {
      item,
    },
  };
}

export function reiniciarCarrinhoAction(itens: PedidoItemDto[]) {
  return {
    type: ActionTypes.REINICIAR_CARRINHO,
    payload: {
      itens,
    },
  };
}

export function confirmarPedidoAction() {
  return {
    type: ActionTypes.REINICIAR_CARRINHO    
  };
}