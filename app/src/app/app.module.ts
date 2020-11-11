import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstadoListaComponent } from './pages/estado-lista/estado-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { EstadoService } from './services/estado.service';
import { CidadeListaComponent } from './pages/cidade-lista/cidade-lista.component';
import { CidadeService } from './services/cidade.service';
import { EstadoCadastroComponent } from './pages/estado-cadastro/estado-cadastro.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { CidadeCadastroComponent } from './pages/cidade-cadastro/cidade-cadastro.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    EstadoListaComponent,
    TableComponent,
    CidadeListaComponent,
    EstadoCadastroComponent,
    CidadeCadastroComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule
  ],
  providers: [
    EstadoService,
    CidadeService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) public readonly platformId: any,
  ) {}
 }
