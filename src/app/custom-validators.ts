import { FormControl, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from "../../node_modules/@angular/forms";


export function lowercaseValidator(control: FormControl){
    let password = control.value;
    let PASSWORD_LOWER_REGEX = /^.*[a-z].*/;
    //let PASSWORD_LOWER_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;
    return PASSWORD_LOWER_REGEX.test(password) ? null : {'lowercase': true};
  
  }
  
export function uppercaseValidator(control: FormControl){
let password = control.value;
let PASSWORD_UPPER_REGEX = /^.*[A-Z].*/;
//let PASSWORD_LOWER_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;
return PASSWORD_UPPER_REGEX.test(password) ? null : {'uppercase': true};

}
  
export function numberValidator(control: FormControl){
let password = control.value;
let PASSWORD_NUMBER_REGEX = /^.*[0-9].*/;
//let PASSWORD_LOWER_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;
return PASSWORD_NUMBER_REGEX.test(password) ? null : {'number': true};

}
  
export function passwordMatchValidator(group: FormGroup){
let password1 = group.controls['password1'].value;
let password2 = group.controls['password2'].value;

if (password1 != password2){
    return {'nomatch': true};
}

return null;
}
