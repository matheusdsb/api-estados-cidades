import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Inject, PLATFORM_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstadoListaComponent } from './pages/estado-lista/estado-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { EstadoService } from './services/estado.service';
import { CidadeListaComponent } from './pages/cidade-lista/cidade-lista.component';
import { CidadeService } from './services/cidade.service';

@NgModule({
  declarations: [
    AppComponent,
    EstadoListaComponent,
    TableComponent,
    CidadeListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [EstadoService, CidadeService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) public readonly platformId: any,
  ) {}
 }
