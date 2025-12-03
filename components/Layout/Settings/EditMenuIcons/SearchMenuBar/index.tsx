import { Box, FormControl, Typography } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import RHFSelect from "@/components/common/form/RHFSelect";
import { RHFTextField } from "@/components/common/form/RHFTextField";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { settingAction } from "@/store/reducers/setting.reducer";

import { iconPackMapper } from "../constant";
import styles from "../editMenuIcons.module.css";

const SearchMenuBar: React.FC<{
  value: string;
  setValues: (_value: string) => void;
}> = ({ setValues }) => {
  const dispatch = useDispatch();
  const { t } = useCustomLanguage();
  const methods = useForm({
    defaultValues: {
      select_icon: "",
      search_icon: "",
    },
  });
  const { register, setValue } = methods;
  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  useEffect(() => {
    if (settingInfo?.iconPack !== "") {
      setValue("select_icon", settingInfo?.iconPack);
    } else {
      setValue("select_icon", "");
    }
  }, [settingInfo]);

  return (
    <Box className={styles.searchMenuBarContainer}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <Typography
          variant="body14-B21"
          sx={(theme) => ({
            color: theme.palette.customBase?.base80,
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base20,
            }),
          })}
        >
          {t("text_main_functions")}
        </Typography>
        <Typography
          variant="sub12-M18"
          sx={(theme) => ({
            whiteSpace: "pre-line",
            fontWeight: 500,
            color: theme.palette.customBase?.base40,
          })}
          dangerouslySetInnerHTML={{
            __html: t("text_main_functions_description"),
          }}
        />
      </Box>
      <FormProvider {...methods}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {/*  */}
          <FormControl sx={{ width: 181, gap: 1 }}>
            <RHFSelect
              name="select_icon"
              options={iconPackMapper(t)}
              size="small"
              onChange={(e) => {
                register("select_icon").onChange(e);
                const data = {
                  ...settingInfo,
                  iconPack: e.target.value,
                };
                dispatch(
                  settingAction.postSettingAction({
                    Setting: JSON.stringify(data),
                  })
                );
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    marginTop: "4px",
                  },
                },
              }}
            />
            <RHFTextField
              size="small"
              placeholder={t("text_search")}
              name="search_icon"
              startIcon="/assets/icon/icon_search.png"
              onChange={(e) => {
                const str = e.target.value;
                register("search_icon").onChange(e);
                setValues(str);
                setValue("search_icon", str);
              }}
            />
          </FormControl>
        </Box>
      </FormProvider>
    </Box>
  );
};
export default SearchMenuBar;
