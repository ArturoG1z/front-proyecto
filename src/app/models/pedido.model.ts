import { ArticuloPedido } from './articulo-pedido';

export class Pedido {
  constructor(
    public _id: string,
    public usuario: string,
    public fecha: string,
    public total: number,
    public descuento: number,
    public articulos: ArticuloPedido[]
  ){}
}


