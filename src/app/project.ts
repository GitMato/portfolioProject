import { FormControl, FormGroup } from "../../node_modules/@angular/forms";


// export class Project {
//     id: number;
//     name: string;
//     imgUrl: string;
//     imgAlt: string;
//     description: string;
//   }
export interface Tool{
  name: string;
  id: number;
}

export interface Project{
  id: number;
  name: string;
  imgUrl: string;
  imgAlt: string;
  description: string;
  details: string;
  //tools: Tool[];
  tools: number[]; // tool ids
  extraimg: string[];
  extraUrls: string[];

}

export function lowercaseValidator(control: FormControl){
  let password = control.value;
  let PASSWORD_LOWER_REGEX = /^.*[a-z].*/;
  //let PASSWORD_LOWER_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;
  return PASSWORD_LOWER_REGEX.test(password) ? null : {'lowercase': true};

}

export function uppercaseValidator(control: FormControl){
  let password = control.value;
  let PASSWORD_LOWER_REGEX = /^.*[A-Z].*/;
  //let PASSWORD_LOWER_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;
  return PASSWORD_LOWER_REGEX.test(password) ? null : {'uppercase': true};

}

export function numberValidator(control: FormControl){
  let password = control.value;
  let PASSWORD_LOWER_REGEX = /^.*[0-9].*/;
  //let PASSWORD_LOWER_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;
  return PASSWORD_LOWER_REGEX.test(password) ? null : {'number': true};

}

export function passwordMatchValidator(group: FormGroup){
  let password1 = group.controls['password1'].value;
  let password2 = group.controls['password2'].value;

  if (password1 != password2){
    return {'nomatch': true};
  }

  return null;
}