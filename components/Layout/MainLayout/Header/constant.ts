// Helper function để tạo responsive styles cho icon bar - Left/Right position
export const getIconBarResponsiveStylesVertical = (hasText: boolean) => {
  if (hasText) {
    // Nav có text
    return {
      padding: "0px",
      "@media (min-width: 1920px)": {
        width: "58px",
        minWidth: "58px",
        height: "42px",
      },
      "@media (max-width: 1919px) and (min-width: 1440px)": {
        width: "58px",
        minWidth: "58px",
        height: "42px",
      },
      "@media (max-width: 1439px) and (min-width: 1280px)": {
        width: "58px",
        minWidth: "58px",
        height: "42px",
      },
      "@media (max-width: 1279px)": {
        width: "48px",
        minWidth: "48px",
        height: "24px",
        padding: "0px 12px",
      },
    };
  } else {
    // Nav không text
    return {
      "@media (min-width: 1920px)": {
        padding: "0px 22px",
        width: "58px",
        minWidth: "58px",
        height: "24px",
      },
      "@media (max-width: 1919px) and (min-width: 1440px)": {
        padding: "0px 22px",
        width: "58px",
        minWidth: "58px",
        height: "24px",
      },
      "@media (max-width: 1439px) and (min-width: 1280px)": {
        padding: "0px 22px",
        width: "58px",
        minWidth: "58px",
        height: "24px",
      },
      "@media (max-width: 1279px)": {
        width: "48px",
        minWidth: "48px",
        height: "24px",
        padding: "0px 12px",
      },
    };
  }
};

// Helper function cho responsive icon size - Left/Right position
export const getIconSizeResponsiveStylesVertical = (hasText: boolean) => {
  if (hasText) {
    return {
      "& img": {
        "@media (min-width: 1920px)": {
          width: "20px !important",
          height: "20px !important",
        },
        "@media (max-width: 1919px) and (min-width: 1440px)": {
          width: "20px !important",
          height: "20px !important",
        },
        "@media (max-width: 1439px) and (min-width: 1280px)": {
          width: "20px !important",
          height: "20px !important",
        },
        "@media (max-width: 1279px)": {
          width: "24px !important",
          height: "24px !important",
        },
      },
    };
  } else {
    return {
      "& img": {
        "@media (min-width: 1920px)": {
          width: "24px !important",
          height: "24px !important",
        },
        "@media (max-width: 1919px) and (min-width: 1440px)": {
          width: "24px !important",
          height: "24px !important",
        },
        "@media (max-width: 1439px) and (min-width: 1280px)": {
          width: "24px !important",
          height: "24px !important",
        },
        "@media (max-width: 1279px)": {
          width: "24px !important",
          height: "24px !important",
        },
      },
    };
  }
};

// Helper function cho responsive text width - Left/Right position
export const getTextWidthResponsiveStylesVertical = () => {
  return {
    "@media (min-width: 1920px)": {
      width: "58px",
    },
    "@media (max-width: 1919px) and (min-width: 1440px)": {
      width: "58px",
    },
    "@media (max-width: 1439px) and (min-width: 1280px)": {
      width: "58px",
    },
    "@media (max-width: 1279px)": {
      display: "none", // Bỏ text ở màn hình nhỏ
    },
  };
};

// Helper function để tạo responsive styles cho icon bar - Top/Bottom position
export const getIconBarResponsiveStyles = (hasText: boolean) => {
  if (hasText) {
    // Nav có text
    return {
      display: "flex",
      "@media (min-width: 1920px)": {
        width: "88px",
        minWidth: "88px",
        height: "64px",
      },
      "@media (max-width: 1919px) and (min-width: 1440px)": {
        width: "88px",
        minWidth: "88px",
        height: "64px",
      },
      "@media (max-width: 1439px) and (min-width: 1280px)": {
        width: "64px",
        minWidth: "64px",
        height: "56px",
      },
      "@media (max-width: 1279px)": {
        width: "56px",
        minWidth: "56px",
        height: "56px",
      },
    };
  } else {
    // Nav không text
    return {
      display: "flex",
      justifyContent: "center",
      "@media (min-width: 1920px)": {
        width: "88px",
        minWidth: "88px",
        height: "64px",
      },
      "@media (max-width: 1919px) and (min-width: 1440px)": {
        width: "88px",
        minWidth: "88px",
        height: "64px",
      },
      "@media (max-width: 1439px) and (min-width: 1280px)": {
        width: "64px",
        minWidth: "64px",
        height: "56px",
      },
      "@media (max-width: 1279px)": {
        padding: "16px",
        width: "56px",
        minWidth: "56px",
        height: "56px",
      },
    };
  }
};

