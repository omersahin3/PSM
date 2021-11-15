import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"
import { TokenStorageService } from "../services/token-storage.service";

@Injectable()
export class LoginGuard implements CanActivate{
    constructor(private tokenStorage: TokenStorageService, private router: Router){}
    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
        let logged = !!this.tokenStorage.getToken();
        if (logged){
            return true;
        }
        this.router.navigate(['/login/'])
        return false;
    }
}