import { PropMetadata, initPropMetadata } from "./PropMetadata";
import { ProjectMetadata, initProjectMetadata } from "./ProjectMetadata";
export interface ModelMetadata {
  idModelMetadata:number;
  name:string;
  initData?:string;
  nameSpace?:string;
  caption?:string;
  props:PropMetadata[];
  idProjectMetadata:number;
  projectMetadata?:ProjectMetadata;
}

export const initModelMetadata = {
  idModelMetadata: 0,
  name: '',
  props: [],
  idProjectMetadata: 0,

}
