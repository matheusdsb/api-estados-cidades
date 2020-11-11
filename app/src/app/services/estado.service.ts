import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Estado } from '../interfaces/estado-interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  apiUrl = '/api/estados';

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(`Erro ${error.status}: ${error.error}`);
  }

  constructor(private http: HttpClient) { }

  listaTodos(params?: any): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.apiUrl, { params });
  }

  listaPorId(id: string): Observable<Estado> {
    return this.http.get<Estado>(this.apiUrl + '/' + id);
  }

  cadastrar(estado: Estado): Observable<Estado> {
    return this.http.post<Estado>(this.apiUrl + '/cadastrar', estado)
      .pipe(
        catchError(this.handleError)
      );
  }

  editar(id: string, estado: Estado): Observable<Estado> {
    return this.http.put<Estado>(this.apiUrl + '/editar/' + id, estado)
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
