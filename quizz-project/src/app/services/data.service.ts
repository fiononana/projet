import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // url = 'http://localhost:4200/';
  url = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}
// tslint:disable-next-line: typedef
registerUser() {
  return this.http.get(this.url).pipe(map((response: any) => response));
}
  public getJSON(): Observable<any> {
    return this.http.get('./assets/allQuizzes.json');
}
}
