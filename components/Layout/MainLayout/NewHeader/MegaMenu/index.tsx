import { Box, ClickAwayListener, Popper } from "@mui/material";

import { allIcon } from "@/components/Layout/Settings/EditMenuIcons/constant";

import SectionItem from "./SectionItem";

const MegaMenu = (props: {
  anchorEl: HTMLElement | null;
  open: boolean;
  id: string;
  setAncholElMega: (_el: HTMLElement | null) => void;
}) => {
  const { anchorEl, open, id, setAncholElMega } = props;
  const renderTitleLevel1 = (key: string) => {
    switch (key) {
      case "report":
        return "Tài sản báo cáo";
      case "cashTransaction":
        return "Giao dịch tiền";
      case "custumerService":
        return "Dịch vụ khách hàng";
      case "market":
        return "Mua bán Thị trường";
      case "loan":
        return "Giao dịch vay";
      case "advisorSelect":
        return "Tư vấn đầu tư";
      default:
        return key;
    }
  };
  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="bottom"
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [-12, 12],
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: {
              right: 12,
            },
          },
        },
      ]}
      sx={{
        zIndex: 1300,
      }}
    >
      <ClickAwayListener onClickAway={() => setAncholElMega(null)}>
        <Box
          sx={(theme) => ({
            background: theme.palette.customBase?.baseWhite,
            borderRadius: "12px",
            width: 1200,
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.12)",
            ...theme.applyStyles("dark", {
              background: theme.palette.customBase?.base80,
            }),
            display: "flex",
          })}
        >
          {Object.keys(allIcon).map((key) => (
            <SectionItem
              key={key}
              title={renderTitleLevel1(key)}
              items={allIcon[key as keyof typeof allIcon]}
              setAncholElMega={setAncholElMega}
            />
          ))}
        </Box>
      </ClickAwayListener>
    </Popper>
  );
};

export default MegaMenu;
