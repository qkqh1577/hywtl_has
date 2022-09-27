import { UserShortVO } from 'user/domain';

export type UserNotificationId = number & { readonly _brand: unique symbol; };

export function UserNotificationId(id: number) {
  return id as UserNotificationId;
}

export interface UserNotificationListVO{
  list: UserNotificationVO[];
}

export interface UserNotificationVO {
  id?: UserNotificationId; // TODO: always exists
  type: string;
  note?: string;
  forwardUrl?: string;
  readAt?: Date;
  sender: UserShortVO | undefined;  // TODO: always exists
  projectCode?: string;
  projectName: string;
  createdAt: Date | undefined;  // TODO: always exists
}
