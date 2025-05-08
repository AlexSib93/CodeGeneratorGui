import { EnumValueMetadata, initEnumValueMetadata } from "../models/EnumValueMetadata";
import ApiDataService from "./ApiDataService";

class EnumValueMetadataService {
  post(enumValueMetadata:EnumValueMetadata): Promise<EnumValueMetadata> {
    return ApiDataService.post('enumvaluemetadata', 'create', enumValueMetadata)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }

  get(id: number): Promise<EnumValueMetadata> {
    return ApiDataService.get('enumvaluemetadata', `get`, `id=${id}`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }

  put(enumValueMetadata:EnumValueMetadata): Promise<EnumValueMetadata> {
    return ApiDataService.put('enumvaluemetadata', `put`,enumValueMetadata )
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }
  
  getall(): Promise<EnumValueMetadata[]> {
    return ApiDataService.get('enumvaluemetadata', `getall`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }


  delete(id: any) {
    return ApiDataService.delete('enumvaluemetadata', 'delete', id)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }
}

export default new EnumValueMetadataService();