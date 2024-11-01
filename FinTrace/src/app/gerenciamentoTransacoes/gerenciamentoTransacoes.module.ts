import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../angular-material/material.module";
import { CadTransacaoComponent } from "./cadTransacao/cadTransacao.component";
import { GerenciamentoTransacoesComponent } from "./gerenciamentoTransacoes.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { GerenciamentoTransacoesRoutingModule } from "./gerenciamentoTransacoes-routing.module";
import { TabelaTransacoesComponent } from "./tabelaTransacoes/tabelaTransacoes.component";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    GerenciamentoTransacoesRoutingModule
  ],
  declarations: [
    GerenciamentoTransacoesComponent,
    CadTransacaoComponent,
    TabelaTransacoesComponent
  ]
})
export class GerenciamentoTransacoesModule { }
