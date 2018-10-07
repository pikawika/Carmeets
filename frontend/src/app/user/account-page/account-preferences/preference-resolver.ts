import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "../../authentication.service";

@Injectable()
export class PreferenceResolver implements Resolve<string[]> {
    constructor(private authenticationService: AuthenticationService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<string[]> {
        return this.authenticationService.getPreferences()
    }
}