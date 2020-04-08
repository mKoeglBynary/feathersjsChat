import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthFacade} from '../../states/facade/authFacade';
import {buttonClickedAnimations} from '../../animations/loginButtons';
import {InputControls} from '../../interfaces/inputControls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    buttonClickedAnimations
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-login'
  }
})

export class LoginComponent implements OnInit {
  loginAndRegisterForm;
  errors;
  email: InputControls;
  password: InputControls;
  registerClicked = false;
  loginClicked = false;

  constructor(
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
    this.email = {
      formControl: this.loginAndRegisterForm.get('email'),
      name: 'email',
      label: 'E-Mail',
      type: 'text',
      errors: [
        { name: 'required', text: 'E-Mail is required'},
        { name: 'email', text: 'Must be a valid E-Mail'}]
    };
    this.password = {
      formControl: this.loginAndRegisterForm.get('password'),
      name: 'password',
      label: 'Password',
      type: 'password',
      errors: [
        { name: 'required', text: 'Password is required'},
        { name: 'minlength', text: 'Must be min. 5 characters'}]
    };

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

  resetErrors() {
    if (!this.errors || this.errors.length === 0) {
      return;
    }
    this.authFacade.addErrors('');
  }

  validateForm(): boolean {
    this.loginAndRegisterForm.markAllAsTouched();
    return !this.loginAndRegisterForm.invalid;
  }

  getFormData() {
    return {
      email: this.loginAndRegisterForm.get('email').value,
      password: this.loginAndRegisterForm.get('password').value
    };
  }

  get isAuthError(): boolean {
    return this.errors && this.errors.length && this.validateForm();
  }

}
