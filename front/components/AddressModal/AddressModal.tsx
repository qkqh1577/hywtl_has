import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import ModalLayout from 'layouts/ModalLayout';
import {
  Box,
  Pagination,
  Stack,
} from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import Button from 'layouts/Button';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { ColorPalette } from 'assets/theme';
import { addressModalAction } from 'components/AddressModal/action';
import TextBox from 'layouts/Text';
import {
  Address,
  initialAddress
} from 'components/AddressModal/domain';
import { FormikContextType } from 'formik';
import {
  AddressQuery,
  initialAddressQuery
} from 'components/AddressModal/query';

interface Props {
  formik: FormikContextType<any>;
  fieldName: string;
}

export const AddressModal = ({ formik, fieldName }: Props) => {
  const dispatch = useDispatch();
  const boxRef = useRef<Address>(initialAddress);
  const { addressModal, list, totalPage } = useSelector((state: RootState) => state.address);
  const [addressValue, setAddressValue] = useState<Address>(initialAddress);
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [query, setQuery] = useState<AddressQuery>(initialAddressQuery);
  const [addressList, setAddressList] = useState<Address[]>([]);
  const onClose = useCallback(() => dispatch(addressModalAction.addressModal(false)), [dispatch]);
  const setFilter = useCallback((query: AddressQuery) => dispatch(addressModalAction.setFilter(query)), [dispatch]);

  useEffect(() => {
    if (addressModal) {
      setFilter(query);
    }
  }, [query.page]);

  useEffect( () => {
    setAddressList(list);
  },[list])

  return (
    <ModalLayout
      title="주소 검색"
      width="500px"
      open={!!addressModal}
      onClose={onClose}
      footer={
        <Box sx={{
          width:          '100%',
          margin:         '20px 0',
          display:        'flex',
          justifyContent: 'center',
          alignItems:     'center',
        }}>
          <Button
            sx={{
              marginRight: '10px',
            }}
            onClick={() => {
              formik.setFieldValue(fieldName, `${addressValue.roadAddr} ${detailAddress}`);
              setQuery(initialAddressQuery);
              setDetailAddress('');
              setAddressList([]);
              onClose();
            }}>
            저장
          </Button>
          <Button
            shape="basic2"
            onClick={() => {
              setQuery(initialAddressQuery);
              setAddressList([]);
              onClose();
            }}>
            취소
          </Button>
        </Box>}
    >
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'wrap',
        height:   '100%',
      }}>
        <Box sx={{
          display:      'flex',
          width:        '100%',
          flexWrap:     'nowrap',
          padding:      '10px',
          border:       `1px solid ${ColorPalette._e4e9f2}`,
          marginBottom: '10px',
        }}>
          <Box sx={{
            display:     'flex',
            flexWrap:    'nowrap',
            width:       '100%',
            marginRight: '10px',
          }}>
            <Input
              variant="outlined"
              placeholder="입력"
              value={query.keyword ?? ''}
              onChange={(e) => {
                const value = e.target.value || undefined;
                if (value !== query.keyword) {
                  setQuery((prevState) => ({ ...prevState, keyword: value, page: 1 }));
                }
              }}
            />
          </Box>
          <Box sx={{
            display:  'flex',
            flexWrap: 'nowrap',
          }}>
            <Button sx={{ marginRight: '10px' }} onClick={() => {
              dispatch(addressModalAction.setFilter(query));
            }}>
              검색
            </Button>
          </Box>
        </Box>
        <Box sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'nowrap',
          padding:  '10px',
          border:   `1px solid ${ColorPalette._e4e9f2}`,
        }}>
          <Box sx={{
            display:       'flex',
            flexDirection: 'column',
            width:         '100%',
            height:        '100%',
            padding:       '10px'
          }}>
            {addressList.length > 0 && addressList.map((item,
                                          index
            ) => {
              return (
                <Box
                  ref={boxRef}
                  onClick={() => {
                    boxRef.current = item;
                    setAddressValue(boxRef.current);
                  }}
                  key={`${index}_${item.zipNo}`}
                  sx={{
                    display:         'flex',
                    width:           '100%',
                    flexWrap:        'nowrap',
                    padding:         '10px',
                    border:          `1px solid ${ColorPalette._e4e9f2}`,
                    marginBottom:    '3px',
                    flexDirection:   'column',
                    cursor:          'pointer',
                    backgroundColor: (boxRef.current?.roadAddr ?? null) === item.roadAddr ? ColorPalette._e4e9f2 : ColorPalette._ffffff,
                  }}>
                  <TextBox variant="body1">{item.zipNo}</TextBox>
                  <TextBox variant="body2">{item.roadAddr}</TextBox>
                  <TextBox variant="body2">{item.jibunAddr}</TextBox>
                </Box>
              );
            })}
            {addressList.length > 0 && (
              <Stack spacing={2} direction="row" sx={{
                display:        'flex',
                justifyContent: 'center',
                width:          '100%',
                marginTop:      '3px'
              }
              }>
                <Pagination
                  count={totalPage}
                  color={'secondary'}
                  shape="rounded"
                  size="small"
                  showFirstButton
                  showLastButton
                  onChange={(e: ChangeEvent<unknown>,
                             page: number
                  ) => {
                    setQuery((prevState) => ({ ...prevState, page: page }));
                  }}
                />
              </Stack>
            )}
            {addressList.length === 0 && (
              <>
                <Box sx={{
                  display:       'flex',
                  flexDirection: 'column',
                  marginBottom:  '3px'
                }}>
                  <TextBox variant="body2">도로명 + 건설 번호</TextBox>
                  <TextBox variant="body12">예) 판교역로 235, 제주첨단로 242</TextBox>
                </Box>
                <Box sx={{
                  display:       'flex',
                  flexDirection: 'column',
                  marginBottom:  '3px'
                }}>
                  <TextBox variant="body2">지역명(동/리) + 번지</TextBox>
                  <TextBox variant="body12">예) 삼평동 681, 제주 영평동 2181</TextBox>
                </Box>
                <Box sx={{
                  display:       'flex',
                  flexDirection: 'column',
                  marginBottom:  '3px'
                }}>
                  <TextBox variant="body2">지역명(동/리) + 건물명(아파트명)</TextBox>
                  <TextBox variant="body12">예) 분당 주공, 연수동 주공 3차</TextBox>
                </Box>
                <Box sx={{
                  display:       'flex',
                  flexDirection: 'column',
                }}>
                  <TextBox variant="body2">사서함명 + 번호</TextBox>
                  <TextBox variant="body12">예) 분당우체국사서함 1~100</TextBox>
                </Box>
              </>
            )}
          </Box>
        </Box>
        <Box sx={{
          display:   'flex',
          width:     '100%',
          flexWrap:  'nowrap',
          padding:   '10px',
          border:    `1px solid ${ColorPalette._e4e9f2}`,
          marginTop: '10px',
        }}>
          <Box sx={{
            display:     'flex',
            flexWrap:    'nowrap',
            width:       '100%',
            marginRight: '10px',
          }}>
            <DataFieldWithLabel label="상세주소">
              <Input
                variant="outlined"
                placeholder="입력"
                value={detailAddress ?? ''}
                onChange={(e) => {
                  const value = e.target.value || '';
                  if (value !== detailAddress) {
                    setDetailAddress(value);
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
      </Box>
    </ModalLayout>
  );
};
