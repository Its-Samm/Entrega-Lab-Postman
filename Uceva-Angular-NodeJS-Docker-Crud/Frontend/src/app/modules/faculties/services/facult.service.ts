import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateFacultRequest, Facult, UpdateFacultRequest } from "../interfaces/facult";

@Injectable({
  providedIn: 'root',
})
export class FacultService {
  
  http = inject(HttpClient);
  url = 'http://localhost:3000/api/faculties';

  getAll(): Observable<Facult[]> {
    return this.http.get<Facult[]>(this.url);
  }

  getById(id: number): Observable<Facult> {
    return this.http.get<Facult>(`${this.url}/${id}`);
  }

  create(facult: CreateFacultRequest): Observable<Facult> {
    return this.http.post<Facult>(this.url, facult);
  }

  update(id: number, facult: UpdateFacultRequest): Observable<Facult> {
    return this.http.put<Facult>(`${this.url}/${id}`, facult);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
