import { ColorPalette } from 'assets/theme';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import DataBox from 'project_status/view/StatusBar/DataBox';
import Input from 'layouts/Input';
import { cut10000 } from 'util/NumberUtil';
import { ProjectCollectionStageShortVO } from 'project_collection/domain';
import dayjs from 'dayjs';
import { ProjectId } from 'project/domain';

interface CollectionBoxProps {
  stageList: ProjectCollectionStageShortVO[] | undefined;
  onClick?: () => void;
}

interface Props
  extends CollectionBoxProps {
  targetTest: string | undefined;
  testAmount: number | undefined;
  reviewAmount: number | undefined;

  id: ProjectId | undefined;
}


function CollectionBox({ stageList, onClick }: CollectionBoxProps) {
  const title = useMemo(() => {
    if (!stageList || stageList.length === 0) {
      return '최근 수금';
    }

    const collectedStageList = stageList.filter(item => item.collectedDate && item.collectedAmount);
    if (collectedStageList.length === 0) {
      return '최근 수금';
    }

    const totalCollectedAmount = collectedStageList.map(item => item.collectedAmount!)
                                                   .reduce((a,
                                                            b
                                                   ) => a + b, 0);
    return `최근 수금(${totalCollectedAmount.toLocaleString()})`;


  }, [stageList]);
  const latestStage = useMemo(() => {
    if (!stageList || stageList.length === 0) {
      return undefined;
    }
    const collectedStageList = stageList.filter(item => item.collectedDate && item.collectedAmount);
    if (collectedStageList.length === 0) {
      return undefined;
    }

    return collectedStageList.reduce((a,
                                      b
    ) => {
      const aDate = dayjs(a.collectedDate);
      const bDate = dayjs(b.collectedDate);
      return aDate.isAfter(bDate) ? a : b;
    });
  }, [stageList]);

  const collectedStageName = useMemo(() => {
    if (!latestStage) {
      return undefined;
    }
    const name = latestStage.name;
    return name.length < 2 ? name : name.substring(0, 2);
  }, [latestStage]);

  const collectedDate = useMemo(() => {
    if (!latestStage) {
      return undefined;
    }
    return dayjs(latestStage.collectedDate)
    .format('YYYY-MM-DD');
  }, [latestStage]);

  const collectedAmount = useMemo(() => {
    if (!latestStage) {
      return undefined;
    }
    return cut10000(latestStage.collectedAmount);
  }, [latestStage]);

  return (
    <DataBox title={title} width="220px" onClick={onClick}>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        flexWrap:       'nowrap',
        justifyContent: 'space-between',
        alignItems:     'center',
      }}
      >
        <Box sx={{
          width: '23%'
        }}>
          <Input
            readOnly
            variant="outlined"
            key={collectedStageName}
            defaultValue={collectedStageName ?? ''}
          />
        </Box>
        <Box sx={{
          width: '44%'
        }}>
          <Input
            readOnly
            variant="outlined"
            key={collectedDate}
            defaultValue={collectedDate ?? ''}
          />
        </Box>
        <Box sx={{ width: '30%' }}>
          <Input
            readOnly
            variant="outlined"
            key={collectedAmount}
            defaultValue={collectedAmount?.toLocaleString() ?? ''}
          />
        </Box>
      </Box>
    </DataBox>
  );
}

export default function ProjectStatusRightBar(props: Props) {

  const amount = `${cut10000(props.testAmount)
  .toLocaleString()} + ${cut10000(props.reviewAmount)
  .toLocaleString()}`;
  return (
    <Box sx={{
      display:        'flex',
      width:          'calc(50% - 10px)',
      flexWrap:       'nowrap',
      justifyContent: 'space-between',
      '& > div':      {
        backgroundColor: ColorPalette._cddaf5,
      },
    }}>
      <DataBox title="실험 종류" width="115px">
        <Input
          readOnly
          variant="outlined"
          key={props.targetTest}
          defaultValue={props.targetTest ?? ''}
        />
      </DataBox>
      <DataBox title="진행율" width="70px">
        <Box>
          <Input
            readOnly
            variant="outlined"
            defaultValue="TBD"
          />
        </Box>
      </DataBox>
      <DataBox title="계약 금액" width="100px">
        <Input
          readOnly
          variant="outlined"
          key={amount}
          defaultValue={amount}
        />
      </DataBox>
      <CollectionBox
        onClick={() => {
          if (props.id) {
            window.open(`/project/sales-management/${props.id}/progress`, '_self');
          }
        }}
        stageList={props.stageList}
      />
    </Box>
  );
}
