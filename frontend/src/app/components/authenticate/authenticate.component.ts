import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.max(15)]],
    password: ['', Validators.required]
  });

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.max(15)]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  hidePwd = true;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(action: string) {
    if (action !== 'login' && action !== 'register') {
      return;
    }

    console.log(this.loginForm.value);

    this.router.navigate([''])
      .then(result => `navigate to home: ${result}`);
  }
}
