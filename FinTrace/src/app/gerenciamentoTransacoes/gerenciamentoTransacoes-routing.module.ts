import { NgModule } from "@angular/core";
import { GerenciamentoTransacoesComponent } from "./gerenciamentoTransacoes.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', component:GerenciamentoTransacoesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciamentoTransacoesRoutingModule { }