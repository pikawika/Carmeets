import { Pipe, PipeTransform } from '@angular/core';
import { Meeting } from './meeting/meeting.model';

@Pipe({
  name: 'meetingFilter'
})
export class MeetingFilterPipe implements PipeTransform {

  transform(meetings: Meeting[], name: string): Meeting[] {
    if (!name || name.length === 0) {
      return meetings;
    }
    return meetings.filter(meet =>
      meet.name.toLowerCase().includes(name.toLowerCase())
    );
  }

}
