import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoListaComponent } from './pages/estado-lista/estado-lista.component';
import { CidadeListaComponent } from './pages/cidade-lista/cidade-lista.component';

const routes: Routes = [
  { path: 'estados', component: EstadoListaComponent },
  { path: 'cidades', component: CidadeListaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
