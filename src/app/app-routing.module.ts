import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { FormularioArticuloComponent } from './components/formulario-articulo/formulario-articulo.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticuloComponent } from './components/articulo/articulo.component';

const routes: Routes = [
  { path: '', component: TiendaComponent },
  { path: 'about', component: AboutComponent },
  { path: 'galeria', component: CarrouselComponent },
  { path: 'contacto', component: ContactoComponent }, 
  { path: 'admin', component: ArticulosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'registrar-articulo', component: FormularioArticuloComponent },
  { path: 'actualizar-articulo/:id', component: FormularioArticuloComponent },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'articulo/:id', component: ArticuloComponent },
  { path: '**', component: TiendaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
