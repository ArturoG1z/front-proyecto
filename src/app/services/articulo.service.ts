import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Articulo } from '../models/articulo.model';
import { Observable } from 'rxjs/Observable';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  public url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = env.API_URL;
  }
  
  saveArticulo(articulo: Articulo): Observable<any> {
    let params = JSON.stringify(articulo);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + 'articulos/', params, {headers: headers});
  }
  
  getArticulos(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.url + 'articulos/', {headers: headers});
  }

  getArticulo(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.url + 'articulos/' + id, {headers: headers});
  }

  updateArticulo(articulo: Articulo): Observable<any> {
    let params = JSON.stringify(articulo);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.patch(this.url + 'articulos/' + articulo._id, params, {headers: headers});
  }

  deleteArticulo(articulo: Articulo): Observable<any> {
    let params = JSON.stringify(articulo);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.http.delete(this.url + 'articulos/' + articulo._id, {headers: headers});
  }
}
