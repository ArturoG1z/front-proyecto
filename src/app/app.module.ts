import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AboutComponent } from './components/about/about.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { FormularioArticuloComponent } from './components/formulario-articulo/formulario-articulo.component';
import { ArticulosComponent } from './components/articulos/articulos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarritoComponent,
    TiendaComponent,
    ContactoComponent,
    AboutComponent,
    AdminpanelComponent,
    FormularioArticuloComponent,
    ArticulosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
