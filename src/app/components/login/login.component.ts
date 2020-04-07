import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/authService/auth.service';
import {AuthFacade} from '../../states/facade/authFacade';

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
    private authFacade: AuthFacade
  ) {}

  ngOnInit() {
    this.createFormGroup();

    if (localStorage.getItem('auth')) {
      this.authFacade.login();
    }

    this.authFacade.getErrors().subscribe( err => {
      this.errors = err;
    });
  }

  createFormGroup() {
    this.loginAndRegisterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  submitLogin() {
    if (!this.validateForm()) { return; }
    const data = this.getFormData();
    this.authFacade.login(data);
  }

  submitRegister() {
    if (!this.validateForm()) { return; }
    const data = this.getFormData();
    this.authFacade.register(data);
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
      this.authFacade.addErrors(errors);
      return false;
    }
    this.authFacade.addErrors({});
    return true;
  }

  getFormData() {
    return {
      email: this.loginAndRegisterForm.get('email').value,
      password: this.loginAndRegisterForm.get('password').value

    };
  }

}
