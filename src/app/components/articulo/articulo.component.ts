import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { Articulo } from 'src/app/models/articulo.model';
import { ActivatedRoute } from '@angular/router';
import { environment as env } from '../../../environments/environment';
import { CarritoService } from 'src/app/services/carrito.service';
@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
  providers: [CarritoService]
})
export class ArticuloComponent implements OnInit {
  public articulo: Articulo;
  public url: string;
  public cantidad: number;
  public descripcionConSaltos: string;
  public totalCarrito: number;
  constructor(
    private _articuloService: ArticuloService,
    private _carritoService: CarritoService,
    private route: ActivatedRoute
  ) {
    this.articulo = new Articulo('', '', '', '', '', 0, 0, '', '');
    this.url = env.API_URL;
    this.descripcionConSaltos = '';
    this.cantidad = 1;
    this.totalCarrito = 0;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idArticulo = routeParams.get('id');
    if (idArticulo) {
      this._articuloService.getArticulo(idArticulo).subscribe(
        (response: any) => {
          this.articulo = response.articulo;
          this.descripcionConSaltos = this.articulo.descripcion.replace(
            /\n/g,
            '<br>'
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.totalCarrito = this._carritoService.getTotal();
  }

  addToCart(articulo: Articulo) {
    this._carritoService.addToCart(articulo, this.cantidad);
    window.alert('Tu producto a sido agregado al carrito!');
    this.totalCarrito = this._carritoService.getTotal();
  }
}
