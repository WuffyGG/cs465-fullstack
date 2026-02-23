import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';
import { Router } from '@angular/router';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripData]
})
export class TripListing implements OnInit {

  trips: Trip[] = [];
  message: string = '';

  constructor(
  private tripDataService: TripData,
  private cdr: ChangeDetectorRef,
  private router: Router
) {
  console.log('trip-listing constructor');
}

public addTrip(): void {
  this.router.navigate(['add-trip']);
}

  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          this.cdr.detectChanges();

          if (value.length > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          } else {
            this.message = 'There were no trips retrieved from the database';
          }

          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}