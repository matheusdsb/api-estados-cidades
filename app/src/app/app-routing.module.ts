import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoListaComponent } from './pages/estado-lista/estado-lista.component';
import { CidadeListaComponent } from './pages/cidade-lista/cidade-lista.component';
import { EstadoCadastroComponent } from './pages/estado-cadastro/estado-cadastro.component';
import { CidadeCadastroComponent } from './pages/cidade-cadastro/cidade-cadastro.component';

const routes: Routes = [
  { path: 'estados', component: EstadoListaComponent },
  { path: 'estados/cadastro', component: EstadoCadastroComponent },
  { path: 'estados/editar/:id', component: EstadoCadastroComponent },
  { path: 'cidades', component: CidadeListaComponent },
  { path: 'cidades/cadastro', component: CidadeCadastroComponent },
  { path: 'cidades/editar/:id', component: CidadeCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
