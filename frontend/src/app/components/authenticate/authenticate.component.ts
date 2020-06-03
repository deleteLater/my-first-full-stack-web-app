import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../services/account.service';

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
    private router: Router,
    private route: ActivatedRoute,
    private account: AccountService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(action: string) {
    if (action !== 'login' && action !== 'register') {
      return;
    }

    if (action === 'login') {
      this.account.login(this.loginForm.value)
        .subscribe(_ =>
          this.router.navigate([this.route.snapshot.queryParamMap.get('returnUrl') || '/'])
            .then(result => `navigate to home: ${result}`)
        );
    } else if (action === 'register') {
    }
  }
}
