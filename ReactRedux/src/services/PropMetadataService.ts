import { PropMetadata, initPropMetadata } from "../models/PropMetadata";
import ApiDataService from "./ApiDataService";

class PropMetadataService {
  post(propMetadata:PropMetadata): Promise<PropMetadata> {
    return ApiDataService.post('propmetadata', 'create', propMetadata)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }

  get(id: number): Promise<PropMetadata> {
    return ApiDataService.get('propmetadata', `get`, `id=${id}`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }

  put(propMetadata:PropMetadata): Promise<PropMetadata> {
    return ApiDataService.put('propmetadata', `put`,propMetadata )
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }
  
  getall(): Promise<PropMetadata[]> {
    return ApiDataService.get('propmetadata', `getall`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }


  delete(id: any) {
    return ApiDataService.delete('propmetadata', 'delete', id)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }
}

export default new PropMetadataService();