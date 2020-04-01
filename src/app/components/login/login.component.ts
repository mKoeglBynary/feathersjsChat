import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/authService/auth.service';
import {ActiveUserFacade} from '../../states/facade/activeUserFacade';

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
    private authService: AuthService,
    private activeUserFacade: ActiveUserFacade
  ) {}

  async ngOnInit() {
    this.loginAndRegisterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    if (localStorage.getItem('auth')) {
      await this.login();
    }
  }

  async login(data?, error?) {
    await this.authService.login(data);
    this.activeUserFacade.getLoggedIn().subscribe(async isLoggedIn => {
      if (isLoggedIn) {
        await this.router.navigate(['/chat']);
      } else {
        this.errors = {...error};
      }
    });
  }

  async submitLogin() {
    const errors = { email: 'Wrong E-Mail or Password'};
    if (!this.validateForm()) { return; }

    const data = this.getFormData();
    await this.login(data, errors );
  }

  async submitRegister() {
    const errors = { email: 'Already registered'};
    if (!this.validateForm()) { return; }

    const data = this.getFormData();
    await this.authService.register(data);
    await this.login(data, errors);
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
