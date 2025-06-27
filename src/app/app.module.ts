import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YerbaListadoComponent } from './yerba-listado/yerba-listado.component';
import { FormsModule } from '@angular/forms';
import { YerbaContactosComponent } from './yerba-contactos/yerba-contactos.component';
import { YerbaYerbasComponent } from './yerba-yerbas/yerba-yerbas.component';
import { InputNumeroComponent } from './input-numero/input-numero.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ConsejosComponent } from './consejos/consejos.component';
import { YerbaDetalleComponent } from './yerba-detalle/yerba-detalle.component';
import { YerbaComprarComponent } from './yerba-comprar/yerba-comprar.component';
import { YerbaCarritoComponent } from './yerba-carrito/yerba-carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    YerbaListadoComponent,
    YerbaContactosComponent,
    YerbaYerbasComponent,
    YerbaCarritoComponent,
    InputNumeroComponent,
    HomeComponent,
    ConsejosComponent,
    YerbaDetalleComponent,
    YerbaComprarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
