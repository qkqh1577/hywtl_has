import SectionLayout from 'layouts/SectionLayout';
import { Box } from '@mui/material';
import React from 'react';
import ProjectComplexTestSection from 'project_complex/view/TestSection';
import TextField from 'components/TextField';
import { FieldStatus } from 'components/DataFieldProps';
import { ProjectComplexTestVO } from 'project_complex/domain';

export default function ProjectBasicTestSection(props: Partial<ProjectComplexTestVO>) {

  return (
    <SectionLayout title="실험 정보">
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'wrap',
      }}>
        <Box sx={{
          display:      'flex',
          width:        '100%',
          flexWrap:     'nowrap',
          marginBottom: '15px',
        }}>
          <Box sx={{
            display:     'flex',
            width:       '25%',
            flexWrap:    'nowrap',
            marginRight: '15px',
          }}>
            <TextField
              name="siteCount"
              label="대지 모형 수"
              status={FieldStatus.Disabled}
            />
          </Box>
          <Box sx={{
            display:  'flex',
            width:    '25%',
            flexWrap: 'nowrap',
          }}>
            <TextField
              name="targetTest"
              label="실험 대상 동 수"
              status={FieldStatus.Disabled}
            />
          </Box>
        </Box>
        <Box sx={{
          width:    '100%',
          display:  'flex',
          flexWrap: 'nowrap',
        }}>
          <ProjectComplexTestSection testList={props.testList} />
        </Box>
      </Box>
    </SectionLayout>
  );
}