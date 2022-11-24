export interface Address {
  zipNo: string;
  jibunAddr: string;
  roadAddr: string;
}

export const initialAddress: Address = {
  zipNo:     '',
  jibunAddr: '',
  roadAddr:  '',
};

export const URL = 'https://business.juso.go.kr/addrlink/addrLinkApi.do';
export const API_KEY = 'U01TX0FVVEgyMDIyMTExNDE1MTE1NTExMzIxODg=';
export const COUNT_PER_PAGE = 5;
export const SEARCH_RESULT_LIMIT_COUNT = 9000;
