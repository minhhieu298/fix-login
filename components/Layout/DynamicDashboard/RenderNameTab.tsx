import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import BaseTooltip from "@/components/ui/BaseTooltip";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import {
  IAssetReportOverview,
  IPermissionResponse,
} from "@/interface/permission/permission";

import { IRenderNameTab } from "./interface";
const RenderNameTab: React.FC<IRenderNameTab> = (props) => {
  const { node, renderValues } = props;
  const { t } = useCustomLanguage();
  const permission = useSelector(
    (state: { permissionReducer: { permission: IPermissionResponse[] } }) =>
      state.permissionReducer.permission
  );

  const dataReportCS = useSelector(
    (state: { csReportReducer: { dataReport: IAssetReportOverview } }) =>
      state.csReportReducer.dataReport
  );
  const hasSavingPermission = useMemo(() => {
    if (!permission || !Array.isArray(permission)) return false;

    const savingPermission = permission.find(
      (item: IPermissionResponse) =>
        item.PRODUCTTYPE === "EzSaving" && item.STATUS === "1"
    );

    return !!savingPermission;
  }, [JSON.stringify(permission)]);

  switch (node.getName()) {
    case "text_base_asset":
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography variant="body16-B24">{t(renderValues.name)}</Typography>
            <BaseTooltip
              placement="right"
              title={
                hasSavingPermission && dataReportCS && dataReportCS.FSaving != 0
                  ? "= Tài sản ròng CS + Tài sản PS + Tiền cho FPTS vay"
                  : "= Tài sản ròng CS + Tài sản PS"
              }
            >
              <Image
                width={16}
                height={16}
                src="/assets/icon/icon_tooltip.svg"
                alt=""
              />
            </BaseTooltip>
          </Box>
        </Box>
      );
    case "text_base_portfolio":
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Typography variant="body16-B24">{t(renderValues.name)}</Typography>
        </Box>
      );
    case "bcts_lai_lo":
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Stack flexDirection="row" gap="16px" alignItems="center">
            <Typography
              variant="body16-B24"
              sx={(theme) => ({
                color: theme.palette.customBase?.base80,
                ...theme.applyStyles("dark", {
                  color: theme.palette.customBase?.base20,
                }),
              })}
            >
              {t(renderValues.name)}
            </Typography>
          </Stack>
        </Box>
      );
    case "report_nav":
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Typography
            variant="body16-B24"
            sx={(theme) => ({
              color: theme.palette.customBase?.base80,
              ...theme.applyStyles("dark", {
                color: theme.palette.customBase?.base20,
              }),
            })}
          >
            {t(renderValues.name)}
          </Typography>
        </Box>
      );
    default:
      return t(renderValues.name);
  }
};

export default RenderNameTab;
