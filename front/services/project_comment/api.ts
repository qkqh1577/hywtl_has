import {
  ProjectCommentAddParameter,
  ProjectCommentQuery
} from 'services/project_comment/parameter';
import Page from 'components/Page';
import ProjectComment from 'services/project_comment/entity';
import apiClient from 'services/common/api';

export class ProjectCommentApi {
  async getPage(query: ProjectCommentQuery): Promise<Page<ProjectComment>> {
    const { data } = await apiClient.get('/project-comments', query);
    return data;
  }

  async add(params: ProjectCommentAddParameter): Promise<ProjectComment> {
    const { data } = await apiClient.post('/project-comments', params);
    return data;
  }
}

const projectCommentApi = new ProjectCommentApi();
export default projectCommentApi;
