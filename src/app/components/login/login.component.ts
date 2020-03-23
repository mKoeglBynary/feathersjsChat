import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginAndRegisterForm;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.loginAndRegisterForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit(buttonType: string) {
    if (buttonType === 'login') {
      console.log('login');
    } else {
      console.log('register');
    }
  }

}
