import { UserShortVO } from 'user/domain';

export interface ProjectLogVO {
  createdAt?: Date;
  tabName: string;
  sectionName: string;
  itemName: string;
  before?: string;
  after?: string;
  user: UserShortVO;
}
