import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { environment as env} from 'src/environments/environment';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
  providers: [ArticuloService]
})
export class TiendaComponent implements OnInit {
  public articulos: Array<Articulo>;
  public url: string;
  constructor(private _articuloService: ArticuloService) {
    this.url = env.API_URL;
    this.articulos = [];
  }

  ngOnInit(): void {
    this.getArticulos();
  }
  getArticulos() {
    this._articuloService.getArticulos().subscribe(
      response => {
        if (response.articulos) {
          console.log(response);
          this.articulos = response.articulos;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
