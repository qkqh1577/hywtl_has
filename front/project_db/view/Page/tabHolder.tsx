import React, {useCallback, useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import PresetRemovalModal from "./presetRemovalModal";
import {ProjectDbPreset} from "../../domain";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import {withStyles} from "@mui/styles";
import {ProjectDbFilter} from "../../reducer";
import {projectDbAction} from "../../action";

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

  const {preset: presetList, activePreset} = useSelector((root: RootState) => root.projectDb);
  const dispatch = useDispatch();
  const [removalModalState, setRemovalModalState] = useState(false);

  const setActivePreset = useCallback(
    (presetItem: ProjectDbPreset | undefined) => dispatch(projectDbAction.setActivePreset(presetItem))
    , []);
  const setFilter = useCallback(
    (filterState: ProjectDbFilter) => dispatch(projectDbAction.setFilter(filterState))
    , [dispatch]);

  const handleRemove = useCallback(() => {
    if (!activePreset) return;
    dispatch(projectDbAction.removePreset(activePreset.id));
    setRemovalModalState(false);
    switchToDefaultTab();
  }, [dispatch, activePreset]);

  const switchToDefaultTab = useCallback(() => {
    dispatch(projectDbAction.openDefaultPreset());
  }, [dispatch]);


  function onConfirmToRemoveTab(item: ProjectDbPreset) {
    return (event) => {
      event.preventDefault();
      setActivePreset(item);
      setRemovalModalState(true);
    };
  }

  function onClickTab(item: ProjectDbPreset) {
    return () => {
      setActivePreset(item);
      setFilter(item.filter);
    };
  }

  function onCloseTabRemovalModal() {
    return () => setRemovalModalState(false);
  }

  return (
    <>
      {(removalModalState && (
        <PresetRemovalModal
          preset={activePreset}
          modalState={removalModalState}
          handleRemove={handleRemove}
          handleClose={onCloseTabRemovalModal()}/>
      ))}

      <Tabs value={activePreset ? activePreset.id : 0}>
        <StyledTab label="기본" value={0}
                   icon={<OtherHousesIcon/>} iconPosition="end"
                   onClick={switchToDefaultTab}/>

        {(presetList && presetList.map((item) => {
            return (
              <StyledTab
                key={item.id}
                label={item.name}
                value={item.id}
                iconPosition="end"
                icon={<RemoveCircleOutlineIcon
                  onClick={onConfirmToRemoveTab(item)}/>}
                onClick={onClickTab(item)}
              />
            );
          })
        )}
      </Tabs>
    </>
  );
}

