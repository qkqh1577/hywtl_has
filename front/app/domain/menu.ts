import { IconName } from '@fortawesome/fontawesome-common-types';

export interface Menu {
  title: string;
  path?: string;
  children?: Menu[];
  icon: IconName;
  depth: number;
}