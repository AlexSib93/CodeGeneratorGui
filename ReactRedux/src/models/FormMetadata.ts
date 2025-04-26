import { ComponentMetadata, initComponentMetadata } from "./ComponentMetadata";
import { ProjectMetadata, initProjectMetadata } from "./ProjectMetadata";
export interface FormMetadata {
  idFormMetadata:number;
  name:string;
  caption:string;
  description:string;
  addToNavBar:boolean;
  components:ComponentMetadata[];
  idProject:number;
  project:ProjectMetadata;
}

export const initFormMetadata = {
  idFormMetadata: 0,
  name: '',
  caption: '',
  description: '',
  addToNavBar: false,
  components: [],
  idProject: 0,
  project: initProjectMetadata,

}
