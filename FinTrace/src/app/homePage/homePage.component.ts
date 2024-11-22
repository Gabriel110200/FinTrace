import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/service/shared.service';

@Component({
  selector: 'app-homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {

  usuario:string = this.sharedService.obterUsuario()

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
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
}
