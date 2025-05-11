import { UnitOfWorkEnum, initUnitOfWorkEnum } from "../enums/UnitOfWorkEnum";
import { ModelMetadata, initModelMetadata } from "./ModelMetadata";
import { FormMetadata, initFormMetadata } from "./FormMetadata";
import { EnumMetadata, initEnumMetadata } from "./EnumMetadata";
export interface ProjectMetadata {
  idProjectMetadata:number;
  name:string;
  description?:string;
  path?:string;
  dbConnectionString?:string;
  unitOfWork:UnitOfWorkEnum;
  webApiHttpsPort?:number;
  devServerPort?:number;
  models:ModelMetadata[];
  forms:FormMetadata[];
  enumTypes:EnumMetadata[];
}

export const initProjectMetadata = {
  idProjectMetadata: 0,
  name: '',
  unitOfWork: initUnitOfWorkEnum,
  models: [],
  forms: [],
  enumTypes: [],

}
