import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Cidade } from '../interfaces/cidade-interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  apiUrl = '/api/cidades';

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(`Erro ${error.status}: ${error.error}`);
  }

  constructor(private http: HttpClient) { }

  listaTodas(params?: any): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(this.apiUrl, { params });
  }

  listaPorId(id: string): Observable<Cidade> {
    return this.http.get<Cidade>(this.apiUrl + '/' + id);
  }

  cadastrar(cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(this.apiUrl + '/cadastrar', cidade)
      .pipe(
        catchError(this.handleError)
      );
  }

  editar(id: string, cidade: Cidade): Observable<Cidade> {
    return this.http.put<Cidade>(this.apiUrl + '/editar/' + id, cidade)
      .pipe(
        catchError(this.handleError)
      );
  }

  excluir(id: string) {
    return this.http.delete(this.apiUrl + '/excluir/' + id).pipe(
      catchError(this.handleError)
    );
  }
}
