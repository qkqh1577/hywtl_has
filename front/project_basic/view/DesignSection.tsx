import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import { Box } from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import { ProjectBasicDesignParameter } from 'project_basic/parameter';
import { ProjectBasicDesignVO } from 'project_basic/domain';

interface Props {
  detail: ProjectBasicDesignVO;
  onUpdate: (params: ProjectBasicDesignParameter) => void;
}

export default function ProjectBasicDesignSection({ detail, onUpdate }: Props) {
  return (
    <SectionLayout title="설계 개요" modifiedAt={detail.modifiedAt}>
      <Box sx={{
        width:                 '100%',
        display:               'flex',
        flexWrap:              'wrap',
        '& > div':             {
          marginBottom: '10px',
          marginRight:  '10px',
        },
        '& > div:not(.large)': {
          width: 'calc(24% - 10px)',
        },
        '& > div.large':       {
          width: 'calc(48% - 10px)',
        }
      }}>
        <Box>
          <DataFieldWithLabel label="시/도">
            <Input
              key={detail.city}
              defaultValue={detail.city ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (detail.city !== value) {
                  onUpdate({ city: value });
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box className="large">
          <DataFieldWithLabel label="주소">
            <Input
              key={detail.address}
              defaultValue={detail.address ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (detail.address !== value) {
                  onUpdate({ address: value });
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="단지 수">
            <Input
              type="number"
              key={detail.complexCount}
              defaultValue={detail.complexCount ?? ''}
              onBlur={(e) => {
                const value = +(e.target.value) || undefined;
                if (detail.complexCount !== value) {
                  onUpdate({ complexCount: value });
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="건물용도1">
            <Input
              key={detail.purpose1}
              defaultValue={detail.purpose1 ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (detail.purpose1 !== value) {
                  onUpdate({ purpose1: value });
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="건물용도2">
            <Input
              key={detail.purpose2}
              defaultValue={detail.purpose2 ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (detail.purpose2 !== value) {
                  onUpdate({ purpose2: value });
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="대지면적(㎡)">
            <Input
              type="number"
              key={detail.lotArea}
              defaultValue={detail.lotArea ?? ''}
              onBlur={(e) => {
                const value = +(e.target.value) || undefined;
                if (detail.lotArea !== value) {
                  onUpdate({ lotArea: value });
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="연면적(㎡)">
            <Input
              type="number"
              key={detail.totalArea}
              defaultValue={detail.totalArea ?? ''}
              onBlur={(e) => {
                const value = +(e.target.value) || undefined;
                if (detail.totalArea !== value) {
                  onUpdate({ totalArea: value });
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="총 동 수">
            <Input
              type="number"
              key={detail.totalBuildingCount}
              defaultValue={detail.totalBuildingCount ?? ''}
              onBlur={(e) => {
                const value = +(e.target.value) || undefined;
                if (detail.totalBuildingCount !== value) {
                  onUpdate({ totalBuildingCount: value });
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="세대 수">
            <Input
              type="number"
              key={detail.householdCount}
              defaultValue={detail.householdCount ?? ''}
              onBlur={(e) => {
                const value = +(e.target.value) || undefined;
                if (detail.householdCount !== value) {
                  onUpdate({ householdCount: value });
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="최고 층 수">
            <Input
              type="number"
              key={detail.maximumFloor}
              defaultValue={detail.maximumFloor ?? ''}
              onBlur={(e) => {
                const value = +(e.target.value) || undefined;
                if (detail.maximumFloor !== value) {
                  onUpdate({ maximumFloor: value });
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="최고 높이(m)">
            <Input
              type="number"
              key={detail.maximumHeight}
              defaultValue={detail.maximumHeight ?? ''}
              onBlur={(e) => {
                const value = +(e.target.value) || undefined;
                if (detail.maximumHeight !== value) {
                  onUpdate({ maximumHeight: value });
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
      </Box>
    </SectionLayout>
  );
}
