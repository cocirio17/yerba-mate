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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { ConsejosComponent } from './consejos/consejos.component';
import { YerbaDetalleComponent } from './yerba-detalle/yerba-detalle.component';
import { YerbaComprarComponent } from './yerba-comprar/yerba-comprar.component';
import { YerbaCarritoComponent } from './yerba-carrito/yerba-carrito.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ScrollRevealDirective } from './scroll-reveal.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RitualComponent } from './ritual/ritual.component';

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
    YerbaComprarComponent,
    LoginComponent,
    RegistroComponent,
    MiCuentaComponent,
    ReviewsComponent,
    AdminComponent,
    ForgotPasswordComponent,
    ScrollRevealDirective,
    RitualComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
