import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) {
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<any>(`${environment.apiUrl}api/usuario`);
  }

  getUsuario(usuarioId: number): Observable<Usuario> {
    return this.http.get<any>(`${environment.apiUrl}api/usuario/${usuarioId}`);
  }

  postUsuario(usuario: Usuario) {
    return this.http.post<any>(`${environment.apiUrl}api/usuario`, usuario);
  }

  putUsuario(usuarioId: number, usuario: Usuario) {
    return this.http.put<any>(`${environment.apiUrl}api/usuario/${usuarioId}`, usuario);
  }

  deleteUsuario(usuarioId: number) {
    return this.http.delete<any>(`${environment.apiUrl}api/usuario/${usuarioId}`);
  }

}
