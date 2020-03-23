import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-login'
  }
})
export class LoginComponent implements OnInit {
  loginAndRegisterForm;
  errors: any = {};

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginAndRegisterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  login(): void {
    console.log(this.validateForm());
    if (!this.validateForm()) { return; }
    this.router.navigate(['/chat']);

    // TODO validate login information
    console.log('Login..');
  }

  register(): void {
    if (!this.validateForm()) { return; }
    this.router.navigate(['/chat']);

    // TODO register user and log user in
    console.log('Register..');
  }

  validateForm(): boolean {
    const errors: any = {};
    if (this.loginAndRegisterForm.get('email').errors) {
      errors.email = 'Please enter a valid E-Mail';
    }
    if (this.loginAndRegisterForm.get('password').errors) {
      errors.password = 'Password must be 5 characters';
    }

    if (Object.keys(errors).length !== 0) {
      this.errors = errors;
      return false;
    }

    this.errors = {};
    return true;
  }

}
