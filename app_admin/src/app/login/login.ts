import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Authentication } from '../services/authentication';
import { User } from '../user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  formError: string = '';
  credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private authenticationService: Authentication,
    private router: Router
  ) {}

  public onLoginSubmit(): void {
  this.formError = '';

  if (!this.credentials.email || !this.credentials.password) {
    this.formError = 'All fields required, please try again';
    return;
  }

  const user: User = {
    name: this.credentials.name,
    email: this.credentials.email
  } as User;

  this.authenticationService.login(user, this.credentials.password)
    .subscribe({
      next: () => {
        // ✅ now token is saved, navbar will flip
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.formError = 'Login failed. Check email/password and try again.';
      }
    });
}
}