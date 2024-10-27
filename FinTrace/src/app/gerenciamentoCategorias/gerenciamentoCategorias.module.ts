import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciamentoCategoriasComponent } from './gerenciamentoCategorias.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../angular-material/material.module';
import { GerenciamentoCategoriasRoutingModule } from './gerenciamentoCategorias-routing.module';
import { TabelaCategoriasComponent } from './tabelaCategorias/tabelaCategorias.component';
import { CadCategoriaComponent } from './cadCategoria/cadCategoria.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    GerenciamentoCategoriasRoutingModule
  ],
  declarations: [
    GerenciamentoCategoriasComponent,
    TabelaCategoriasComponent,
    CadCategoriaComponent
  ]
})
export class GerenciamentoCategoriasModule { }
