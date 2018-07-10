import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders  } from '@angular/common/http';

export interface Identity{
  username: string;
  password: string;
}

export interface Token{
  auth_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  // for storing the url where to redirect after logging in
  redirectUrl: string;

  identityURL = "http://localhost:5000/api/identity";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  jwtToken: string;

  constructor(private http: HttpClient) { }


  // TODO: tulee HttpErrorResponse koska API ei palauta jsonia, vain 200 - toimii muutoin
  registerIdentity(identity: Identity){
    console.log(this.identityURL+"/register");
    console.log(JSON.stringify(identity));
    return this.http.post(this.identityURL+"/register", JSON.stringify(identity), { headers: this.headers});
  }

  loginUser(identity: Identity): Observable<void>{
    console.log("identity: " + identity);
    return this.http.post<void>(this.identityURL+"/login", 
                          JSON.stringify(identity), 
                          { headers: this.headers});
    //console.log("JwtToken: " + JSON.stringify(this.jwtToken));

    //localStorage.setItem("auth_token", response);
    //return this.jwtToken;
  }

  // async loginUser(identity: Identity): Promise<string>{
  //   console.log("identity: " + identity);
  //   await this.http.post(this.identityURL+"/login", 
  //                         JSON.stringify(identity), 
  //                         { headers: this.headers})
  //                       .subscribe(response => localStorage.setItem("auth_token", JSON.stringify(response)), 
  //                                 error => console.log(error));
  //   //console.log("JwtToken: " + JSON.stringify(this.jwtToken));

  //   //localStorage.setItem("auth_token", response);
  //   return this.jwtToken;
  // }

}
