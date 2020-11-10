import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../interfaces/estado-interface';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  apiUrl = '/api/estados';

  constructor(private http: HttpClient) { }

  listaTodos() {
    return this.http.get<Estado[]>(this.apiUrl);
  }
}
