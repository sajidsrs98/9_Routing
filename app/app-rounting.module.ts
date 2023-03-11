import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";

import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

// : tells angular that it is dynamic.
const appRoute: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, 
        children: [
        { path: ':id/:name', component: UserComponent },
    ]},
    { path: 'servers', 
        // canActivate: [AuthGuard], 
        canActivateChild: [AuthGuard], 
        component: ServersComponent, 
        children: [
        { path: ':id', 
            component: ServerComponent,
            resolve: {
                server: ServerResolver
            } },
        { path: ':id/edit', 
            component: EditServerComponent,
            canDeactivate: [CanDeactivateGuard] },
    ]},
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', 
        component: ErrorPageComponent,
        data: {message : "Page not found!"} },
    { path: '**', redirectTo: '/not-found' }
  ]

@NgModule({
    // # informs the web server which actually renders our website before angular 
    // that only care about the part in the URL before hashtag, So all the parts 
    // thereaftr will be ignored by your web server hence this will run even after 
    // servers which don't return the index html file in case of 404 error Because 
    // they will only care about the path in front of hashtag.
    // And part after the hashtag can be parsed by your client by Angular.
    imports: [
        RouterModule.forRoot(
            appRoute, 
            {useHash: true}
            )
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}