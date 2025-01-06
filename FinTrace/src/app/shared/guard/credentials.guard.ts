import { FeatureFlag } from './../model/featureFlag';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../service/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CredenciaisGuard implements CanActivate {

  constructor(
    private shared: SharedService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    // Retorna o Observable que será resolvido com base na flag
    return this.shared.obterFeaturesUsuario().pipe(
      map((flags: FeatureFlag[]) => {
        // Encontrar a Feature A
        const featureA = flags.find(flag => flag.name === 'Feature A');

        if (featureA && featureA.active) {
          return true; // Permite o acesso se a Feature A estiver ativa
        } else {
          this.router.navigate(['/']); // Redireciona para a página inicial caso não tenha permissão
          return false; // Bloqueia o acesso
        }
      })
    );
  }

}
