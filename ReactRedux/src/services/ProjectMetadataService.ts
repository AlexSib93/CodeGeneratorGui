import { ProjectMetadata, initProjectMetadata } from "../models/ProjectMetadata";
import ApiDataService from "./ApiDataService";

class ProjectMetadataService {
  post(projectMetadata:ProjectMetadata): Promise<ProjectMetadata> {
    return ApiDataService.post('projectmetadata', 'create', projectMetadata)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }

  get(id: number): Promise<ProjectMetadata> {
    return ApiDataService.get('projectmetadata', `get`, `id=${id}`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }

  put(projectMetadata:ProjectMetadata): Promise<ProjectMetadata> {
    return ApiDataService.put('projectmetadata', `put`,projectMetadata )
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }
  
  getall(): Promise<ProjectMetadata[]> {
    return ApiDataService.get('projectmetadata', `getall`)
      .then(
        (response) => Promise.resolve(response.data),
        (message) => Promise.reject(message)
      );
  }


  delete(id: any) {
    return ApiDataService.delete('projectmetadata', 'delete', id)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }
}

export default new ProjectMetadataService();