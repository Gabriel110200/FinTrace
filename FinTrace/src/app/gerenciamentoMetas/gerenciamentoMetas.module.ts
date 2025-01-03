import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciamentoMetasComponent } from './gerenciamentoMetas.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../angular-material/material.module';
import { GerenciamentoMetasRoutingModule } from './gerenciamentoMetas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    GerenciamentoMetasRoutingModule
  ],
  declarations: [GerenciamentoMetasComponent]
})
export class GerenciamentoMetasModule { }
