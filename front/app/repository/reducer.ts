import { createReducer } from 'typesafe-actions';
import {
  MenuAction,
  ProjectDrawerAction
} from 'app/domain/action';
import { Menu } from 'app/domain/menu';

export interface MenuState {
  menu: Menu[];
  open: boolean;
}

export const initMenuState: MenuState = {
  menu: [{
    title: 'Gantt Chart',
    icon:  'chart-gantt',
  }, {
    title:    '프로젝트',
    icon:     'file-powerpoint',
    path:     '/project',
    children: [{
      title:    '영업본부',
      icon:     'circle',
      path:     '/project/sales-management',
      children: [{
        title: '영업정보 관리',
        path:  '/project/sales-management',
        icon:  'minus',
      }, {
        title: '수금 관리',
        icon:  'minus',
      }, {
        title: '수주 관리',
        icon:  'minus',
      }]
    }, {
      title:    '기술 본부',
      icon:     'circle',
      children: [{
        title: '프로젝트 관리',
        icon:  'minus',
      }]
    }]
  }, {
    title: '인사카드 관리',
    path:  '/hr-card-management',
    icon:  'address-card',
  }, {
    title: '업체 관리',
    path:  '/business-management',
    icon:  'building',
  }, {
    title: 'WBS 관리',
    icon:  'list-ol',
  }, {
    title:    '관리자 메뉴',
    icon:     'gear',
    path:     '/admin',
    children: [{
      title: '사용자 관리',
      path:  '/admin/user-management',
      icon:  'circle',
    }, {
      title: '조직 관리',
      path:  '/admin/department-management',
      icon:  'circle',
    }, {
      title:    '견적서 관리',
      icon:     'circle',
      children: [{
        title: '용역항목 관리',
        path:  '/admin/estimate-template-management',
        icon:  'minus',
      }, {
        title: '견적서 내용 관리',
        path:  '/admin/estimate-content-management',
        icon:  'minus',
      }]
    }, {
      title:    '계약서 관리',
      icon:     'circle',
      children: [{
        title: '기본정보 관리',
        path:  '/admin/contract-basic-management',
        icon:  'minus',
      }, {
        title: '기성단계 관리',
        path:  '/admin/contract-collection-management',
        icon:  'minus',
      }, {
        title: '계약조건 관리',
        path:  '/admin/contract-condition-management',
        icon:  'minus',
      }]
    }, {
      title: '사용자 로그',
      icon:  'circle',
    }, {
      title: '권한 관리',
      icon:  'circle',
    }]
  }],
  open: true,
};

export const menuReducer = createReducer(initMenuState, {
  [MenuAction.setMenu]:        (state,
                                action
                               ) => ({
    ...state,
    menu: action.payload,
  }),
  [MenuAction.toggleMenuOpen]: (state) => ({
    ...state,
    open: !state.open
  })
});

export interface ProjectDrawerState {
  open: boolean;
  filterOpen: boolean;
  filterStatus: 'idle' | 'open' | 'close';
}

const initialProjectDrawerState: ProjectDrawerState = {
  open:         true,
  filterOpen:   false,
  filterStatus: 'idle'
};

export const projectDrawerReducer = createReducer(initialProjectDrawerState, {
  [ProjectDrawerAction.toggleMenu]:   (state) => ({
    ...state,
    open: !state.open
  }),
  [ProjectDrawerAction.toggleFilter]: (state) => ({
    ...state,
    filterOpen: !state.filterOpen
  }),
  ['app/project/filter/status']:      (state,
                                       action
                                      ) => ({
    ...state,
    filterStatus: action.filterStatus,
  })
});
