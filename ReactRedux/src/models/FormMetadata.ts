import { ComponentMetadata, initComponentMetadata } from "./ComponentMetadata";
import { ProjectMetadata, initProjectMetadata } from "./ProjectMetadata";
export interface FormMetadata {
  idFormMetadata:number;
  name:string;
  caption:string;
  description:string;
  addToNavBar:boolean;
  components:ComponentMetadata[];
  idProjectMetadata:number;
  projectMetadata:ProjectMetadata;
}

export const initFormMetadata = {
  idFormMetadata: 0,
  name: '',
  caption: '',
  description: '',
  addToNavBar: false,
  components: [],
  idProjectMetadata: 0,
  projectMetadata: initProjectMetadata,

}
