import { Injectable } from '@angular/core';
import { ArticuloPedido, ArticuloPedidoDetalle } from '../models/articulo-pedido';
import { Articulo } from '../models/articulo.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  public articulos: Array<ArticuloPedidoDetalle>;
  constructor() { 
    this.articulos = [];
  }
  addToCart(articulo: Articulo, cantidad: number) {
    this.articulos = JSON.parse(localStorage.getItem('articulos') || '[]');
    const existe = this.articulos.find(item => item.articulo._id === articulo._id);
    if (existe) {
      existe.cantidad += cantidad;
    } else {
      this.articulos.push({
        articulo,
        cantidad
      });
    }
    localStorage.setItem('articulos', JSON.stringify(this.articulos));
  }

  getItems() {
    this.articulos = JSON.parse(localStorage.getItem('articulos') || '[]');
    return this.articulos;
  }

  getItemsSave() {
    this.articulos = JSON.parse(localStorage.getItem('articulos') || '[]');
    const articulosCut: ArticuloPedido[] = this.articulos.map(item => { 
      return {
        idArticulo: item.articulo._id,
        cantidad: item.cantidad
      }
    });
    return articulosCut;
  }

  getItemCount() {
    this.articulos = JSON.parse(localStorage.getItem('articulos') || '[]');
    let count = this.articulos.reduce((prev, curr) => {
      return prev + curr.cantidad;
    }, 0);
    return count;
  }

  clearCart() {
    this.articulos = [];
    localStorage.removeItem('articulos');
    return this.articulos;
  }
  
  getTotal() {
    let total = 0;
    this.getItems();
    this.articulos.forEach((item) => {
      total += item.articulo.precio * item.cantidad;
    });
    return total;
  }
}
