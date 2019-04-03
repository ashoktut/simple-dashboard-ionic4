import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { }

  // OBTEM OS CLIENTES
  getClientes(params): Observable<Cliente[]> {
    return this.http.get<any>(`${environment.apiUrl}api/cliente`, { params: params });
  }

  // OBTEM UM CLIENTE PELO ID
  getCliente(clienteId: number): Observable<Cliente> {
    return this.http.get<any>(`${environment.apiUrl}api/cliente/${clienteId}`);
  }

  // CADASTRA UM CLIENTE
  postCliente(cliente: Cliente) {
    return this.http.post<any>(`${environment.apiUrl}api/cliente`, cliente);
  }

  // EDITAR UM CLIENTE
  putCliente(clienteId: number, cliente: Cliente) {
    return this.http.put<any>(`${environment.apiUrl}api/cliente/${clienteId}`, cliente);
  }

  // DELETA UM CLIENTE PELO ID
  deleteCliente(clienteId: number) {
    return this.http.delete<any>(`${environment.apiUrl}api/cliente/${clienteId}`);
  }

  // OBTEM OS CLIENTES
  getClientesRelalatorio(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}api/cliente/relatorio/clientes`, { responseType: 'blob' });
  }

}