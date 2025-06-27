import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YerbaListadoComponent } from './yerba-listado/yerba-listado.component';
import { YerbaContactosComponent } from './yerba-contactos/yerba-contactos.component';
import { YerbaYerbasComponent } from './yerba-yerbas/yerba-yerbas.component';
import { HomeComponent } from './home/home.component';
import { YerbaDetalleComponent } from './yerba-detalle/yerba-detalle.component';
import { YerbaCarritoComponent } from './yerba-carrito/yerba-carrito.component';
import { YerbaComprarComponent } from './yerba-comprar/yerba-comprar.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'listado', component: YerbaYerbasComponent },
  { path: 'contacto', component: YerbaContactosComponent },
  { path: 'producto/:id', component: YerbaDetalleComponent },
  { path: 'carrito', component: YerbaCarritoComponent },
  { path: 'comprar', component: YerbaComprarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
