import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isUser():boolean {
    // query db with username and compare hashedpasswords
    return false;
  }

  loginUser(){
    this.authService.loginUser(this.loginForm.value)
                    .subscribe(response => localStorage.setItem('auth_token', JSON.stringify(response)), 
                    () => this.message = "Wrong username/password!", 
                    () => { this.router.navigate(['modify']);
                            this.authService.isLoggedIn = true;}
                          );

    
    //console.log(JwtToken);
    //debugger;
  }

}
