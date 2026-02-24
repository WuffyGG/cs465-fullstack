import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../user';
import { AuthResponse } from '../auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripData {

  baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl + '/trips');
  }

  addTrip(formData: Trip): Observable<any> {
    return this.http.post(this.baseUrl + '/trips', formData);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl + '/trips/' + tripCode);
  }

  updateTrip(tripCode: string, formData: Trip): Observable<any> {
    return this.http.put(this.baseUrl + '/trips/' + tripCode, formData);
  }

  // Call to our /login endpoint, returns JWT
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Call to our /register endpoint, creates user and returns JWT
  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  // helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {

    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(
      this.baseUrl + '/' + endpoint,
      formData
    );
  }
}