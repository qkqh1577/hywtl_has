import React, {useCallback, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import {ProjectDbPreset} from "../../domain";
import {projectDbAction} from "../../action";

interface Props {
    state: boolean,
    handleClose: () => void
};

export default function PresetModal(props: Props) {
    const {state, handleClose} = props;
    const {filter} = useSelector((root: RootState) => root.projectDb);
    const [presetName, setPresetName] = useState('');
    const [helperText, setHelperText] = useState('');
    const dispatch = useDispatch();

    const onSaveButtonClick = () => {
        if (presetName === '') {
            setHelperText('프리셋 이름은 필수 입니다');
            return;
        }
        const preset: ProjectDbPreset = {
            id: 0,
            name: presetName,
            filter: filter
        };
        dispatch(projectDbAction.addPreset(preset)) && handleClose();
    };

    return (
        <Dialog open={state} onClose={handleClose}>
            <DialogTitle>프리셋 등록</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    현재 설정된 프로젝트 속성 필터 상태를 프리셋으로 저장 합니다. 등록한 프리셋은 목록 상단에 탭 형태로 제공됩니다.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="프리셋 이름"
                    required
                    type="text"
                    fullWidth
                    error={presetName.length === 0 && helperText != ''}
                    helperText={helperText}
                    variant="standard"
                    onChange={event => {
                        setPresetName(event.target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={onSaveButtonClick}>신규 프리셋 등록</Button>
            </DialogActions>
        </Dialog>
    );
}