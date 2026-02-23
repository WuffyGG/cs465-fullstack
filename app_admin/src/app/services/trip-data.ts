import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripData {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/api/';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + 'trips');
  }

  addTrip(formData: Trip): Observable<any> {
    return this.http.post(this.url + 'trips', formData);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + 'trips/' + tripCode);
  }

  updateTrip(tripCode: string, formData: Trip): Observable<any> {
    return this.http.put(this.url + 'trips/' + tripCode, formData);
  }
}
  
