import { Component, OnInit } from '@angular/core';
import { ArticuloPedidoDetalle } from 'src/app/models/articulo-pedido';
import { Pedido } from 'src/app/models/pedido.model';
import { CarritoService } from 'src/app/services/carrito.service';
import { environment as env} from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { PedidoService } from 'src/app/services/pedido.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  providers: [CarritoService, PedidoService],
})
export class CarritoComponent implements OnInit {
  public articulos: Array<ArticuloPedidoDetalle>;
  public totalCarrito: number;
  public pedido: Pedido;
  public articulosSave: string;
  public url: string;
  constructor(
    private _carritoService: CarritoService,
    private _pedidoService: PedidoService,
    private datePipe: DatePipe
  ) {
    this.articulos = [];
    this.totalCarrito = 0;
    this.url = env.API_URL;
    this.pedido = new Pedido('', '', '', 0, 0, []);
    this.articulosSave = '';
  }

  ngOnInit(): void {
    this.articulos = this._carritoService.getItems();
    this.totalCarrito = this._carritoService.getTotal();
    const date = new Date();
    this.pedido.fecha = this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  onSubmit(form: NgForm) {
    this.pedido.total = this.totalCarrito;
    this.pedido.usuario = form.value.usuario;
    this.pedido.articulos = this._carritoService.getItemsSave();
    this._pedidoService.savePedido(this.pedido).subscribe(
      (res: any) => {
        console.log(res);
        this.vaciarCarrito();
        form.reset();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  vaciarCarrito() {
    this._carritoService.clearCart();
    this.articulos = [];
    this.totalCarrito = 0;
  }
}
