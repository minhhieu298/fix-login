import { Box, Typography } from "@mui/material";
import { Model } from "flexlayout-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import {
  classicConfig,
  classicConfigLogout,
  newHubTemplate,
  professionalConfig,
  professionalConfigLogout,
} from "@/constants/dynamic-dashboard/constant";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IDataEzhub } from "@/interface/MyHub/interface";
import { ezhubActions } from "@/store/reducers/ezHub.reducer";

import BaseTooltip from "../ui/BaseTooltip";
import { hubData } from "./constants";
import { HubItem } from "./interface";

const HubTemplates = ({ onClose }: { onClose: () => void }) => {
  const { muiTheme, mode } = useCustomTheme();
  const { t } = useCustomLanguage();
  const dispatch = useDispatch();
  const dataEzhub = useSelector(
    (state: {
      ezhubReducer: {
        dataEzhub: IDataEzhub;
      };
    }) => state.ezhubReducer.dataEzhub
  );

  const handleOpenHub = (hub: HubItem) => {
    switch (hub.id) {
      case "professional":
        dispatch(
          ezhubActions.setModelAction(
            Model.fromJson(professionalConfigLogout).toJson()
          )
        );
        break;
      case "classic":
        dispatch(
          ezhubActions.setModelAction(
            Model.fromJson(classicConfigLogout).toJson()
          )
        );
        break;
      case "order":
        dispatch(
          ezhubActions.setModelAction(
            Model.fromJson(professionalConfigLogout).toJson()
          )
        );
        break;
      case "new-user":
        dispatch(
          ezhubActions.setModelAction(
            Model.fromJson(classicConfigLogout).toJson()
          )
        );
        break;
    }
    dispatch(ezhubActions.setrenderedHubId(null));
    onClose();
  };

  const handleDuplicate = (hub: HubItem) => {
    switch (hub.id) {
      case "professional":
        dispatch(
          ezhubActions.addEzhubAction(
            newHubTemplate(professionalConfig, dataEzhub, "professional")
          )
        );
        break;
      case "classic":
        dispatch(
          ezhubActions.addEzhubAction(
            newHubTemplate(classicConfig, dataEzhub, "classic")
          )
        );
        break;
      case "order":
        dispatch(
          ezhubActions.addEzhubAction(
            newHubTemplate(professionalConfig, dataEzhub, "order")
          )
        );
        break;
      case "new-user":
        dispatch(
          ezhubActions.addEzhubAction(
            newHubTemplate(classicConfig, dataEzhub, "new-user")
          )
        );
        break;
    }
    onClose();
  };

  //hiển thị hub
  return (
    <Box
      sx={{
        color:
          mode === "dark"
            ? muiTheme.palette?.customBase?.baseWhite
            : muiTheme.palette?.customBase?.base20,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
      }}
    >
      {/* Tạo hub mới */}

      {hubData(mode).map((hub) => (
        <Box
          key={hub.id}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "9px",
          }}
        >
          <Image
            src={hub.image}
            alt={t(hub.title)}
            width={180}
            height={112}
            style={{
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => handleOpenHub(hub)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="sub12-M18"
              sx={(theme) => ({
                color: theme.palette?.customBase?.base50,
                ...theme.applyStyles("dark", {
                  color: theme.palette?.customBase?.base30,
                }),
              })}
            >
              {t(hub.title)}
            </Typography>
            <BaseTooltip title={t("text_duplicate")}>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => handleDuplicate(hub)}
              >
                <Image
                  src="/assets/icon/duplicate.svg"
                  alt="duplicate"
                  width={12}
                  height={12}
                />
              </Box>
            </BaseTooltip>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HubTemplates;
