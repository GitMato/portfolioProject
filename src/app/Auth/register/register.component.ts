import { Component, OnInit } from '@angular/core';
//import { FormBuilder } from '@angular/forms';



import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AuthService, Identity } from '../../auth.service';
import { Router } from '@angular/router';
import { lowercaseValidator, uppercaseValidator, numberValidator, passwordMatchValidator } from '../../project';

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
      username: ['', [
                      Validators.required,
                      Validators.pattern('[a-zA-Z0-9]*')
                    ]],
      password1: ['', [
                      Validators.required, 
                      Validators.minLength(8),
                      //require at least one lowercase, one uppercase, one number and total of 8 symbols or more
                      lowercaseValidator,
                      uppercaseValidator,
                      numberValidator
                    ]],
      password2: ['', [
                      Validators.required, 
                      Validators.minLength(8),
                      //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$')
                      lowercaseValidator,
                      uppercaseValidator,
                      numberValidator
                    ]]},
                    {validator: passwordMatchValidator}
                  );
    //console.log(this.registerForm.controls['password2'].errors.lowercase);
    //console.log(this.registerForm.controls['password2'].hasError('required'));
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
                                                                  if (error.status == 400){
                                                                    this.alertMessage = `Username ${this.registerForm.value.username} already in use.`;
                                                                  }
                                                                  //this.alertMessage = error.statusText;
                                                                
                                                                },
                                                                () => this.router.navigate(['login']));
      }
    
  }

  getPasswordErrorMessage(p: string){
    return "asd";
  }

  
}
