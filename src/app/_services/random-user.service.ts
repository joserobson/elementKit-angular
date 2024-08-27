// src/app/random-user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RandomUserService {

  private apiUrl = 'https://randomuser.me/api/?results=10&inc=name';

  constructor(private http: HttpClient) { }

  getNames(): Observable<string[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        // Extrai os nomes completos dos resultados
        return response.results.map((user: any) => `${user.name.first} ${user.name.last}`);
      })
    );
  }
}
