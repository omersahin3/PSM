import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + 'serverservice/';
@Injectable({
  providedIn: 'root'
})
export class ServerServiceService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(API_URL);
  }
  getInfo(): Observable<any> {
    return this.http.get(`${API_URL}/dashboard/`);
  }
}
