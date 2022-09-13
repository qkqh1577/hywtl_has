import Page from 'type/Page';
import { ProjectLogVO } from 'project_log/domain';
import { ProjectLogQuery } from 'project_log/query';
import { ProjectId } from 'project/domain';

const testData: Page<ProjectLogVO> = {
  totalPages:    0,
  totalElements: 0,
  size:          10,
  number:        0,
  content:       [
    {
      tabName:     '기본정보',
      sectionName: '견적서',
      itemName:    '시스템 견적서 수정',
      before:      '-',
      after:       '-',
      username:    'admin',
      name:        '홍길동',
    },
    {
      tabName:     '기본정보',
      sectionName: '견적서',
      itemName:    '시스템 견적서 수정',
      before:      '-',
      after:       '-',
      username:    'admin',
      name:        '홍길동',
    },
    {
      tabName:     '기본정보',
      sectionName: '견적서',
      itemName:    '시스템 견적서 수정',
      before:      '-',
      after:       '-',
      username:    'admin',
      name:        '홍길동',
    },
    {
      tabName:     '기본정보',
      sectionName: '견적서',
      itemName:    '시스템 견적서 수정',
      before:      '-',
      after:       '-',
      username:    'admin',
      name:        '홍길동',
    }, {
      tabName:     '기본정보',
      sectionName: '견적서',
      itemName:    '시스템 견적서 수정',
      before:      '-',
      after:       '-',
      username:    'admin',
      name:        '홍길동',
    }, {
      tabName:     '기본정보',
      sectionName: '견적서',
      itemName:    '시스템 견적서 수정',
      before:      '-',
      after:       '-',
      username:    'admin',
      name:        '홍길동',
    },
    {
      tabName:     '기본정보',
      sectionName: '견적서',
      itemName:    '시스템 견적서 수정',
      before:      '-',
      after:       '-',
      username:    'admin',
      name:        '홍길동',
    },
    {
      tabName:     '기본정보',
      sectionName: '견적서',
      itemName:    '시스템 견적서 수정',
      before:      '-',
      after:       '-',
      username:    'admin',
      name:        '홍길동',
    },
    {
      tabName:     '기본정보',
      sectionName: '견적서',
      itemName:    '시스템 견적서 수정',
      before:      '-',
      after:       '-',
      username:    'admin',
      name:        '홍길동',
    },
    {
      tabName:     '기본정보',
      sectionName: '견적서',
      itemName:    '시스템 견적서 수정',
      before:      '-',
      after:       '-',
      username:    'admin',
      name:        '홍길동',
    },
    {
      tabName:     '기본정보',
      sectionName: '견적서',
      itemName:    '시스템 견적서 수정',
      before:      '-',
      after:       '-',
      username:    'admin',
      name:        '홍길동',
    },
  ]
};

class ProjectLogApi {
  async getPage(id: ProjectId, query: ProjectLogQuery
  ): Promise<Page<ProjectLogVO>> {
    // const { data } = await apiClient.get(`/project/sales/${id}/log`, query);
    // return data;
    return testData;
  }
}

export const projectLogApi = new ProjectLogApi();
