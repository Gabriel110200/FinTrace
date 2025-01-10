import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './homePage/homePage.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guard/authguard.guard';
import { CredenciaisGuard } from './shared/guard/credentials.guard';


const routes: Routes = [
  {path:'',component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'transacao', loadChildren:()=> import('./gerenciamentoTransacoes/gerenciamentoTransacoes.module').then(m=> m.GerenciamentoTransacoesModule), canActivate: [AuthGuard]},
  {path: 'categoria', loadChildren:()=> import('./gerenciamentoCategorias/gerenciamentoCategorias.module').then(m=> m.GerenciamentoCategoriasModule), canActivate: [AuthGuard]},
  {path: 'relatorio', loadChildren:()=> import('./dashboards/dashboards.module').then(m=> m.DashboardsModule), canActivate: [AuthGuard]},
  {path: 'metas', loadChildren:()=> import('./gerenciamentoMetas/gerenciamentoMetas.module').then(m=> m.GerenciamentoMetasModule), canActivate: [AuthGuard, CredenciaisGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
