import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  @Input() trip: any;

  constructor(
    private router: Router,
    private authenticationService: Authentication
  ) {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public editTrip(): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', this.trip.code);
    this.router.navigate(['edit-trip']);
  }
}