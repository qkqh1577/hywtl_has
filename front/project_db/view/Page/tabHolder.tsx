import React, {useCallback, useEffect, useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import {ProjectDbAction, projectDbAction} from "../../action";
import PresetRemovalModal from "./presetRemovalModal";
import {ProjectDbPreset} from "../../domain";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import {withStyles} from "@mui/styles";
import {ProjectDbFilter} from "../../reducer";

const borderStyle = '1px solid #ccc !important';
const StyledTab = withStyles({
    root: {
        borderLeft: borderStyle,
        borderRight: borderStyle,
        borderTop: borderStyle,
        borderTopLeftRadius: '10px !important',
        borderTopRightRadius: '10px !important',
        marginRight: '5px !important',
        backgroundColor: '#f0f0f0 !important',
        minHeight: '48px !important',
        minWidth: '150px !important'
    }
})(Tab);

export default function TabHolder() {

    const {preset: presetList, schema, activePreset} = useSelector((root: RootState) => root.projectDb);
    const dispatch = useDispatch();
    const [removalModalState, setRemovalModalState] = useState(false);
    //const [activeTab, setActiveTab] = useState(0);

    const setActivePreset = useCallback(
        (presetItem: ProjectDbPreset | undefined) => dispatch(projectDbAction.setActivePreset(presetItem))
        , []);
    const setFilter = useCallback(
        (filterState: ProjectDbFilter) => dispatch(projectDbAction.setFilter(filterState))
        , [dispatch]);

    const handleRemove = () => {
        if (!activePreset) return;
        dispatch(projectDbAction.removePreset(activePreset.id));
        setRemovalModalState(false);
        switchToDefaultTab();
    };

    const switchToDefaultTab = () => {
        dispatch(projectDbAction.openDefaultPreset());
    };

    return (
        <>
            {(removalModalState && (
                <PresetRemovalModal
                    preset={activePreset}
                    modalState={removalModalState}
                    handleRemove={handleRemove}
                    handleClose={() => setRemovalModalState(false)}/>
            ))}

            <Tabs value={activePreset ? activePreset.id : 0}>
                <StyledTab label="기본" value={0}
                           icon={<OtherHousesIcon/>} iconPosition="end"
                           onClick={switchToDefaultTab}/>

                {(presetList && presetList.map((item, index) => {
                        return (
                            <StyledTab
                                key={index}
                                label={item.name}
                                value={item.id}
                                iconPosition="end"
                                icon={<RemoveCircleOutlineIcon
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setActivePreset(item);
                                        setRemovalModalState(true);
                                    }}/>}
                                onClick={(event) => {
                                    setActivePreset(item);
                                    setFilter(item.filter);
                                }}
                            />
                        );
                    })
                )}
            </Tabs>
        </>
    );
}