import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ProjectDbPreset} from "../../domain";

export interface Props {
    preset: ProjectDbPreset | undefined,
    modalState: boolean,
    handleRemove: () => void,
    handleClose: () => void,
};

export default function PresetRemovalModal(props: Props) {
    const {preset, modalState, handleRemove, handleClose} = props;

    return (
        <Dialog open={modalState}>
            <DialogTitle>프리셋 삭제</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    선택한 "{preset?.name}" 프리셋을 삭제하겠습니까?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={handleRemove}>프리셋 삭제</Button>
            </DialogActions>
        </Dialog>
    );
}