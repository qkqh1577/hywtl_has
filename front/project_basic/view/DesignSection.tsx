import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import {
  Box,
  InputAdornment,
  MenuItem
} from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import { ProjectBasicDesignParameter } from 'project_basic/parameter';
import {
  buildingPurpose1List,
  buildingPurpose1Name,
  BuildingPurpose1Type,
  buildingPurpose2List,
  buildingPurpose2Name,
  BuildingPurpose2Type,
  CityDataVO,
  ProjectBasicDesignVO
} from 'project_basic/domain';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';
import Select from 'layouts/Select';

interface Props {
  detail: ProjectBasicDesignVO;
  onUpdate: (params: ProjectBasicDesignParameter) => void;
  onAddressModal: DefaultFunction;
  city1List?: CityDataVO[];
  city2List?: CityDataVO[];
  setRegCode: (string) => void;
  regCode: string;
}

export default function ProjectBasicDesignSection({
                                                    detail,
                                                    onUpdate,
                                                    onAddressModal,
                                                    city1List,
                                                    city2List,
                                                    setRegCode,
                                                    regCode
                                                  }: Props) {
  console.log('detail.city2 : ', detail.city2);
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
        },
        '& > div.extra-large': {
          width: 'calc(100% - 10px)',
        }
      }}>
        <Box
          className="extra-large"
        >
          <DataFieldWithLabel label="주소">
            <Input
              key={detail.address}
              defaultValue={detail.address ?? ''}
              endAdornment={
                <InputAdornment position="end" sx={{ marginRight: '10px' }}>
                  <Button onClick={onAddressModal}>
                    주소 검색
                  </Button>
                </InputAdornment>
              }
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
          <DataFieldWithLabel label="시/도1">
            <Select
              displayEmpty
              value={detail.city1 ?? ''}
              onChange={(e) => {
                const value = e.target.value as string || undefined;
                if (detail.city1 !== value) {
                  setRegCode(value);
                  onUpdate({ city1: value });
                }
              }}>
              <MenuItem value={''}>
                선택
              </MenuItem>
              {Array.isArray(city1List) && city1List.map(item => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="시/도2">
            <Select
              displayEmpty
              value={detail.city2 ?? ''}
              onChange={(e) => {
                const value = e.target.value as string || undefined;
                if (detail.city2 !== value) {
                  onUpdate({ city2: value });
                }
              }}>
              <MenuItem value={''}>
                선택
              </MenuItem>
              {Array.isArray(city2List) && city2List.map(item => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
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
          <DataFieldWithLabel label="건물용도1">
            <Select
              displayEmpty
              value={detail.purpose1 ?? ''}
              onChange={(e) => {
                const value = e.target.value as BuildingPurpose1Type || undefined;
                if (detail.purpose1 !== value) {
                  onUpdate({ purpose1: value });
                }
              }}>
              <MenuItem value={''}>
                선택
              </MenuItem>
              {buildingPurpose1List.map(item => (
                <MenuItem key={item} value={item}>
                  {buildingPurpose1Name(item)}
                </MenuItem>
              ))}
            </Select>
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="건물용도2">
            <Select
              displayEmpty
              value={detail.purpose2 ?? ''}
              onChange={(e) => {
                const value = e.target.value as BuildingPurpose2Type || undefined;
                if (detail.purpose2 !== value) {
                  onUpdate({ purpose2: value });
                }
              }}>
              <MenuItem value={''}>
                선택
              </MenuItem>
              {buildingPurpose2List.map(item => (
                <MenuItem key={item} value={item}>
                  {buildingPurpose2Name(item)}
                </MenuItem>
              ))}
            </Select>
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
