import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Tool } from './project';

import { HttpClient, HttpHeaders  } from '@angular/common/http';

// interface Tool{
//   id: number;
//   name: string;
// }

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  toolAPIURL = "http://localhost:5000/api/tools";


  constructor(private http: HttpClient) { }

  // get all Tools from the db
  getAllTools(): Observable <Tool[]> {

    return this.http.get<Tool[]>(this.toolAPIURL);

  }

  // add a new tool to the db
  insertTool(name: string) : any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // the .subscribe is necessary... 
    this.http.post(this.toolAPIURL, JSON.stringify(name), {headers: headers}).subscribe(r=>{});
  }

  // update a specific tool
  updateTool(tool: Tool): Observable<void> {
    return this.http.put<void>(this.toolAPIURL + tool.name, tool);
  }

  // delete a specific tool
  deleteTool(id: number) {
    return this.http.delete(this.toolAPIURL + id);
  }


}
