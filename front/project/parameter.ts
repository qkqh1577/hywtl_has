import { UserId } from 'user/domain';
import {
  ProjectBasicBidType,
  ProjectBidStatus,
  projectBidStatusName,
  ProjectContractStatus,
  projectContractStatusName,
  ProjectEstimateExpectation,
  projectEstimateExpectationName,
  ProjectEstimateStatus,
  projectEstimateStatusName,
  ProjectProgressStatus,
  projectProgressStatusName,
  ProjectStatus,
} from 'project/domain';
import { Option } from 'components/DataFieldProps';

export interface ProjectAddParameter {
  name: string;
  alias: string;
  receptionManagerId: UserId;
  progressStatus: ProjectProgressStatus;
  bidType: ProjectBasicBidType;
  memo?: string;
}

export interface ProjectUpdateParameter {
  isFavorite?: boolean;
}

export interface ProjectStatusParameter
  extends ProjectStatus {
}

export const memoLabelList: string[] = [
  '견적 의뢰처',
  '소개자',
  '총 동 수',
  '단지 수',
  '예상 시작 시점',
  '현재 인허가 단계',
  '관계사 정보',
  '견적 발송처',
  '기타 메모사항'
];

export enum ProjectStatusSearchOption {
  PROGRESS_STATUS      = 'PROGRESS_STATUS',
  ESTIMATE_EXPECTATION = 'ESTIMATE_EXPECTATION',
  ESTIMATE_STATUS      = 'ESTIMATE_STATUS',
  CONTRACT_STATUS      = 'CONTRACT_STATUS',
  BID_STATUS           = 'BID_STATUS',
}

export function ProjectStatusSearchOptionName(status: ProjectStatusSearchOption | '') {
  switch (status) {
    case ProjectStatusSearchOption.PROGRESS_STATUS:
      return '진행 현황';
    case ProjectStatusSearchOption.ESTIMATE_EXPECTATION:
      return '견적 분류';
    case ProjectStatusSearchOption.ESTIMATE_STATUS:
      return '견적 상태';
    case ProjectStatusSearchOption.CONTRACT_STATUS:
      return '계약 상태';
    case ProjectStatusSearchOption.BID_STATUS:
      return '입찰 상태';
    default:
      return '';
  }
}

export const projectStatusSearchOptionList: Option[] = [
  {
    key:  ProjectStatusSearchOption.PROGRESS_STATUS,
    text: ProjectStatusSearchOptionName(ProjectStatusSearchOption.PROGRESS_STATUS),
  },
  {
    key:  ProjectStatusSearchOption.ESTIMATE_EXPECTATION,
    text: ProjectStatusSearchOptionName(ProjectStatusSearchOption.ESTIMATE_EXPECTATION),
  },
  {
    key:  ProjectStatusSearchOption.ESTIMATE_STATUS,
    text: ProjectStatusSearchOptionName(ProjectStatusSearchOption.ESTIMATE_STATUS),
  }, {
    key:  ProjectStatusSearchOption.CONTRACT_STATUS,
    text: ProjectStatusSearchOptionName(ProjectStatusSearchOption.CONTRACT_STATUS),
  },
  {
    key:  ProjectStatusSearchOption.BID_STATUS,
    text: ProjectStatusSearchOptionName(ProjectStatusSearchOption.BID_STATUS),
  }
];

export interface ProjectStatusOption {
  projectOption: string;
  projectSubOption: string;
}

export interface ProjectQuery {
  keywordOfProject: string;
  keywordOfProjectDetail: string[];
  projectStatusSearchList: ProjectStatusOption[];
}

export const initialProjectQuery: ProjectQuery = {
  keywordOfProject:        '',
  keywordOfProjectDetail:  [],
  projectStatusSearchList: [{
    projectOption:    '',
    projectSubOption: '',
  }],
};

export function getSubOptionByOption(option: ProjectStatusSearchOption) {
  switch (option) {
    case ProjectStatusSearchOption.PROGRESS_STATUS:
      return projectProgressStatusSearchList;
    case ProjectStatusSearchOption.ESTIMATE_EXPECTATION:
      return projectEstimateExpectationSearchList;
    case ProjectStatusSearchOption.ESTIMATE_STATUS:
      return projectEstimateStatusSearchList;
    case ProjectStatusSearchOption.CONTRACT_STATUS:
      return projectContractStatusSearchList;
    case ProjectStatusSearchOption.BID_STATUS:
      return projectBidStatusSearchList;
    default:
      return [];
  }
}

