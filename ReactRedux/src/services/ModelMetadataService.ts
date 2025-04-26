import { ModelMetadata, initModelMetadata } from "../models/ModelMetadata";
import ApiDataService from "./ApiDataService";

class ModelMetadataService {
  post(modelMetadata:ModelMetadata): Promise<ModelMetadata> {
    return ApiDataService.post('modelmetadata', 'create', modelMetadata)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }

  get(id: number): Promise<ModelMetadata> {
    return ApiDataService.get('modelmetadata', `get`, `id=${id}`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }

  put(modelMetadata:ModelMetadata): Promise<ModelMetadata> {
    return ApiDataService.put('modelmetadata', `put`,modelMetadata )
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }
  
  getall(): Promise<ModelMetadata[]> {
    return ApiDataService.get('modelmetadata', `getall`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }


  delete(id: any) {
    return ApiDataService.delete('modelmetadata', 'delete', id)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }
}

export default new ModelMetadataService();