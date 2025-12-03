import { Box, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";

import styles from "../../index.module.css";
import { ISectionItem } from "../../interface";

const SectionItem = (props: ISectionItem) => {
  const { title, items, setAncholElMega } = props;
  const { t } = useCustomLanguage();
  const router = useRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, url: string) => {
    const currentPath = router.asPath.split("?")[0];
    const targetPath = url.split("?")[0];

    // Nếu đang ở cùng route, thêm __refresh để reload
    if (currentPath === targetPath) {
      e.preventDefault();
      const refreshKey = Date.now();
      const refreshUrl = url.includes("?")
        ? `${url}&__refresh=${refreshKey}`
        : `${url}?__refresh=${refreshKey}`;
      router.replace(refreshUrl, url, { scroll: false });
    }
  };

  return (
    <Box className={styles.sectionItemContainer}>
      <Typography
        variant="body14-B21"
        sx={(theme) => ({
          color: theme.palette.customBase?.base80,
          ...theme.applyStyles("dark", {
            color: theme.palette.customBase?.base20,
          }),
        })}
      >
        {title}
      </Typography>
      <Box className={styles.sectionItemList}>
        {items.map((item) => (
          <NextLink
            key={item.id}
            href={item.url || "#"}
            passHref
            prefetch={false}
            legacyBehavior
          >
            <Link
              className={styles.sectionItemLink}
              onClick={(e) => {
                setAncholElMega(null);
                if (item.url) {
                  handleLinkClick(e, item.url);
                }
              }}
            >
              <Typography
                variant="sub12-M18"
                sx={(theme) => ({
                  color:
                    item.url === router.pathname
                      ? theme.palette.customPrimary?.primary50
                      : theme.palette.customBase?.base80,
                  ...theme.applyStyles("dark", {
                    color:
                      item.url === router.pathname
                        ? theme.palette.customPrimary?.primary50
                        : theme.palette.customBase?.base20,
                  }),
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    color: theme.palette.customPrimary?.primary50,
                  },
                })}
              >
                {t(item.name)}
              </Typography>
            </Link>
          </NextLink>
        ))}
      </Box>
    </Box>
  );
};

export default SectionItem;
