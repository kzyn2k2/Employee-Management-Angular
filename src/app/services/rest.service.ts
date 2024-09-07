import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../models/app.model';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  exportEvent: Subject<boolean> = new Subject();
  importEvent: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(`${environment.url}employees`);

  }

  post(url: string, body: any) {

    return this.http.post(`${environment.url}${url}`, JSON.stringify(body), {headers: this.getHeader()})

  }

  get(url: string) {

    return this.http.get(`${environment.url}${url}`)
  }

  del(url: string, syskey: string){

    return this.http.delete(`${environment.url}${url}`, {params: {"syskey": syskey}})

  }

  getHeader() {
    return {'Content-Type': 'application/json'}
  }

  exportExcel() {

    return this.http.get(`${environment.url}export`, {responseType: 'arraybuffer'})

  }

  uploadImage(url: string, file: any) {

    const form = new FormData();
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })

    form.append('file', file, file.name);

    return this.http.post(`${environment.url}${url}`, form);

  }
}
