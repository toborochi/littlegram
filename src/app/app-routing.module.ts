import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './componentes/inicio/inicio.component';
import {EditorComponent} from './componentes/editor/editor.component';
import {DashboardComponent} from './componentes/dashboard/dashboard.component';

const routes: Routes = [
  {
    component: EditorComponent,
    path:'editor/:id'
  },
  {
    component: DashboardComponent,
    path:'dashboard'
  },
  {
    component: InicioComponent,
    path: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
