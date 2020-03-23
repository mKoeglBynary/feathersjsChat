import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginAndRegisterForm;
  errors: any = {};
  constructor() {}

  ngOnInit(): void {
    this.loginAndRegisterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  login() {
    this.validateForm();
    console.log('Login..');
  }

  register() {
    this.validateForm();
    console.log('Register..');
  }

  validateForm() {
    const errors: any = {};
    if (this.loginAndRegisterForm.get('email').errors) {
      errors.email = 'Please enter a valid E-Mail';
    }
    if (this.loginAndRegisterForm.get('password').errors) {
      errors.password = 'Password must be 5 characters';
    }

    if (errors) {
      this.errors = errors;
      return false;
    }

    this.errors = {};
    return true;
  }

}
