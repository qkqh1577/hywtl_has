import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { Grid, MenuItem, TextField } from '@mui/material';
import { departmentCategoryList, departmentCategoryName } from '../../services/department/data';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  //border: '1px solid rgba(0,0,0,0.3)',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

export default function DepartmentAddModalPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outlined">
        부서추가
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <h3>부서 추가</h3>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  type="text"
                  name="name"
                  label="부서명"
                  placeholder="부서명을 입력하세요"
                  required
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  select
                  type="select"
                  name="category"
                  label="부서 유형"
                  value="unselect"
                  placeholder="부서 유형을 선택하세요"
                  required
                >
                  <MenuItem value="unselect">선택</MenuItem>
                  {departmentCategoryList.map(category => (
                    <MenuItem key={category} value={category}>
                      {departmentCategoryName(category)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  type="number"
                  name="seq"
                  label="노출 순서"
                  placeholder="노출 순서를 지정하세요"
                  required
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  type="text"
                  name="memo"
                  label="설명"
                  placeholder="설명을 입력하세요"
                />
              </Grid>
              <Grid item sm={12}>
                <Button
                  onClick={() => {
                    handleClose();
                  }}
                >
                  취소
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  저장
                </Button>
              </Grid>
            </Grid>
        </Box>
      </Modal>
    </>
  );
}