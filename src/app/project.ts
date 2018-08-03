
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