import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cidade } from '../interfaces/cidade-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  apiUrl = '/api/cidades';

  constructor(private http: HttpClient) { }

  listaTodas(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(this.apiUrl);
  }
}
