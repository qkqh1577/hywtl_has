export interface ProjectScheduleQuery {
  keyword?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
}

export const initialProjectScheduleQuery: ProjectScheduleQuery = {
  keyword:   '',
  startDate: undefined,
  endDate:   undefined,
  type:      '',
};
