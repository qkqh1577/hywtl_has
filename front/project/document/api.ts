import apiClient from 'services/api';
import {
  DocumentId,
  DocumentShort,
  DocumentType,
  documentTypeList,
  DocumentVO
} from 'project/document/domain';
import { ProjectId } from 'project/domain';
import {
  DepartmentCategory,
  DepartmentId,
  DepartmentVO
} from 'department/domain';
import {
  UserId,
  UserRole,
  UserVO
} from 'user/domain';

const receivedList: DocumentShort[] = [
  {
    id:         DocumentId(1),
    code:       'C20220811',
    type:       DocumentType.RECEIVED,
    recipient:  '호우캐스트',
    mailFileId: 1,
    note:       '받은 파일 테스트 파일 생성 중',
    createdAt:  new Date(2022, 8, 11),
    createdBy:  {
      id: UserId(1),
      name: '김지수',
      username: 'qweqwe123',
      email: 'qweqwe123@gmail.com',
      role: UserRole.MASTER,
      department: {
        id: DepartmentId(1),
        name: '영업부',
        category: '',
        seq: 1,
      },
      createdAt: new Date(2022, 8, 11),
    },
  },
  {
    id:         DocumentId(2),
    code:       'C20220813',
    type:       DocumentType.RECEIVED,
    recipient:  '삼양식품',
    mailFileId: 2,
    note:       '받은 파일 테스트 파일 생성 중',
    createdAt:  new Date(2022, 8, 18),
    createdBy:  {
      id: UserId(2),
      name: '김정수',
      username: 'qweqwe1234',
      email: 'qweqwe1234@gmail.com',
      role: UserRole.ADMIN,
      department: {
        id: DepartmentId(2),
        name: '기재부',
        category: '',
        seq: 1,
      },
      createdAt: new Date(2022, 8, 11),
    },
  },
];

const sentList: DocumentShort[] = [
  {
    id:         DocumentId(3),
    code:       'C20220822',
    type:       DocumentType.SENT,
    recipient:  '일진풍향',
    mailFileId: 3,
    note:       '받은 파일 테스트 파일 생성 중',
    createdAt:  new Date(2022, 8, 29),
    createdBy:  {
      id: UserId(5),
      name: '이영민',
      username: 'qweqwe1235',
      email: 'qweqwe1235@gmail.com',
      role: UserRole.NORMAL,
      department: {
        id: DepartmentId(3),
        name: '개발부',
        category: '',
        seq: 3,
      },
      createdAt: new Date(2022, 8, 11),
    },
  },
  {
    id:         DocumentId(4),
    code:       'C20220816',
    type:       DocumentType.SENT,
    recipient:  '삼진풍동',
    mailFileId: 5,
    note:       '받은 파일 테스트 파일 생성 중',
    createdAt:  new Date(2022, 8, 30),
    createdBy:  {
      id: UserId(6),
      name: '박철수',
      username: 'qweqwe12347',
      email: 'qweqwe12347@gmail.com',
      role: UserRole.NORMAL,
      department: {
        id: DepartmentId(1),
        name: '영업부',
        category: '',
        seq: 1,
      },
      createdAt: new Date(2022, 8, 11),
    },
  },
];

const buildingList: DocumentShort[] = [
  {
    id:         DocumentId(8),
    code:       'C20220922',
    type:       DocumentType.BUILDING,
    recipient:  '와우캐스트',
    mailFileId: 8,
    note:       '받은 파일 테스트 파일 생성 중',
    createdAt:  new Date(2022, 8, 11),
    createdBy:  {
      id: UserId(1),
      name: '김지수',
      username: 'qweqwe123',
      email: 'qweqwe123@gmail.com',
      role: UserRole.MASTER,
      department: {
        id: DepartmentId(1),
        name: '영업부',
        category: '',
        seq: 1,
      },
      createdAt: new Date(2022, 8, 11),
    },
  },
  {
    id:         DocumentId(9),
    code:       'C20220954',
    type:       DocumentType.BUILDING,
    recipient:  '호우건설',
    mailFileId: 9,
    note:       '받은 파일 테스트 파일 생성 중',
    createdAt:  new Date(2022, 8, 18),
    createdBy:  {
      id: UserId(2),
      name: '김정수',
      username: 'qweqwe1234',
      email: 'qweqwe1234@gmail.com',
      role: UserRole.ADMIN,
      department: {
        id: DepartmentId(2),
        name: '기재부',
        category: '',
        seq: 1,
      },
      createdAt: new Date(2022, 8, 11),
    },
  },
];

class DocumentApi {

  async getReceivedList(id: ProjectId): Promise<DocumentShort[]> {
    // const { data } = await apiClient.get(`/project/sales/${id}/document?type=`, 'RECEIVED');
    // return data;
    return receivedList;
  }

  async getSentList(id: ProjectId): Promise<DocumentShort[]> {
    // const { data } = await apiClient.get(`/project/sales/${id}/document?type=`, 'SENT');
    // return data;
    return sentList;
  }

  async getBuildingList(id: ProjectId): Promise<DocumentShort[]> {
    // const { data } = await apiClient.get(`/project/sales/${id}/document?type=`, 'BUILDING');
    // return data;
    return buildingList;
  }

  async getOne(id: number): Promise<DocumentVO> {
    const { data } = await apiClient.get(`/project/sales/document/${id}`);
    return data;
  }

}

export const documentApi = new DocumentApi();
