import { UserShortVO } from 'user/domain';

export type UserNotificationId = number & { readonly _brand: unique symbol; };

export function UserNotificationId(id: number) {
  return id as UserNotificationId;
}

export interface UserNotificationVO {
  id: UserNotificationId;
  type: string;
  note?: string;
  forwardUrl?: string;
  readAt?: Date;
  sender: UserShortVO;
  projectCode?: string;
  projectName: string;
  createdAt: Date;
}
