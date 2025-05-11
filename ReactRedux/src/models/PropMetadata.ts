import { ModelMetadata, initModelMetadata } from "./ModelMetadata";
import { PropTypeEnum, initPropTypeEnum } from "../enums/PropTypeEnum";
export interface PropMetadata {
  idPropMetadata:number;
  name:string;
  type?:string;
  caption?:string;
  expression?:string;
  idModelMetadata:number;
  modelMetadata?:ModelMetadata;
  isPrimaryKey:boolean;
  visible:boolean;
  editable:boolean;
  jsonIgnore:boolean;
  propType:PropTypeEnum;
  isVirtual:boolean;
  isNullable:boolean;
  isEnumerable:boolean;
  typeOfEnumerable:string;
  typeOfNullable:string;
}

export const initPropMetadata = {
  idPropMetadata: 0,
  name: '',
  idModelMetadata: 0,
  isPrimaryKey: false,
  visible: false,
  editable: false,
  jsonIgnore: false,
  propType: initPropTypeEnum,
  isVirtual: false,
  isNullable: false,
  isEnumerable: false,
  typeOfEnumerable: '',
  typeOfNullable: '',

}
