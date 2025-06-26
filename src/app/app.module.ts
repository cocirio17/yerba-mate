import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YerbaListadoComponent } from './yerba-listado/yerba-listado.component';
import { FormsModule } from '@angular/forms';
import { YerbaContactosComponent } from './yerba-contactos/yerba-contactos.component';
import { YerbaYerbasComponent } from './yerba-yerbas/yerba-yerbas.component';
import { YerbaCarritoComponent } from './yerba-carrito/yerba-carrito.component';
import { InputNumeroComponent } from './input-numero/input-numero.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ConsejosComponent } from './consejos/consejos.component';

@NgModule({
  declarations: [
    AppComponent,
    YerbaListadoComponent,
    YerbaContactosComponent,
    YerbaYerbasComponent,
    YerbaCarritoComponent,
    InputNumeroComponent,
    HomeComponent,
    ConsejosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
