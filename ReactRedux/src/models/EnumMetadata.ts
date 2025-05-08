import { EnumValueMetadata, initEnumValueMetadata } from "./EnumValueMetadata";
import { ProjectMetadata, initProjectMetadata } from "./ProjectMetadata";
export interface EnumMetadata {
  idEnumMetadata:number;
  name:string;
  caption:string;
  values:EnumValueMetadata[];
  idProjectMetadata:number;
  projectMetadata?:ProjectMetadata;
}

export const initEnumMetadata = {
  idEnumMetadata: 0,
  name: '',
  caption: '',
  values: [],
  idProjectMetadata: 0,

}
