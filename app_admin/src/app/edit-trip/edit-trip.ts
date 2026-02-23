import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css',
})
export class EditTrip implements OnInit {
  editForm!: FormGroup;
  submitted = false;

  tripCode: string = '';
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tripCode = localStorage.getItem('tripCode') || '';

    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.tripDataService.getTrip(this.tripCode).subscribe({
      next: (value: Trip[]) => {
        if (value && value.length > 0) {
          this.editForm.patchValue(value[0]);
        } else {
          this.message = 'Trip not found';
          console.log(this.message);
        }
        this.cdr.detectChanges();
      },
      error: (error: any) => console.log('Error: ' + error)
    });
  }

  get f() {
    return this.editForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.tripCode, this.editForm.value as Trip).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (error: any) => console.log('Error: ' + error)
      });
    }
  }
}