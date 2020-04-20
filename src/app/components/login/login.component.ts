import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthFacade} from '../../states/facade/authFacade';
import {buttonClickedAnimations} from '../../animations/loginButtons';
import {InputControls} from '../../interfaces/input-controls';
import {User} from '../../interfaces/user';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {LanguageSetting} from '../../configs/language-settings.config';

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

export class LoginComponent implements OnInit, OnDestroy {
  private readonly _onDestroy = new Subject();
  loginAndRegisterForm: FormGroup;
  errors: string;
  email: InputControls;
  password: InputControls;
  registerClicked = false;
  loginClicked = false;

  constructor(
    private readonly _authFacade: AuthFacade,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('auth')) {
      this._authFacade.login();
    }
    this.createFormGroup();

    this._authFacade.getErrors()
      .pipe(takeUntil(this._onDestroy))
      .subscribe( (err) => {
      this.errors = err;
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  createFormGroup(): void {
    this.loginAndRegisterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    this.email = {
      formControl: this.loginAndRegisterForm.get('email') as FormControl,
      name: 'email',
      label: 'LOGIN.EMAIL',
      errors: [
        { name: 'required', text: 'LOGIN.ERRORS.EMAIL.REQUIRED'},
        { name: 'email', text: 'LOGIN.ERRORS.EMAIL.INVALID'}]
    };

    this.password = {
      formControl: this.loginAndRegisterForm.get('password') as FormControl,
      name: 'password',
      label: 'LOGIN.PASSWORD',
      type: 'password',
      errors: [
        { name: 'required', text: 'LOGIN.ERRORS.PASSWORD.REQUIRED'},
        { name: 'minlength', text: 'LOGIN.ERRORS.PASSWORD.MINLENGTH'}]
    };

  }

  submitLogin(): void {
    if (!this.validateForm()) { return; }

    const data: Partial<User> = this.getFormData();
    this._authFacade.login(data);
  }

  async submitRegister(): Promise<void> {
    if (!this.validateForm()) { return; }

    const language: LanguageSetting = await this._authFacade.getLanguage().pipe(take(1)).toPromise();
    const data: Partial<User> = this.getFormData();
    data.language = language;

    this._authFacade.register(data);
  }

  resetErrors(): void {
    if (this.errors && this.errors.length > 0) {
      this._authFacade.addErrors('');
    }
  }

  validateForm(): boolean {
    this.loginAndRegisterForm.markAllAsTouched();
    return !this.loginAndRegisterForm.invalid;
  }

  getFormData(): Partial<User> {
    return {
      email: this.loginAndRegisterForm.get('email').value,
      password: this.loginAndRegisterForm.get('password').value,
      language: ''
    };
  }

  get isAuthError(): boolean {
    return this.errors && this.errors.length && this.validateForm();
  }

}
