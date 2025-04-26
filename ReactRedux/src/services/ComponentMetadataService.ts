import { ComponentMetadata, initComponentMetadata } from "../models/ComponentMetadata";
import ApiDataService from "./ApiDataService";

class ComponentMetadataService {
  post(componentMetadata:ComponentMetadata): Promise<ComponentMetadata> {
    return ApiDataService.post('componentmetadata', 'create', componentMetadata)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }

  get(id: number): Promise<ComponentMetadata> {
    return ApiDataService.get('componentmetadata', `get`, `id=${id}`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }

  put(componentMetadata:ComponentMetadata): Promise<ComponentMetadata> {
    return ApiDataService.put('componentmetadata', `put`,componentMetadata )
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }
  
  getall(): Promise<ComponentMetadata[]> {
    return ApiDataService.get('componentmetadata', `getall`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }


  delete(id: any) {
    return ApiDataService.delete('componentmetadata', 'delete', id)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }
}

export default new ComponentMetadataService();