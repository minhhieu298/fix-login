import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React, { memo } from "react";

import CardNAV from "@/components/CardReport/CardNAV/CardNAV";
import CardProfitLoss from "@/components/CardReport/CardProfitLoss/CardProfitLoss";
import LoadingPage from "@/components/Layout/LoadingPage";
import { iconToKey } from "@/constants/dynamic-dashboard/constant";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { WorkspaceLink } from "@/interface/MyHub/interface";
import { IFactory } from "@/interface/ui/DynamicDashboard/interface";
import styles from "@/styles/dynamicDashboard.module.css";

const AssetChart = dynamic(() => import("report/AssetChart"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const Factory: React.FC<IFactory> = ({ node, detailWorkspace }) => {
  const component = node.getComponent();
  const { mode } = useCustomTheme();
  const { t } = useCustomLanguage();
  const icon = node.getIcon();
  const key = iconToKey[icon ?? ""] ?? 1;
  const symbol =
    key === 1
      ? undefined
      : detailWorkspace?.Links?.find((l: WorkspaceLink) => l.Key === key)
          ?.Symbol;

  switch (component) {
    // Bảng giá
    case "text_chart_index":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_chart_index")}
          </Typography>
        </Box>
      );
    case "text_index_table":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_index_table")}
          </Typography>
        </Box>
      );
    case "text_price_table":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_price_table")}
          </Typography>
        </Box>
      );
    case "text_mini_price_table":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_mini_price_table")}
          </Typography>
        </Box>
      );
    case "text_heatmap":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_heatmap")}
          </Typography>
        </Box>
      );
    case "text_detail_code":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_detail_code")}
          </Typography>
        </Box>
      );
    case "text_market_depth":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_market_depth")}
          </Typography>
        </Box>
      );
    case "text_depth_chart":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_depth_chart")}
          </Typography>
        </Box>
      );
    case "text_order_matching":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_order_matching")}
          </Typography>
        </Box>
      );
    case "text_technical_chart":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_technical_chart")}
          </Typography>
        </Box>
      );
    case "text_trend_chart":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_trend_chart")}
          </Typography>
        </Box>
      );
    case "text_money_flow":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_money_flow")}
          </Typography>
        </Box>
      );

    // Giao dịch
    case "text_place_base_order":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_place_base_order")}
          </Typography>
        </Box>
      );
    case "text_place_derivative_order":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_place_derivative_order")}
          </Typography>
        </Box>
      );
    case "text_base_order_book":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_base_order_book")}
          </Typography>
        </Box>
      );
    case "text_derivative_order_book":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_derivative_order_book")}
          </Typography>
        </Box>
      );
    case "text_derivative_portfolio":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_derivative_portfolio")}
          </Typography>
        </Box>
      );

    // Tài sản
    case "text_base_asset":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <AssetChart />
        </Box>
      );

    case "bcts_lai_lo":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <CardProfitLoss />
        </Box>
      );
    case "report_nav":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <CardNAV />
        </Box>
      );
    // Top cổ phiếu
    case "text_top_volume":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_top_volume")}
          </Typography>
        </Box>
      );
    case "text_top_breakout":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_top_breakout")}
          </Typography>
        </Box>
      );
    case "text_top_value":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_top_value")}
          </Typography>
        </Box>
      );
    case "text_top_price_increase":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_top_price_increase")}
          </Typography>
        </Box>
      );
    case "text_top_price_decrease":
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_top_price_decrease")}
          </Typography>
        </Box>
      );

    default:
      return (
        <Box className={styles["tabnode-wrapper"]}>
          <Typography
            sx={{
              color: (theme) =>
                mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
            }}
          >
            {symbol ? symbol : t("text_component_not_found")}
          </Typography>
        </Box>
      );
  }
};

export default memo(Factory);
