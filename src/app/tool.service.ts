import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
//import { RequestOptions, request  } from 'https';

interface Tool{
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  toolAPIURL = "http://localhost:5000/api/tools";

  requestoptions: any;
  

  constructor(private http: HttpClient) { }

  getAllTools(): Observable <Tool[]> {

    return this.http.get<Tool[]>(this.toolAPIURL);
  }

  insertTool(name: string) : any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    var tool: Tool = {id: 10, name: name};  

    console.log(JSON.stringify(tool));
    this.http.post(this.toolAPIURL, JSON.stringify(name), {headers: headers}).subscribe(r=>{});

  }

  updateTool(tool: Tool): Observable<void> {
    return this.http.put<void>(this.toolAPIURL + tool.name, tool);
  }

  deleteTool(id: number) {
    return this.http.delete(this.toolAPIURL + id);
  }


}