// Helper function cho responsive icon size - Top/Bottom position
export const getIconSizeResponsiveStyles = (hasText: boolean) => {
  if (hasText) {
    return {
      "& img": {
        "@media (min-width: 1920px)": {
          width: "28px !important",
          height: "28px !important",
        },
        "@media (max-width: 1919px) and (min-width: 1440px)": {
          width: "28px !important",
          height: "28px !important",
        },
        "@media (max-width: 1439px)": {
          width: "20px !important",
          height: "20px !important",
        },
      },
    };
  } else {
    return {
      "& img": {
        "@media (min-width: 1920px)": {
          width: "32px !important",
          height: "32px !important",
        },
        "@media (max-width: 1919px) and (min-width: 1440px)": {
          width: "32px !important",
          height: "32px !important",
        },
        "@media (max-width: 1439px)": {
          width: "24px !important",
          height: "24px !important",
        },
      },
    };
  }
};

// Helper function cho responsive text width - Top/Bottom position
export const getTextWidthResponsiveStyles = () => {
  return {
    "@media (min-width: 1920px)": {
      // width: "88px",
    },
    "@media (max-width: 1919px) and (min-width: 1440px)": {
      // width: "88px",
    },
    "@media (max-width: 1439px) and (min-width: 1280px)": {
      // width: "64px",
    },
    "@media (max-width: 1279px)": {
      // width: "56px",
    },
  };
};

// Helper function cho maxWidth của iconWrapper - Top/Bottom position (8.5 icons)
export const getIconWrapperMaxWidthHorizontal = () => {
  // Công thức: 8 * (wrapWidth + gap) + 0.5 * wrapWidth
  return {
    "@media (min-width: 1920px)": {
      gap: "48px",
      // maxWidth: "calc(8 * (88px + 12px) + 44px)", // 8.5 icons
      maxWidth: "calc(7 * (88px + 48px) + 44px)", // 8.5 icons
    },
    "@media (max-width: 1919px) and (min-width: 1440px)": {
      gap: "56px",
      // maxWidth: "calc(8 * (88px + 12px) + 44px)", // 8.5 icons
      maxWidth: "calc(7 * (88px + 56px))", // 8.5 icons
    },
    "@media (max-width: 1439px) and (min-width: 1280px)": {
      gap: "80px",
      // maxWidth: "calc(8 * (64px + 12px) + 32px)", // 8.5 icons
      maxWidth: "calc(4 * (64px + 80px))", // 8.5 icons
    },
    "@media (max-width: 1279px)": {
      gap: "96px",
      // maxWidth: "calc(8 * (56px + 12px) + 28px)", // 8.5 icons
      maxWidth: "calc(4 * (56px + 96px))", // 8.5 icons
    },
  };
};

// Helper function cho maxHeight của iconWrapper - Left/Right position (8.5 icons)
export const getIconWrapperMaxHeightVertical = (hasText: boolean) => {
  if (hasText) {
    // Nav có text - công thức: 8 * (wrapHeight + gap) + 0.5 * wrapHeight
    return {
      "@media (min-width: 2560px)": {
        maxHeight: "calc(8 * (42px + 20px) + 21px)", // 8 * 62 + 21 = 517px
      },
      "@media (max-width: 2559px) and (min-width: 1440px)": {
        maxHeight: "calc(8 * (42px + 16px) + 21px)", // 8 * 58 + 21 = 485px
      },
      "@media (max-width: 1439px) and (min-width: 1280px)": {
        maxHeight: "calc(8 * (42px + 16px) + 21px)", // 8 * 58 + 21 = 485px
      },
      "@media (max-width: 1279px)": {
        maxHeight: "calc(8 * (24px + 12px) + 12px)", // 8 * 36 + 12 = 300px
      },
    };
  } else {
    // Nav không text
    return {
      "@media (min-width: 2560px)": {
        maxHeight: "calc(8 * (24px + 20px) + 12px)", // 8 * 44 + 12 = 364px
      },
      "@media (max-width: 2559px) and (min-width: 1440px)": {
        maxHeight: "calc(8 * (24px + 20px) + 12px)", // 8 * 44 + 12 = 364px
      },
      "@media (max-width: 1439px) and (min-width: 1280px)": {
        maxHeight: "calc(8 * (24px + 16px) + 12px)", // 8 * 40 + 12 = 332px
      },
      "@media (max-width: 1279px)": {
        maxHeight: "calc(8 * (24px + 12px) + 12px)", // 8 * 36 + 12 = 300px
      },
    };
  }
};

// Helper function cho gap của iconWrapper - Left/Right position
export const getIconWrapperGapVertical = (hasText: boolean) => {
  if (hasText) {
    return {
      "@media (min-width: 1920px)": {
        // gap: "20px",
        gap: "56px",
      },
      "@media (max-width: 1919px) and (min-width: 1440px)": {
        // gap: "16px",
        gap: "56px",
      },
      "@media (max-width: 1439px) and (min-width: 1280px)": {
        // gap: "16px",
        gap: "56px",
      },
      "@media (max-width: 1279px)": {
        gap: "12px",
      },
    };
  } else {
    return {
      "@media (min-width: 1920px)": {
        gap: "20px",
      },
      "@media (max-width: 1919px) and (min-width: 1440px)": {
        gap: "20px",
      },
      "@media (max-width: 1439px) and (min-width: 1280px)": {
        gap: "16px",
      },
      "@media (max-width: 1279px)": {
        gap: "12px",
      },
    };
  }
};
