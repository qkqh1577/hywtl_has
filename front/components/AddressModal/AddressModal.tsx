import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { Box, } from '@mui/material';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { ColorPalette } from 'assets/theme';
import { addressModalAction } from 'components/AddressModal/action';
import {
  Address,
  initialAddress
} from 'components/AddressModal/domain';
import { FormikContextType } from 'formik';
import {
  AddressQuery,
  initialAddressQuery
} from 'components/AddressModal/query';
import Footer from 'components/AddressModal/view/Footer';
import DefaultMessage from 'components/AddressModal/view/Form/DefaultMessage';
import PaginationSection from 'components/AddressModal/view/Form/PaginationSection';
import DetailAddressInput from 'components/AddressModal/view/Form/DetailAddressInput';
import AddressSearchSection from 'components/AddressModal/view/Form/AddressSearchSection';
import AddressForm from 'components/AddressModal/view/Form/AddressForm';
import { ProjectBasicDesignParameter } from 'project_basic/parameter';

export interface UpdateByFormik {
  formik: FormikContextType<any> | undefined;
  fieldName: string | string[];
}
/*TODO: 확장 가능성 있음. 생각해보기*/
export interface UpdateByDispatch {
  onUpdate: (params: ProjectBasicDesignParameter) => void;
}

interface Props {
  updateByFormik?: UpdateByFormik;
  updateByDispatch?: UpdateByDispatch;
}

export const AddressModal = ({ updateByFormik, updateByDispatch }: Props) => {
  const dispatch = useDispatch();
  const boxRef = useRef<Address>(initialAddress);
  const { addressModal, list, totalPage } = useSelector((state: RootState) => state.address);

  const [addressValue, setAddressValue] = useState<Address>(initialAddress);
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [query, setQuery] = useState<AddressQuery>(initialAddressQuery);
  const [addressList, setAddressList] = useState<Address[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const onClose = useCallback(() => dispatch(addressModalAction.addressModal(false)), [dispatch]);
  const setFilter = useCallback((query: AddressQuery) => dispatch(addressModalAction.setFilter(query)), [dispatch]);

  useEffect(() => {
    if (addressModal) {
      setFilter(query);
    }
  }, [query.page]);

  useEffect(() => {
    setAddressList(list);
  }, [list]);

  useEffect(() => {
      setQuery(initialAddressQuery);
      setDetailAddress('');
      setAddressList([]);
    }
    , [isSaved]);

  return (
    <ModalLayout
      title="주소 검색"
      width="500px"
      open={addressModal}
      onClose={onClose}
      footer={<Footer
        formik={updateByFormik?.formik ?? undefined}
        fieldName={updateByFormik?.fieldName ?? undefined}
        addressValue={addressValue}
        detailAddress={detailAddress}
        onClose={onClose}
        setIsSaved={setIsSaved}
        isSaved={isSaved}
        onUpdate={updateByDispatch?.onUpdate}
      />}
    >
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'wrap',
        height:   '100%',
      }}>
        <AddressSearchSection
          query={query}
          setQuery={setQuery}
        />
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
                <AddressForm
                  key={`${index}_${item.zipNo}`}
                  item={item}
                  boxRef={boxRef}
                  setAddressValue={setAddressValue}
                  index={index}
                />
              );
            })}
            {addressList.length > 0 && (
              <PaginationSection
                totalPage={totalPage}
                setQuery={setQuery}
              />
            )}
            {addressList.length === 0 && (
              <DefaultMessage />
            )}
          </Box>
        </Box>
        <DetailAddressInput
          detailAddress={detailAddress}
          setDetailAddress={setDetailAddress}
        />
      </Box>
    </ModalLayout>
  );
};
