import {
  Box,
  Button
} from '@mui/material';
import IconButton from 'components/IconButton';
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon
} from '@mui/icons-material';
import React from 'react';
import ProjectAddModal from './AddModal';
import { FormikPartial } from 'type/Form';
import { ProjectAddParameter } from 'project/parameter';
import { FormikContextType } from 'formik';

export interface ProjectAppBarProps {
  openMenu: boolean;
  toggleMenu: () => void;
  openAddModal: boolean;
  setAddModal: (open: boolean) => void;
  addModalFormik: FormikContextType<FormikPartial<ProjectAddParameter>>;
}

export default function ProjectAppBar({
                                        openMenu,
                                        toggleMenu,
                                        openAddModal,
                                        setAddModal,
                                        addModalFormik,
                                      }: ProjectAppBarProps) {
  const onClick = () => {
    setAddModal(true);
  };
  return (
    <Box sx={{
      width:          '340px',
      padding:        '12px 4px',
      display:        'flex',
      flexWrap:       'wrap',
      justifyContent: 'space-between',
      alignContent:   'flex-end',
      borderRight:    '1px solid rgb(245, 245, 245)'
    }}>
      <Button onClick={onClick}>신규 프로젝트 등록</Button>
      <IconButton
        tooltip={'프로젝트 메뉴 ' + (openMenu ? '접기' : '펴기')}
        onClick={toggleMenu}
        children={openMenu ? <LeftIcon /> : <RightIcon />}
      />
      <ProjectAddModal open={openAddModal} setOpen={setAddModal} formik={addModalFormik} />
    </Box>
  );
}