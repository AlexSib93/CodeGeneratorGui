import { ModelMetadata, initModelMetadata } from "./ModelMetadata";
import { FormMetadata, initFormMetadata } from "./FormMetadata";
export interface ProjectMetadata {
  idProjectMetadata:number;
  name:string;
  description:string;
  path:string;
  models:ModelMetadata[];
  forms:FormMetadata[];
}

export const initProjectMetadata = {
  idProjectMetadata: 0,
  name: '',
  description: '',
  path: '',
  models: [],
  forms: [],

}
