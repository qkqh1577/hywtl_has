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

const PresetSaveModal = (props: PresetSaveModalProps) => {
    const {state, close} = props;

    const {filter} = useSelector((root: RootState) => root.projectDb);
    const [presetName, setPresetName] = useState('');
    const dispatch = useDispatch();

    const onSaveButtonClick = () => {
        if (presetName === '') {
            dispatch(dialogActions.openAlert({
                status: 'error',
                children: '프리셋 이름은 필수 입니다.'
            }));
            return;
        }

        const preset: ProjectDbPreset = {
            id:0,
            name: presetName,
            filter: filter
        };

        dispatch(projectDbAction.addPreset(preset));
        close();

    };

    return (
        <Modal
            open={state}
            onClose={close}
        >
            <Box sx={style}>
                <Box sx={{marginBottom: '20px'}}>
                    <Input
                        sx={{width: '100%'}}
                        inputRef={input => {
                            input && setTimeout(() => {
                                input.focus();
                            }, 100);
                        }}
                        onChange={(event) => setPresetName(event.target.value)}
                        placeholder="저장할 프리셋 이름을 입력 하세요"/>
                </Box>
                <Box sx={{textAlign: 'center'}}>
                    <Button onClick={onSaveButtonClick}>신규 프리셋 등록</Button>
                </Box>
            </Box>
        </Modal>
    );
};

const ProjectDbList = () => {

    const {list, schema, filter} = useSelector((root: RootState) => root.projectDb);
    const [presetModal, setPresetModal] = useState(false);

    const onPresetSaveButtonClicked = () => {
        setPresetModal(true);
    };

    const onPresetSaveModalClose = () => {
        setPresetModal(false);
    };

    return (
        <>
            <Box style={{display: 'flex'}}>
                <Box style={{display: 'flex', width: 'calc(100% - 200px)'}}>
                    <TabHolder/>
                </Box>
                <Box style={{display: 'flex', width: '200px'}}>
                    <Button onClick={onPresetSaveButtonClicked} sx={{width: '100%'}} startIcon={<AddIcon/>}>
                        프리셋 등록
                    </Button>
                    {presetModal && <PresetSaveModal state={presetModal} close={onPresetSaveModalClose}/>}
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