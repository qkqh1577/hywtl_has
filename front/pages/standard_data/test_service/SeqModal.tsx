import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Modal, Paper } from '@mui/material';
import {
  Close as CloseIcon,
  KeyboardArrowDown as DownIcon,
  KeyboardArrowUp as UpIcon
} from '@mui/icons-material';
import { useTestServiceTemplate } from 'services/standard_data/test_service_template';
import { Table, Tooltip, useDialog } from 'components';

type Item = {
  id: number;
  testType: string;
  title: string;
}

const TestServiceTemplateSeqModal = () => {
  const dialog = useDialog();
  const {
    state: {
      list: templateList,
      seqModal,
    },
    setSeqModal,
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

    }
  };
  useEffect(() => {
    setList(templateList.map(item => ({
      id: item.id,
      testType: item.testType,
      title: item.title,
    })));
  }, [templateList]);

  return (
    <Modal open={seqModal}>
      <Paper sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        overflow: 'hidden',
        bgColor: '#777',
        p: 4,
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '50px',
          mb: '40px',
        }}>
          <h2>용역 노출 순서 변경</h2>
          <IconButton
            color="primary"
            onClick={handler.close}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{
          display: 'flex',
          width: '100%',
          mb: '40px',
        }}>
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
        </Box>
      </Paper>
    </Modal>
  );
};

export default TestServiceTemplateSeqModal;
