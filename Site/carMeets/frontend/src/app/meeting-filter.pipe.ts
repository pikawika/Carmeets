import { Pipe, PipeTransform } from '@angular/core';
import { Meeting } from './meeting/meeting.model';

@Pipe({
  name: 'meetingFilter',
  pure: false
})
export class MeetingFilterPipe implements PipeTransform {

  transform(meetings: Meeting[], name: string, startDate: Date, endDate: Date, soortenMeetingsFilter: string[]): Meeting[] {
    //indien nog niet volledig geladen
    if (!meetings){
      return null;
    }

    let filterMeetingsLijst = meetings;

    if (name && name.length !== 0) {
      filterMeetingsLijst = filterMeetingsLijst.filter(meet =>
        meet.name.toLowerCase().includes(name.toLowerCase())
      );
    } 

    if (startDate && startDate != null) {
      filterMeetingsLijst = filterMeetingsLijst.filter(meet =>
        new Date(meet.date) >= new Date(startDate));
    }

    if (endDate && endDate != null) {
      filterMeetingsLijst = filterMeetingsLijst.filter(meet =>
        new Date(meet.date) <= new Date(endDate));
    }

    //als een meeting 1 categorie uit lijst heeft toon ze
    if (soortenMeetingsFilter && (soortenMeetingsFilter.length > 0) && (soortenMeetingsFilter != null)){
      console.log("test")
      filterMeetingsLijst = filterMeetingsLijst.filter(meet =>
        meet.categories.some(eenCategorie=> soortenMeetingsFilter.includes(eenCategorie)));
    }

    return filterMeetingsLijst;
  }

}
