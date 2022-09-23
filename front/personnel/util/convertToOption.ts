import { DepartmentShort } from 'department/domain';
import { Option } from 'components/DataFieldProps';

export function toOption(departmentList: DepartmentShort[]): Option[] {
  if (!departmentList) {
    return [];
  }
  return departmentList.map((department) => {
    return {
      key:  department.id!,
      text: department.name!
    };
  });
}
