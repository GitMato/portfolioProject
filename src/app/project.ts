

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
  tools: number[];
  extraimg: string[];

}