import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import {
  KeyboardArrowDown as DownIcon,
  KeyboardArrowUp as UpIcon
} from '@mui/icons-material';
import {
  TestServiceTemplateChangeSeqParameter,
  useTestServiceTemplate
} from 'services/standard_data/test_service_template';
import { Modal, Table, Tooltip, useDialog } from 'components';

type Item = {
  id: number;
  title: string;
  testType: string;
}

const TestServiceTemplateSeqModal = () => {
  const dialog = useDialog();
  const {
    state: {
      seqList: templateList,
      seqModal,
    },
    setSeqModal,
    getSeqList,
    clearSeqList,
    changeSeq,
  } = useTestServiceTemplate();
  const [list, setList] = useState<Item[]>([]);
  const [dirty, setDirty] = useState<boolean>(false);

  const handler = {
    close: () => {
      if (dirty) {
        dialog.rollback(() => {
          setSeqModal(false);
        });
      } else {
        setSeqModal(false);
      }
    },
    submit: () => {
      const params: TestServiceTemplateChangeSeqParameter = {
        idList: list.map((item) => (item.id))
      };
      changeSeq(params, () => {
        dialog.alert('변경하였습니다.', () => {
          setSeqModal(false);
        });
      });
    },
  };

  useEffect(() => {
    if (seqModal) {
      getSeqList();
    } else {
      clearSeqList();
    }
  }, [seqModal]);

  useEffect(() => {
    if (seqModal) {
      setList(templateList.map(item => ({
        id: item.id,
        title: item.title,
        testType: item.testType,
      })));
    }
  }, [templateList]);

  return (
    <Modal
      open={seqModal}
      title="용역 노출 순서 변경"
      onClose={handler.close}
    >
      <Table
        columns={[
          {
            label: 'No.',
            renderCell: (item, i) => i + 1,
          }, {
            label: '실험 타입',
            renderCell: (item) => item.testType,
          }, {
            label: '용역 항목',
            renderCell: (item) => item.title,
          }, {
            label: '순서',
            renderCell: (item, i) => (
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
              }}>
                <Tooltip title="순서 올리기">
                  <IconButton
                    disabled={i === 0}
                    onClick={() => {
                      const prevList = list.filter((t, k) => k !== i);
                      const nextList = [];
                      for (let k = 0; k < prevList.length; k++) {
                        if (nextList.length === i - 1) {
                          nextList.push(item);
                        }
                        nextList.push(prevList[k]);
                      }
                      setList(nextList);
                      if (!dirty) {
                        setDirty(true);
                      }
                    }}>
                    <UpIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="순서 내리기">
                  <IconButton
                    disabled={i === list.length - 1}
                    onClick={() => {
                      const prevList = list.filter((t, k) => k !== i);
                      const nextList = [];
                      for (let k = 0; k < prevList.length; k++) {
                        nextList.push(prevList[k]);
                        if (nextList.length === i + 1) {
                          nextList.push(item);
                        }
                      }
                      setList(nextList);
                      if (!dirty) {
                        setDirty(true);
                      }
                    }}>
                    <DownIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )
          }
        ]}
        list={list}
        footer={
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            height: '50px',
          }}>
            <Button
              color="primary"
              variant="contained"
              onClick={handler.submit}
            >
              저장
            </Button>
            <Button
              color="warning"
              variant="contained"
              onClick={handler.close}
            >
              취소
            </Button>
          </Box>
        }
      />
    </Modal>
  );
};

export default TestServiceTemplateSeqModal;
