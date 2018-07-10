import { Injectable } from '@angular/core';

import { Observable, of, Subscription } from 'rxjs';

import { Tool } from './project';

import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  toolAPIURL = "http://localhost:5000/api/tools";

  headers = new HttpHeaders().set('Content-Type', 'application/json')
                            .append('Authorization', "Bearer " + localStorage.getItem('auth_token')
                            .substring(1, localStorage.getItem('auth_token').length-1)
                          );

  constructor(private http: HttpClient) { }

  // get all Tools from the db
  getAllTools(): Observable <Tool[]> {

    return this.http.get<Tool[]>(this.toolAPIURL);

  }

  // get a specific tool
  getTool(id: number): Observable<Tool> {
    
    return this.http.get<Tool>(this.toolAPIURL + id);
  }

  // add a new tool to the db
  // async insertTool(tool: Tool): Promise<void> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');

  //   // the .subscribe is necessary... 
  //   console.log(JSON.stringify(tool));
  //   await this.http.post(this.toolAPIURL, JSON.stringify(tool), {headers: headers}).subscribe(r=>{});
  // }

  insertTool(tool: Tool): Observable<Tool> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json')
    //                                  .append('Authorization', "Bearer " + localStorage.getItem('auth_token')
    //                                  .substring(1, localStorage.getItem('auth_token').length-1)
    //                                 );
    console.log(this.headers);
    //console.log("pelkkä: "+localStorage.getItem('auth_token'));
    //console.log("replacella: "+localStorage.getItem('auth_token').substring(1, localStorage.getItem('auth_token').length-1));

    // the .subscribe is necessary... 
    console.log(JSON.stringify(tool));
    return this.http.post<Tool>(this.toolAPIURL, JSON.stringify(tool), {headers: this.headers});
  }

  // update a specific tool
  updateTool(tool: Tool): Observable<Tool> {
    return this.http.put<Tool>(this.toolAPIURL + tool.id, JSON.stringify(tool), {headers: this.headers});
  }

  // delete a specific tool
  deleteTool(id: number): Observable<void> {
    return this.http.delete<void>(this.toolAPIURL + id, { headers: this.headers});
  }


}
