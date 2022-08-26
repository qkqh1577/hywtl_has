import { createReducer } from 'typesafe-actions';
import {
  LoginAction,
  MenuAction,
  ProjectDrawerAction
} from 'app/domain/action';
import { LoginUser } from 'app/domain/login';
import { Menu } from 'app/domain/menu';

export interface LoginState {
  user: LoginUser | undefined | null;
}

const initLoginState: LoginState = {
  user: undefined
};

export const loginReducer = createReducer(initLoginState, {
  [LoginAction.setLoginUser]:   (state,
                                 action
                                ) => ({
    ...state,
    user: { ...action.payload, loginAt: new Date() },
  }),
  [LoginAction.clearLoginUser]: (state) => ({
    ...state,
    user: undefined,
  })
});

export interface MenuState {
  menu: Menu[];
  open: boolean;
}

export const initMenuState: MenuState = {
  menu: [{
    title: 'Gantt Chart',
    icon:  'chart-gantt',
    depth: 1,
  }, {
    title:    '프로젝트',
    icon:     'file-powerpoint',
    depth:    1,
    children: [{
      title:    '영업본부',
      icon:     'circle',
      depth:    2,
      children: [{
        title: '영업정보 관리',
        path:  '/project/sales-management',
        icon:  'minus',
        depth: 3,
      }, {
        title: '수금 관리',
        icon:  'minus',
        depth: 3,
      }, {
        title: '수주 관리',
        icon:  'minus',
        depth: 3,
      }]
    }, {
      title:    '기술 본부',
      icon:     'circle',
      depth:    2,
      children: [{
        title: '프로젝트 관리',
        icon:  'minus',
        depth: 3,
      }]
    }]
  }, {
    title: '인사카드 관리',
    path:  '/hr/card',
    icon:  'address-card',
    depth: 1,
  }, {
    title: '업체 관리',
    path:  '/business-management',
    icon:  'building',
    depth: 1,
  }, {
    title: 'WBS 관리',
    icon:  'list-ol',
    depth: 1,
  }, {
    title:    '관리자 메뉴',
    icon:     'gear',
    depth:    1,
    children: [{
      title: '사용자 관리',
      path:  '/user-management',
      icon:  'circle',
      depth: 2,
    }, {
      title: '조직 관리',
      path:  '/department-management',
      icon:  'circle',
      depth: 2,
    }, {
      title:    '견적서 관리',
      icon:     'circle',
      depth:    2,
      children: [{
        title: '용역항목 관리',
        path:  '/estimate-template-management',
        icon:  'minus',
        depth: 3,
      }, {
        title: '견적서 내용 관리',
        icon:  'minus',
        depth: 3,
      }]
    }, {
      title:    '계약서 관리',
      icon:     'circle',
      depth:    2,
      children: [{
        title: '기본정보 관리',
        icon:  'minus',
        depth: 3,
      }, {
        title: '기성단계 관리',
        icon:  'minus',
        depth: 3,
      }, {
        title: '계약조건 관리',
        icon:  'minus',
        depth: 3,
      }]
    }, {
      title: '사용자 로그',
      icon:  'circle',
      depth: 2,
    }, {
      title: '권한 관리',
      icon:  'circle',
      depth: 2,
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
}

const initialProjectDrawerState: ProjectDrawerState = {
  open:       true,
  filterOpen: false,
};

export const projectDrawerReducer = createReducer(initialProjectDrawerState, {
  [ProjectDrawerAction.toggleMenu]:   (state) => ({
    ...state,
    open: !state.open
  }),
  [ProjectDrawerAction.toggleFilter]: (state) => ({
    ...state,
    filterOpen: !state.filterOpen
  })
});