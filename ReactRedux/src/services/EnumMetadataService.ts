import { EnumMetadata, initEnumMetadata } from "../models/EnumMetadata";
import ApiDataService from "./ApiDataService";

class EnumMetadataService {
  post(enumMetadata:EnumMetadata): Promise<EnumMetadata> {
    return ApiDataService.post('enummetadata', 'create', enumMetadata)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }

  get(id: number): Promise<EnumMetadata> {
    return ApiDataService.get('enummetadata', `get`, `id=${id}`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }

  put(enumMetadata:EnumMetadata): Promise<EnumMetadata> {
    return ApiDataService.put('enummetadata', `put`,enumMetadata )
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }
  
  getall(): Promise<EnumMetadata[]> {
    return ApiDataService.get('enummetadata', `getall`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }


  delete(id: any) {
    return ApiDataService.delete('enummetadata', 'delete', id)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }
}

export default new EnumMetadataService();