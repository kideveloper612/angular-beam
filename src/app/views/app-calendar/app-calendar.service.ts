import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarEventDB } from '../../shared/inmemory-db/calendarEvents';
import { Observable, of } from 'rxjs';
import { marcoCalendarEvent } from '../../shared/models/event.model';
import { map } from 'rxjs/operators';

@Injectable()
export class AppCalendarService {
  public events: marcoCalendarEvent[];
  constructor(
    private http: HttpClient
  ) {}

  public getEvents(): Observable<marcoCalendarEvent[]> {
    // return this.http.get('api/calendar/events')
    // .map((events: CalendarEvent[]) => {
    //   this.events = events;
    //   return events;
    // });

    let eventDB = new CalendarEventDB();
    return of(eventDB.events)
      .pipe(
        map(events => {
          this.events = events;
          return events;
        })
      );
  }

  public addEvent(event): Observable<marcoCalendarEvent[]> {
    // return this.http.post('api/calendar/events', event)
    // .map((events: marcoCalendarEvent[]) => {
    //   this.events = events;
    //   return events;
    // });

    this.events.push(event);
    return of(this.events);
  }

  public updateEvent(event): Observable<marcoCalendarEvent[]> {
    // return this.http.put('api/calendar/events/'+event._id, event)
    // .map((events: marcoCalendarEvent[]) => {
    //   this.events = events;
    //   return events;
    // });

    this.events = this.events.map(e => {
      if(e._id === event._id) {
        return Object.assign(e, event);
      }
      return e;
    });
    return of(this.events);
  }

  public deleteEvent(eventID: string): Observable<marcoCalendarEvent[]> {
    // return this.http.delete('api/calendar/events/'+eventID)
    // .map((events: marcoCalendarEvent[]) => {
    //   this.events = events;
    //   return events;
    // });

    this.events = this.events.filter(e => e._id !== eventID);
    return of(this.events);
  }



}

