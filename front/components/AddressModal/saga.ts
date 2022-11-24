import {
  call,
  put,
  take
} from 'redux-saga/effects';
import { addressModalAction } from 'components/AddressModal/action';
import { addressModalApi } from 'components/AddressModal/api';
import {
  Address,
  COUNT_PER_PAGE,
  SEARCH_RESULT_LIMIT_COUNT,
} from 'components/AddressModal/domain';
import { dialogAction } from 'dialog/action';

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(addressModalAction.setFilter);
    try {
      const data = yield call(addressModalApi.searchAddress, query);
      const common = data.results.common;
      if (common.totalCount > SEARCH_RESULT_LIMIT_COUNT) {
        yield put(dialogAction.openError('주소를 상세히 입력해 주시기 바랍니다.'));
        continue;
      }

      if (common.errorCode !== '0') {
        yield put(dialogAction.openError(common.errorMessage));
        continue;
      }
      const reformatDataList = reformatData(data.results.juso);
      yield put(addressModalAction.setList(reformatDataList));
      yield put(addressModalAction.setTotalPage(Math.ceil(common.totalCount / COUNT_PER_PAGE)));
    }
    catch (e) {
      yield put(dialogAction.openError('관리자에게 문의해 주시기 바랍니다.'));
    }
  }
}

export default function* addressModalSaga() {
  yield watchFilter();
}


const reformatData = (list: any): Address[] => {

  return list.map(item => {
    return {
      zipNo:     item.zipNo,
      jibunAddr: item.jibunAddr,
      roadAddr:  item.roadAddr,
    };
  });
};
