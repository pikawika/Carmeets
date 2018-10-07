import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "../../authentication.service";
import { Meeting } from "../../../meeting/meeting.model";

@Injectable()
export class GoingMeetingsResolver implements Resolve<Meeting[]> {
    constructor(private authenticationService: AuthenticationService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Meeting[]> {
        return this.authenticationService.getGoingMeetings()
    }
}