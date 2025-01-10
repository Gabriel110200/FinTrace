import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciamentoMetasComponent } from './gerenciamentoMetas.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../angular-material/material.module';
import { GerenciamentoMetasRoutingModule } from './gerenciamentoMetas-routing.module';
import { CadMetasComponent } from './cadMetas/cadMetas.component';
import { GerMetasComponent } from './gerMetas/gerMetas.component';
import { TabelaMetasComponent } from './tabelaMetas/tabelaMetas.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    GerenciamentoMetasRoutingModule,
    ChartModule,
  ],
  declarations: [
    GerenciamentoMetasComponent,
    CadMetasComponent,
    GerMetasComponent,
    TabelaMetasComponent
  ]
})
export class GerenciamentoMetasModule { }
