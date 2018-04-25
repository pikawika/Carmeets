import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Meeting } from "./meeting.model";
import { MeetingDataService } from "../meeting-data.service";

@Injectable()
export class MeetingResolver implements Resolve<Meeting> {
    constructor(private _meetingDataService:MeetingDataService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Meeting> {
        return this._meetingDataService.getMeeting(route.params['id'])
    }
}