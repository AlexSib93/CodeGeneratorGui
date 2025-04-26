import { PropMetadata, initPropMetadata } from "./PropMetadata";
export interface ModelMetadata {
  idModelMetadata:number;
  name:string;
  nameSpace:string;
  caption:string;
  props:PropMetadata[];
}

export const initModelMetadata = {
  idModelMetadata: 0,
  name: '',
  nameSpace: '',
  caption: '',
  props: [],

}