export const projectProgressStatusSearchList: Option[] = [
  {
    key:  ProjectProgressStatus.TEMPORARY,
    text: projectProgressStatusName(ProjectProgressStatus.TEMPORARY),
  },
  {
    key:  ProjectProgressStatus.UNDER_CONTRACT,
    text: projectProgressStatusName(ProjectProgressStatus.UNDER_CONTRACT),
  },
  {
    key:  ProjectProgressStatus.BEFORE_SERVICE,
    text: projectProgressStatusName(ProjectProgressStatus.BEFORE_SERVICE),
  }, {
    key:  ProjectProgressStatus.SERVICE_ON_GOING,
    text: projectProgressStatusName(ProjectProgressStatus.SERVICE_ON_GOING),
  },
  {
    key:  ProjectProgressStatus.SERVICE_COMPLETE,
    text: projectProgressStatusName(ProjectProgressStatus.SERVICE_COMPLETE),
  },
  {
    key:  ProjectProgressStatus.SERVICE_HOLDING,
    text: projectProgressStatusName(ProjectProgressStatus.SERVICE_HOLDING),
  }
];

export const projectEstimateExpectationSearchList: Option[] = [
  {
    key:  ProjectEstimateExpectation.STRUCTURE,
    text: projectEstimateExpectationName(ProjectEstimateExpectation.STRUCTURE),
  },
  {
    key:  ProjectEstimateExpectation.NORMAL,
    text: projectEstimateExpectationName(ProjectEstimateExpectation.NORMAL),
  },
  {
    key:  ProjectEstimateExpectation.HIGH,
    text: projectEstimateExpectationName(ProjectEstimateExpectation.HIGH),
  }, {
    key:  ProjectEstimateExpectation.NEARLY,
    text: projectEstimateExpectationName(ProjectEstimateExpectation.NEARLY),
  },
  {
    key:  ProjectEstimateExpectation.WIN,
    text: projectEstimateExpectationName(ProjectEstimateExpectation.WIN),
  },
  {
    key:  ProjectEstimateExpectation.LOSE,
    text: projectEstimateExpectationName(ProjectEstimateExpectation.LOSE),
  }
]

export const projectEstimateStatusSearchList: Option[] = [
  {
    key:  ProjectEstimateStatus.ORAL,
    text: projectEstimateStatusName(ProjectEstimateStatus.ORAL),
  },
  {
    key:  ProjectEstimateStatus.BEFORE,
    text: projectEstimateStatusName(ProjectEstimateStatus.BEFORE),
  },
  {
    key:  ProjectEstimateStatus.COMPLETE,
    text: projectEstimateStatusName(ProjectEstimateStatus.COMPLETE),
  }, {
    key:  ProjectEstimateStatus.COMPARE,
    text: projectEstimateStatusName(ProjectEstimateStatus.COMPARE),
  }
]

export const projectContractStatusSearchList: Option[] = [
  {
    key:  ProjectContractStatus.BEFORE,
    text: projectContractStatusName(ProjectContractStatus.BEFORE),
  },
  {
    key:  ProjectContractStatus.COMPLETE,
    text: projectContractStatusName(ProjectContractStatus.COMPLETE),
  },
  {
    key:  ProjectContractStatus.CHANGE,
    text: projectContractStatusName(ProjectContractStatus.CHANGE),
  }
]

export const projectBidStatusSearchList: Option[] = [
  {
    key:  ProjectBidStatus.WAITING,
    text: projectBidStatusName(ProjectBidStatus.WAITING),
  },
  {
    key:  ProjectBidStatus.BID,
    text: projectBidStatusName(ProjectBidStatus.BID),
  },
  {
    key:  ProjectBidStatus.HOLD,
    text: projectBidStatusName(ProjectBidStatus.HOLD),
  }, {
    key:  ProjectBidStatus.WIN,
    text: projectBidStatusName(ProjectBidStatus.WIN),
  },
  {
    key:  ProjectBidStatus.LOSE,
    text: projectBidStatusName(ProjectBidStatus.LOSE),
  }, {
    key:  ProjectBidStatus.CONTRAST,
    text: projectBidStatusName(ProjectBidStatus.CONTRAST),
  }
]
