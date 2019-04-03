import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  apiUrl = 'https://viacep.com.br/ws/';

  constructor(
    private http: HttpClient
  ) { }

  getEndereco(cep): Promise<any> {
    return this.http.get(this.apiUrl + cep + '/json')
      .toPromise()
      .then(response => {
        return response;
      });
  }
}
