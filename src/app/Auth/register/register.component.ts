import { Component, OnInit } from '@angular/core';
//import { FormBuilder } from '@angular/forms';



import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AuthService, Identity } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  alertMessage: string = "";

  registerForm: FormGroup;
  newUser: Identity;

  constructor(private formbuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formbuilder.group({
      username: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  isSamePassword(): boolean {
    //check if it is same
    if (this.registerForm.value.password1 == this.registerForm.value.password2){
      return true;
    } else {
      this.alertMessage = "Passwords don't match!"
      return false;
    }
  }

  registerNewUser(){
    if (this.isSamePassword()){
      this.newUser = { username: this.registerForm.value.username, 
                        password: this.registerForm.value.password1};
      this.authService.registerIdentity(this.newUser).subscribe(()=>{}, 
                                                                error => 
                                                                {
                                                                  
                                                                  console.log(error);
                                                                  this.alertMessage = error.statusText;
                                                                
                                                                },
                                                                () => this.router.navigate(['login']));
      
    }
    
  }


}
