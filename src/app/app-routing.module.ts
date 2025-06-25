import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YerbaListadoComponent } from './yerba-listado/yerba-listado.component';
import { YerbaContactosComponent } from './yerba-contactos/yerba-contactos.component';
import { YerbaYerbasComponent } from './yerba-yerbas/yerba-yerbas.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: YerbaListadoComponent },
  { path: 'listado', component: YerbaYerbasComponent },
  { path: 'contacto', component: YerbaContactosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
