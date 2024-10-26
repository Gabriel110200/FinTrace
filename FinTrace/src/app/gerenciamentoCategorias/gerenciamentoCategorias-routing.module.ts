import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { GerenciamentoCategoriasComponent } from "./gerenciamentoCategorias.component";

const routes: Routes = [
  { path: '', component:GerenciamentoCategoriasComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciamentoCategoriasRoutingModule { }