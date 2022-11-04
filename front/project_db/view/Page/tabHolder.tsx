import React, {useCallback, useEffect, useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import {projectDbAction} from "../../action";
import PresetRemovalModal from "./presetRemovalModal";
import {ProjectDbPreset} from "../../domain";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import {withStyles} from "@mui/styles";

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

    const {preset: presetList, schema} = useSelector((root: RootState) => root.projectDb);
    const dispatch = useDispatch();
    const [removalModalState, setRemovalModalState] = useState(false);
    const [removalPresetItem, setRemovalPresetItem] = useState<ProjectDbPreset>();
    const [activeTab, setActiveTab] = useState(0);
    const setFilter = useCallback(
        (filterState) => dispatch(projectDbAction.setFilter(filterState))
        , [dispatch]);

    const handleRemove = () => {
        if (!removalPresetItem) return;
        dispatch(projectDbAction.removePreset(removalPresetItem.id));
        setRemovalModalState(false);
        setRemovalPresetItem(undefined);
        switchToDefaultTab();
    };

    const switchToDefaultTab = () => {
        const defaultEntityName = 'project';
        const initialFilterState = {};
        const entityInfo = schema[defaultEntityName];
        const attributes = Object.keys(entityInfo.attributes);
        const initialAttrState = {};
        attributes.map((attributeName, attributeIndex) => {
            const attributeInfo = entityInfo.attributes[attributeName];
            initialAttrState[attributeName] = true;
        });
        initialFilterState[entityInfo.type] = {
            checked: true,
            attributes: initialAttrState
        };
        setFilter(initialFilterState);
        setActiveTab(0);
    };

    return (
        <>
            {(removalModalState && (
                <PresetRemovalModal
                    preset={removalPresetItem}
                    modalState={removalModalState}
                    handleRemove={handleRemove}
                    handleClose={() => setRemovalModalState(false)}/>
            ))}

            <Tabs value={activeTab}>
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
                                        setRemovalPresetItem(item);
                                        setRemovalModalState(true);
                                }}/>}
                                onClick={(event) => {
                                    setActiveTab(item.id);
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