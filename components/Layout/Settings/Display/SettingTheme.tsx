import { Close } from "@mui/icons-material";
import { Box, Grid2 } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

import display from "./display.module.scss";

const ThemeSelect = () => {
  return (
    <Grid2 container spacing="12px" width="100%">
      <Grid2 size={3}>
        <Image src="/image/theme_1.png" alt="" width={220} height={224.15} />
      </Grid2>
      <Grid2 size={3}>
        <Image src="/image/theme_2.png" alt="" width={220} height={224.15} />
      </Grid2>
      <Grid2 size={3}>
        <Image src="/image/theme_3.png" alt="" width={220} height={224.15} />
      </Grid2>
      <Grid2 size={3}>
        <Image src="/image/theme_4.png" alt="" width={220} height={224.15} />
      </Grid2>
    </Grid2>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SettingTheme = (props: any) => {
  const { handleSubSetting } = props;
  const [value, setValue] = useState(0);
  const _handleTabChange = (newValue: number) => {
    setValue(newValue);
  };

  const renderView = () => {
    switch (value) {
      case 0:
        return <ThemeSelect />;
      case 1:
        return <p>This is Line Art</p>;
      case 2:
        return <p>This is Aesthetic</p>;
      case 3:
        return <p>This is Technology</p>;
      case 4:
        return <p>This is Scenery</p>;
      case 5:
        return <p>This is Finance</p>;
    }
  };
  return (
    <Box className={display.setting_display}>
      <Box className={display.setting_display_heading}>
        <Box
          className={display.setting_display_title}
          sx={{ color: "#EFEFEF" }}
        >
          Home Screen Theme
        </Box>
        <Box className={display.setting_display_icon}>
          <Close fontSize="small" onClick={() => handleSubSetting("")} />
        </Box>
      </Box>
      <Box className={display.setting_display_body}>
        <Box
          className={`${display.setting_display_box_img} ${display.setting_display_body}`}
        >
          <Box
            className={display.setting_display}
            sx={{
              gap: 0,
              p: 0,
              alignItems: "center",
            }}
          >
            <Box>
              <Box
                className={display.setting_img}
                sx={{
                  px: "8px",
                  pt: "8px",
                  pb: "6.1px",
                  bgcolor: "#292B30",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  border: "0.2px",
                }}
              >
                <Image src="/image/home.png" width={384} height={197} alt="" />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "36.35px",
                  bgcolor: "#313439",
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              />
            </Box>
            <Box className={display.setting_img}>
              <Image src="/image/Stand.png" width={96} height={28.04} alt="" />
            </Box>
          </Box>
          <Box className={display.setting_display_box_text}>
            Choose the theme that speaks your soul!
          </Box>
        </Box>
        <Box className={display.setting_display_tab}>
          <Box className={display.setting_display_tab_item}>
            {/* <CustomTabs
              tabs={tabs}
              defaultTab={value}
              onTabChange={handleTabChange}
              tabsProps={{
                sx: {
                  border: 0,
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                },
              }}
              tabProps={{
                sx: {
                  fontSize: "12px",
                  lineHeight: "18px",
                  fontWeight: "700",
                  fontFamily: "inherit",
                  letterSpacing: 0,
                  marginRight: "12px",
                  padding: "4px 16px",
                  color: "#8E969F",
                  minHeight: 0,
                  borderRadius: "8px",
                  background: "unset",
                  minWidth: "100px",
                  "&.Mui-selected": {
                    bgcolor: "#6F767E",
                    color: "#FCFCFC",
                    "&:hover": {
                      background: "inherit",
                    },
                  },
                  "&:hover": {
                    color: "inherit",
                  },
                },
              }}
            /> */}
          </Box>
          <Box className={display.setting_display_upload}>
            <Box className="text-upload">Upload your photo</Box>
            <Box className={display.setting_img}>
              <Image
                src="/image/upload_icon.png"
                width={16}
                height={16}
                alt=""
              />
            </Box>
          </Box>
        </Box>
        {renderView()}
      </Box>
    </Box>
  );
};

export default SettingTheme;
