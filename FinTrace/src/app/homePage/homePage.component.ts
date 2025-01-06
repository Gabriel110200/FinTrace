import { FeatureFlag } from './../shared/model/featureFlag';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared/service/shared.service';

@Component({
  selector: 'app-homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {

  usuario:string = this.sharedService.obterUsuario()
  flags$!:Subscription
  flags!:FeatureFlag[]
  carregando!:boolean

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregando = true
    this.flags$ = this.sharedService.obterFeaturesUsuario().subscribe(
      (dado) => {
        this.flags = dado
        this.carregando = false
      }
    )
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  transacoes(){
    this.router.navigate(['/transacao'])
  }

  categorias(){
    this.router.navigate(['/categoria'])
  }

  relatorio(){
    this.router.navigate(['/relatorio'])
  }

  metas(){
    this.router.navigate(['/metas'])
  }

  possuiCredencial(feature:string){
    console.log(this.flags)
    const ff = this.flags.filter(
      (dado) => {
        return dado.name == feature
      }
    )

    console.log(ff)

    if(ff.length > 0){
      return ff[0].active
    } else {
      return false
    }
  }
}
