import { PropMetadata, initPropMetadata } from "./PropMetadata";
import { FormMetadata, initFormMetadata } from "./FormMetadata";
export interface ComponentMetadata {
  idComponentMetadata:number;
  name:string;
  caption:string;
  description:string;
  type:string;
  idModelPropMetadata:number;
  modelPropMetadata?:PropMetadata;
  props:PropMetadata[];
  modelProp:boolean;
  idFormMetadata:number;
  formMetadata?:FormMetadata;
}

export const initComponentMetadata = {
  idComponentMetadata: 0,
  name: '',
  caption: '',
  description: '',
  type: '',
  idModelPropMetadata: 0,
  props: [],
  modelProp: false,
  idFormMetadata: 0,

}
