import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from '../models/pedido.model';
import { Observable } from 'rxjs/Observable';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  public url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = env.API_URL;
  }
  
  savePedido(pedido: Pedido): Observable<any> {
    let params = JSON.stringify(pedido);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + 'pedidos/', params, {headers: headers});
  }
  
  getPedidos(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.url + 'pedidos/', {headers: headers});
  }

  getPedido(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.url + 'pedidos/' + id, {headers: headers});
  }

  updatePedido(pedido: Pedido): Observable<any> {
    let params = JSON.stringify(pedido);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.patch(this.url + 'pedidos/' + pedido._id, params, {headers: headers});
  }
}
