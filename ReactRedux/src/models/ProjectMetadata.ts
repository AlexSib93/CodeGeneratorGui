import { ModelMetadata, initModelMetadata } from "./ModelMetadata";
import { FormMetadata, initFormMetadata } from "./FormMetadata";
import { EnumMetadata, initEnumMetadata } from "./EnumMetadata";
export interface ProjectMetadata {
  idProjectMetadata:number;
  name:string;
  description:string;
  path:string;
  dbConnectionString:string;
  unitOfWork:string;
  webApiHttpsPort:number;
  devServerPort:number;
  models:ModelMetadata[];
  forms:FormMetadata[];
  enumTypes:EnumMetadata[];
}

export const initProjectMetadata = {
  idProjectMetadata: 0,
  name: '',
  description: '',
  path: '',
  dbConnectionString: '',
  unitOfWork: '',
  webApiHttpsPort: 0,
  devServerPort: 0,
  models: [],
  forms: [],
  enumTypes: [],

}
