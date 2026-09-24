import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YerbaListadoComponent } from './yerba-listado/yerba-listado.component';
import { YerbaContactosComponent } from './yerba-contactos/yerba-contactos.component';
import { YerbaYerbasComponent } from './yerba-yerbas/yerba-yerbas.component';
import { HomeComponent } from './home/home.component';
import { YerbaDetalleComponent } from './yerba-detalle/yerba-detalle.component';
import { YerbaCarritoComponent } from './yerba-carrito/yerba-carrito.component';
import { YerbaComprarComponent } from './yerba-comprar/yerba-comprar.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RitualComponent } from './ritual/ritual.component';
import { ConsejosComponent } from './consejos/consejos.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  { path: 'listado', component: YerbaYerbasComponent },
  { path: 'contacto', component: YerbaContactosComponent, data: { animation: 'contacto' } },
  { path: 'ritual', component: RitualComponent, data: { animation: 'ritual' } },
  { path: 'consejos', component: ConsejosComponent, data: { animation: 'consejos' } },
  { path: 'producto/:id', component: YerbaDetalleComponent },
  { path: 'carrito', component: YerbaCarritoComponent },
  { path: 'comprar', component: YerbaComprarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-password', component: ForgotPasswordComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mi-cuenta', component: MiCuentaComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
