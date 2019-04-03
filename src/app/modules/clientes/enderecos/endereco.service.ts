import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Endereco } from './endereco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  protected clienteId: number;

  constructor(
    private http: HttpClient
  ) { }

  // DEFINE O ID DO CLIENTE
  setClienteId(value) {
    this.clienteId = value;
  }

  // OBTEM OS ENDEREÇOS DOS CLIENTE
  getClienteEnderecos(): Observable<Endereco[]> {
    return this.http.get<any>(`${environment.apiUrl}api/cliente/${this.clienteId}/endereco`);
  }

  // OBTEM UM ENDEREÇO PELO ID
  getClienteEndereco(enderecoId: number): Observable<Endereco> {
    return this.http.get<any>(`${environment.apiUrl}api/cliente/${this.clienteId}/endereco/${enderecoId}`);
  }

  // CADASTRA UM ENDEREÇO
  postClienteEndereco(endereco: Endereco) {
    return this.http.post<any>(`${environment.apiUrl}api/cliente/${this.clienteId}/endereco`, endereco);
  }

  // EDITA UM ENDEREÇO
  putClienteEndereco(endereco: Endereco, enderecoId: number) {
    return this.http.put<any>(`${environment.apiUrl}api/cliente/${this.clienteId}/endereco/${enderecoId}`, endereco);
  }

  // DELETA UM ENDEREÇO PELO ID
  deleteClienteEndereco(enderecoId: number) {
    return this.http.delete<any>(`${environment.apiUrl}api/cliente/${this.clienteId}/endereco/${enderecoId}`);

  }

}
