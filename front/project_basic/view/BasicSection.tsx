import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import { Grid } from '@mui/material';
import {
  ProjectBasicBidType,
  projectBasicBidTypeList,
  projectBasicBidTypeName
} from 'project_status/domain';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import { ProjectBasic } from 'project_basic/domain';
import { ExtensionInput } from 'project_basic/view/components/ExtensionInput';
import { PlainUserSelector } from 'project_basic/view/components/PlainUserSelector';
import { ExtensionSelect } from 'project_basic/view/components/ExtensionSelect';

interface Props {
  basic?: ProjectBasic;
  handleChangeBidType: (v: ProjectBasicBidType) => void;
}

export default function ProjectBasicBasicSection({ basic, handleChangeBidType }: Props) {

  return (
    <SectionLayout title="기본 정보">
      <Grid container spacing={2}>
        <Grid item sm={3}>
          <DataFieldWithLabel
            label="프로젝트 번호"
            labelWidth={7 * 13}
            required={false}
          >
            <Input
              disabled={true}
              type="text"
              value={basic?.code || ''}
            />
          </DataFieldWithLabel>
        </Grid>
        <Grid item sm={3}>
          <DataFieldWithLabel
            label="프로젝트 닉네임"
            labelWidth={7 * 13}
            required={true}
          >
            <ExtensionInput
              value={basic?.alias}
              onBlur={(v) => console.log('onBlur', v)}
            />
          </DataFieldWithLabel>
        </Grid>
        <Grid item sm={6}>
          <DataFieldWithLabel
            label="프로젝트 풀네임"
            labelWidth={7 * 13}
            required={true}
          >
            <ExtensionInput
              value={basic?.name}
              onBlur={(v) => console.log('onBlur', v)}
            />
          </DataFieldWithLabel>
        </Grid>
        <Grid item sm={3}>
          <DataFieldWithLabel
            label="견적 구분"
            labelWidth={7 * 13}
            required={true}
          >
            <ExtensionSelect
              value={basic?.bidType}
              onChange={v => {
                console.log(v);
                handleChangeBidType(v as ProjectBasicBidType);
              }}
              option={projectBasicBidTypeList.map(item => ({
                key:  item,
                text: projectBasicBidTypeName(item),
              }))}
            />
          </DataFieldWithLabel>
        </Grid>
        <Grid item sm={3}>
          <DataFieldWithLabel
            label="문의 접수자"
            labelWidth={7 * 13}
            required={true}
          >
            <PlainUserSelector
              selectedUserId={basic?.receptionManager.id}
              onChange={e => console.log(e)}
            />
          </DataFieldWithLabel>
        </Grid>
        <Grid item sm={3}>
          <DataFieldWithLabel
            label="영업 담당자"
            labelWidth={7 * 13}
          >
            <PlainUserSelector
              selectedUserId={basic?.salesManager?.id}
              onChange={e => console.log(e)}
            />
          </DataFieldWithLabel>
        </Grid>
        <Grid item sm={3}>
          <DataFieldWithLabel
            label="담당 PM"
            labelWidth={7 * 13}
          >
            <PlainUserSelector
              selectedUserId={basic?.projectManager?.id}
              onChange={e => console.log(e)}
            />
          </DataFieldWithLabel>
        </Grid>
        <Grid item sm={3}>
          예상 착수 시기 TBD
        </Grid>
        <Grid item sm={3}>
          요청 일정 TBD
        </Grid>
        <Grid item sm={3}>
          <DataFieldWithLabel
            label="LH 여부"
            labelWidth={7 * 13}
          >
            <ExtensionSelect
              value={basic?.isLh?.toString()}
              onChange={e => console.log(e)}
              option={[{
                key:  'true',
                text: '예'
              }, {
                key:  'false',
                text: '아니오'
              }]}
            />
          </DataFieldWithLabel>
        </Grid>
      </Grid>
    </SectionLayout>
  );
}
