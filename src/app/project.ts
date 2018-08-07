import { isDevMode } from '@angular/core';


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

//export const baseAPIURL = 'portfolio-mato.herokuapp.com/api/';

export function baseAPIURL(): string {
  if (isDevMode()){
    return 'http://localhost:5000/api';
  } else {
    return 'portfolio-mato-api.herokuapp.com/api';
  }
}