import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Resolve } from "src/app/can-activate";
import { ServersService } from "../servers.service";

interface Server {
    id: number,
    name: string,
    status: string
}

// If you want to inject the service in the another service, we use this decorator.
@Injectable()
export class ServerResolver implements 
    Resolve<Server> {
        constructor(private serversService: ServersService) {}

        resolve(
            route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
            return this.serversService.getServer(+route.params['id']);
        }
}