import { Injectable } from "@angular/core";
import { 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    UrlTree 
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { CanDeactivate } from "src/app/can-activate";


export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(
        component: CanComponentDeactivate, 
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot, 
        nextState: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            return component.canDeactivate();
        }
}