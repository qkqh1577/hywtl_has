import React, {useCallback, useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import {projectDbAction} from "../../action";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function TabHolder() {

    const {preset} = useSelector((root: RootState) => root.projectDb);
    const dispatch = useDispatch();
    const setFilter = useCallback(
        (filterState) => dispatch(projectDbAction.setFilter(filterState))
        , [dispatch]);

    const [value, setValue] = useState(1);
    const confirmDelete = (id: number) => {
        if (confirm('삭제하겠습니까?')) {
            dispatch(projectDbAction.removePreset(id));
            dispatch(projectDbAction.requestPresetList());
        }
    };

    return (
        <>
            {((!preset || preset.length === 0) &&
                <Tabs value={1}>
                    <Tab label="기본" value={1}/>
                </Tabs>
            )}
            {(preset && preset.length > 0 &&
                <Tabs value={value}>
                    {preset.map((item, index) => {
                        return (
                            <Tab
                                label={item.name}
                                value={item.id}
                                iconPosition="end"
                                icon={<RemoveCircleOutlineIcon onClick={(event) => {
                                    confirmDelete(item.id);
                                }}/>}
                                onClick={(event) => {
                                    setFilter(item.filter);
                                    setValue(item.id);
                                }}/>
                        );
                    })}
                </Tabs>
            )}
        </>
    );
}