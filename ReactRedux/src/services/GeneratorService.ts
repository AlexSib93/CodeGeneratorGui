import { ProjectMetadata, initProjectMetadata } from "../models/ProjectMetadata";
import ApiDataService from "./ApiDataService";

class GeneratorService {
  genProjectFormMetadata(name:string): Promise<ProjectMetadata> {
    return ApiDataService.post('generator', `genprojectformmetadata?name=${name}`)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }

  genCode(name:string): Promise<ProjectMetadata> {
    return ApiDataService.post('generator', `genproject?name=${name}`)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }

  deployProject(name:string): Promise<ProjectMetadata> {
    return ApiDataService.post('generator', `runproject?name=${name}`)
      .then((response: any) => {
        return Promise.resolve(response.data);
      },
        (message) => Promise.reject(message));
  }

}

export default new GeneratorService();