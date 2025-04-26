import { FormMetadata, initFormMetadata } from "../models/FormMetadata";
import ApiDataService from "./ApiDataService";

class FormMetadataService {
  post(formMetadata:FormMetadata): Promise<FormMetadata> {
    return ApiDataService.post('formmetadata', 'create', formMetadata)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }

  get(id: number): Promise<FormMetadata> {
    return ApiDataService.get('formmetadata', `get`, `id=${id}`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }

  put(formMetadata:FormMetadata): Promise<FormMetadata> {
    return ApiDataService.put('formmetadata', `put`,formMetadata )
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }
  
  getall(): Promise<FormMetadata[]> {
    return ApiDataService.get('formmetadata', `getall`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }


  delete(id: any) {
    return ApiDataService.delete('formmetadata', 'delete', id)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }
}

export default new FormMetadataService();