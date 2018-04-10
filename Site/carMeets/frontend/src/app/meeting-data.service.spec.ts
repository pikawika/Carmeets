import { TestBed, inject } from '@angular/core/testing';

import { MeetingDataService } from './meeting-data.service';

describe('MeetingDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetingDataService]
    });
  });

  it('should be created', inject([MeetingDataService], (service: MeetingDataService) => {
    expect(service).toBeTruthy();
  }));
});
