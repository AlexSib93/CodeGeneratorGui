﻿import { ComponentMetadata, initComponentMetadata } from "./ComponentMetadata";
import { ProjectMetadata, initProjectMetadata } from "./ProjectMetadata";
import { ModelMetadata, initModelMetadata } from "./ModelMetadata";
export interface FormMetadata {
  idFormMetadata:number;
  name:string;
  caption?:string;
  description?:string;
  addToNavBar:boolean;
  components:ComponentMetadata[];
  idProjectMetadata:number;
  projectMetadata?:ProjectMetadata;
  idEditForm:number;
  editForm?:FormMetadata;
  idModel:number;
  model?:ModelMetadata;
}

export const initFormMetadata = {
  idFormMetadata: 0,
  name: '',
  addToNavBar: false,
  components: [],
  idProjectMetadata: 0,
  idEditForm: 0,
  idModel: 0,

}
