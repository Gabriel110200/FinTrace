import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const user = localStorage.getItem('usuario');

    if (user) {
      // Usuário está logado, permite o acesso
      return true;
    } else {
      // Usuário não está logado, redireciona para a página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
