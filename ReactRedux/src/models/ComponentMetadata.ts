import { PropMetadata, initPropMetadata } from "./PropMetadata";
export interface ComponentMetadata {
  idComponentMetadata:number;
  name:string;
  caption:string;
  description:string;
  type:string;
  idModelPropMetadata:number;
  modelPropMetadata:PropMetadata;
  props:PropMetadata[];
  modelProp:boolean;
}

export const initComponentMetadata = {
  idComponentMetadata: 0,
  name: '',
  caption: '',
  description: '',
  type: '',
  idModelPropMetadata: 0,
  modelPropMetadata: initPropMetadata,
  props: [],
  modelProp: false,

}
