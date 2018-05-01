import { Pipe, PipeTransform } from '@angular/core';
import { Meeting } from './meeting/meeting.model';

@Pipe({
  name: 'meetingFilter'
})
export class MeetingFilterPipe implements PipeTransform {

  transform(meetings: Meeting[], name: string, startDate: Date, endDate: Date): Meeting[] {
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

    return filterMeetingsLijst;
  }

}
