import { ModelMetadata, initModelMetadata } from "./ModelMetadata";
export interface PropMetadata {
  idPropMetadata:number;
  name:string;
  type:string;
  caption:string;
  idModel:number;
  model:ModelMetadata;
}

export const initPropMetadata = {
  idPropMetadata: 0,
  name: '',
  type: '',
  caption: '',
  idModel: 0,
  model: initModelMetadata,

}
