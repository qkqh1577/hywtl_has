import React, {useEffect, useRef, useState} from 'react';
import PageLayout from 'layouts/PageLayout';
import List from './list';
import SearchBox from './form';
import {Box, Button, Input, Modal, Typography} from "@mui/material";
import Filter from "./filter";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import TabHolder from "./tabHolder";
import AddIcon from '@mui/icons-material/Add';
import {dialogActions} from "../../../components/Dialog";
import {ProjectDbPreset} from "../../domain";
import {projectDbAction} from "../../action";
import PresetModal from "./presetModal";

interface PresetSaveModalProps {
    state: boolean,
    close: () => void
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ProjectDbList = () => {

    const {list, schema, filter} = useSelector((root: RootState) => root.projectDb);
    const [presetModal, setPresetModal] = useState(false);

    return (
        <>
            <Box style={{display: 'flex'}}>
                <Box style={{display: 'flex', width: 'calc(100% - 200px)'}}>
                    <TabHolder/>
                </Box>
                <Box style={{display: 'flex', width: '200px'}}>
                    <Button onClick={() => setPresetModal(true)}
                            sx={{
                                width: '100%',
                                borderBottomLeftRadius:'0px !important',
                                borderBottomRightRadius:'0px !important'}}
                            startIcon={<AddIcon/>}>
                        프리셋 등록
                    </Button>
                    {presetModal && <PresetModal state={presetModal} handleClose={() => setPresetModal(false)}/>}
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
            filter={<SearchBox/>}
            body={<ProjectDbList/>}
        />
    )
}