import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './AuthService';

import 'rxjs/Rx';

@Injectable()
export class TareaService {
  private url:string;
  private headers:Headers;
  private tarea:any[] = [];

  constructor(
    private auth:AuthService,
    private http:Http
  ) {
    this.url = "http://localhost:3000/api/v1/tarea";
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.auth.getToken()
    });
  }

  public getTareas() {
    return this.http.get(this.url, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  public getTarea(idTarea:any) {
    let uri = `${this.url}/${idTarea}`;
    return this.http.get(uri, { headers: this.headers })
    .map(res => res.json());
  }

  public nuevoTarea(tarea:any) {
    let data = JSON.stringify(tarea);
    return this.http.post(this.url, data, { headers: this.headers })
    .map(res => res.json());
  }

  public editarTarea(tarea:any) {
    let uri = `${this.url}/${tarea.idTarea}`;

    let data = JSON.stringify(tarea);

    return this.http.put(uri, data, { headers: this.headers })
    .map(res => res.json());
  }

  public eliminarTarea(idTarea:number) {
    let uri = `${this.url}/${idTarea}`;
    return this.http.delete(uri, { headers: this.headers })
    .map(res => res.json());
  }

}
