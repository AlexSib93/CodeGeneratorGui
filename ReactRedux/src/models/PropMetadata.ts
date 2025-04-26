import { ModelMetadata, initModelMetadata } from "./ModelMetadata";
export interface PropMetadata {
  idPropMetadata:number;
  name:string;
  type:string;
  caption:string;
  idModelMetadata:number;
  modelMetadata?:ModelMetadata;
  isPrimaryKey:boolean;
  isVirtual:boolean;
  visible:boolean;
  editable:boolean;
  jsonIgnore:boolean;
  isEnumerable:boolean;
  isMasterProp:boolean;
  isDetailsProp:boolean;
  isDictValueProp:boolean;
}

export const initPropMetadata = {
  idPropMetadata: 0,
  name: '',
  type: '',
  caption: '',
  idModelMetadata: 0,
  isPrimaryKey: false,
  isVirtual: false,
  visible: true,
  editable: true,
  jsonIgnore: false,
  isEnumerable: false,
  isMasterProp: false,
  isDetailsProp: false,
  isDictValueProp: false,

}
