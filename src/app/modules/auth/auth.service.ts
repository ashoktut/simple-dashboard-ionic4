import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Auth } from './auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioLogado: boolean;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // VERIFICA SE USUÁRIO ESTÁ LOGADO
  checkAuth() {
    return (this.usuarioLogado === true || localStorage.getItem('token') !== null);
    // return true;
  }

  // EFETUA O LOGIN DO USUÁRIO
  validarAuth(auth: Auth) {
    // DADOS DO LOGIN
    const body = 'username=' + auth.username + '&password=' + auth.password + '&grant_type=password';

    return this.http.post<any>(`${environment.apiUrl}oauth/token`, body)
      .pipe(map(response => {

        console.log(response);

        // CASO O LOGIN SEJA EFETUADO COM SUCESSO
        if (response && response.status) {

          this.usuarioLogado = true;

          // ARMAZENA TOKEN E NOME DO USUÁRIO
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('usuarioNome', auth.username);

        } else {
          this.usuarioLogado = false;
          console.log('login erro');
        }

        return response;
      }));
  }

  // DESCONECTA O USUÁRIO
  logoutAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioNome');

    this.router.navigate(['/login']);

    return true;
  }

}
