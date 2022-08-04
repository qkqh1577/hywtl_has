import {
  Link
} from '@mui/material';
import { Table } from 'components';
import React from 'react';
import { useTestServiceTemplate } from 'services/standard_data/test_service_template';
import SeqModalButton from './SeqModalButton';
import AddButton from './AddButton';
import { useNavigate } from 'react-router-dom';

export default function TestServiceListDataList() {
  const { list } = useTestServiceTemplate();
  const navigate = useNavigate();
  return (
    <Table
      list={list}
      title={`총 ${list?.length}건`}
      titleRightComponent={
        <>
          <SeqModalButton />
          <AddButton />
        </>
      }
      columns={[
        {
          label:      'No.',
          renderCell: (item,
                       i
                      ) => i + 1
        }, {
          label:      '실험 타입',
          renderCell: (item) => item.testType
        }, {
          label:      '용역 항목',
          renderCell: (item) => (
            <Link onClick={() => {
              navigate(`/test-service/${item.id}`);
            }}>
              {item.title}
            </Link>
          )
        }, {
          label:      '세부 항목',
          renderCell: (item) => `${item.detailCount}개`,
        }, {
          label:      '총액',
          renderCell: (item) => item.totalPrice.toLocaleString(),
        }
      ]}
    />
  );
}