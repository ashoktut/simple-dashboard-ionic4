import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Auth } from './auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  title = 'PAINEL DE CONTROLE';

  auth = new Auth();
  authForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    // INSERE AS VALIDAÇÕES NO FORMULÁRIO
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });

    if (this.authService.checkAuth() === true) {
      console.log('token: ' + localStorage.getItem('token'));

      this.router.navigate(['/dashboard']);
    }

  }

  ionViewWillEnter() {

    this.submitted = false;

    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });

  }

  // EFETUA A VALIDAÇÃO DA AUTENTIFICAÇÃO
  validarAuth() {

    this.submitted = true;

    console.log(this.authForm.value);

    this.authService.validarAuth(this.authForm.value)
      .pipe()
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/dashboard']);
          return res;
        },
        err => {
          console.log(err);
          this.submitted = false;
          return err;
        }
      );

  }

}
