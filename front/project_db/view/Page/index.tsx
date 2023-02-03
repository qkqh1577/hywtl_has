import React, {useCallback, useState} from 'react';
import PageLayout from 'layouts/PageLayout';
import List from './list';
import {Box, Button} from "@mui/material";
import Filter from "./filter";
import {useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import TabHolder from "./tabHolder";
import AddIcon from '@mui/icons-material/Add';
import PresetModal from "./presetModal";
import ProjectSearch from "./search";

const ProjectDbList = () => {
    const {list, schema, filter} = useSelector((root: RootState) => root.projectDb);
    const [presetModal, setPresetModal] = useState(false);

  const onModalOpen = useCallback(() => {
    setPresetModal(true);
  },[]);

  const onModalClose = useCallback(() => {
    setPresetModal(false);
  },[]);

  return (
        <>
            <Box style={{display: 'flex'}}>
                <Box style={{display: 'flex', width: 'calc(100% - 200px)'}}>
                    <TabHolder/>
                </Box>
                <Box style={{display: 'flex', width: '200px'}}>
                    <Button onClick={onModalOpen}
                            sx={{
                                width: '100%',
                                borderBottomLeftRadius:'0px !important',
                                borderBottomRightRadius:'0px !important'}}
                            startIcon={<AddIcon/>}>
                        프리셋 등록
                    </Button>
                    {presetModal && <PresetModal state={presetModal} handleClose={onModalClose}/>}
                </Box>
            </Box>
            <Box style={{display: 'flex', width: '100%', height: '100%', maxHeight: 'calc(100vh - 330px)'}}>
                <Box style={{display: 'flex', width: 'calc(100% - 200px)'}}>
                    <List list={list}/>
                </Box>
                <Box style={{display: 'flex', width: '200px'}}>
                    <Filter schema={schema} filter={filter}/>
                </Box>
            </Box>
        </>
    );
};

export default function ProjectDbPage() {
    return (
        <PageLayout
            title={"영업DB 분석"}
            // filter={<SearchBox/>}
            filter={<ProjectSearch/>}
            body={<ProjectDbList/>}
        />
    )
}