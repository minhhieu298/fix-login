import { Box } from "@mui/material";
import { useRef, useState } from "react";

import { allIcon } from "./constant";
import styles from "./editMenuIcons.module.css";
import { HeaderMenuBar } from "./HeaderMenuBar";
import { Result } from "./Result";
import SearchMenuBar from "./SearchMenuBar";
import { SectionIcon } from "./SectionIcon";

const EditMenuIcons = ({ fullScreen }: { fullScreen: boolean }) => {
  const [value, setValue] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        paddingLeft: "12px",
        paddingRight: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderMenuBar fullScreen={fullScreen} scrollRef={scrollRef} />
      <SearchMenuBar value={value} setValues={setValue} />
      {!value ? (
        <Box className={styles.contentWrapper}>
          {Object.keys(allIcon).map((key) => (
            <SectionIcon key={key} name={key} scrollRef={scrollRef} />
          ))}
        </Box>
      ) : (
        <Box className={styles.contentWrapper}>
          <Result scrollRef={scrollRef} value={value} />
        </Box>
      )}
    </Box>
  );
};

export default EditMenuIcons;
