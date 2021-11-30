import { Articulo } from "./articulo.model";

export interface ArticuloPedido {
  idArticulo: string;
  cantidad: number;
}

export interface ArticuloPedidoDetalle {
  articulo: Articulo;
  cantidad: number;
}