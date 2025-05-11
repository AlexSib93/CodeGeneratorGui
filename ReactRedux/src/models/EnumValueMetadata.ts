import { EnumMetadata, initEnumMetadata } from "./EnumMetadata";
export interface EnumValueMetadata {
  idEnumValueMetadata:number;
  name:string;
  caption?:string;
  idEnumMetadata:number;
  enumMetadata?:EnumMetadata;
}

export const initEnumValueMetadata = {
  idEnumValueMetadata: 0,
  name: '',
  idEnumMetadata: 0,

}
