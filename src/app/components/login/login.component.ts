import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FeathersService} from '../../services/feathersService/feathers.service';
import {AuthService} from '../../services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-login'
  }
})
export class LoginComponent implements OnInit {
  loginAndRegisterForm;
  errors: any = {};

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginAndRegisterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    this.authService.login().then(success => {
      if (success) {
        this.router.navigate(['/chat']);
      }
    });
  }

  login(): void {
    if (!this.validateForm()) { return; }

    const data = this.getFormData();

    this.authService.login(data).then( success => {
      if (success) {
        this.router.navigate(['/chat']);
      } else {
        this.errors.email = 'Wrong E-Mail or Password';
      }
    });
  }

  register() {
    if (!this.validateForm()) { return; }

    const data = this.getFormData();

    this.authService.register(data).then( success => {
      if (!success) {
        this.errors.email = 'Already registered';
      } else {
        this.router.navigate(['/chat']);
      }
    });
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

  getFormData() {
    return {
      email: this.loginAndRegisterForm.get('email').value,
      password: this.loginAndRegisterForm.get('password').value

    };
  }

}
