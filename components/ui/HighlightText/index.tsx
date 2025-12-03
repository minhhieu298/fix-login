import { Typography } from "@mui/material";
import React from "react";

interface HighlightTextProps {
  text: string;
  searchValue: string;
  variant?: React.ComponentProps<typeof Typography>["variant"];
  sx?: React.ComponentProps<typeof Typography>["sx"];
  normalizeText?: (_input: string) => string;
}

const HighlightText = ({
  text,
  searchValue,
  variant = "sub12-M18",
  sx = {},
  normalizeText,
}: HighlightTextProps) => {
  // Default normalize function if not provided
  const defaultNormalizeText = (_input: string): string => {
    return _input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .replace(/\s+/g, " ")
      .trim();
  };

  const normalize = normalizeText || defaultNormalizeText;

  if (!searchValue.trim()) {
    return (
      <Typography variant={variant} sx={sx}>
        {text}
      </Typography>
    );
  }

  const normalizedText = normalize(text);
  const normalizedSearch = normalize(searchValue);

  // Find the position of the search term in the normalized text
  const searchIndex = normalizedText.indexOf(normalizedSearch);

  if (searchIndex === -1) {
    return (
      <Typography variant={variant} sx={sx}>
        {text}
      </Typography>
    );
  }

  // Split text into parts: before match, match, and after match
  const beforeMatch = text.substring(0, searchIndex);
  const matchText = text.substring(
    searchIndex,
    searchIndex + searchValue.length
  );
  const afterMatch = text.substring(searchIndex + searchValue.length);

  return (
    <Typography variant={variant} sx={sx}>
      {beforeMatch}
      <span style={{ color: "#1AAF74", fontWeight: 500 }}>{matchText}</span>
      {afterMatch}
    </Typography>
  );
};

export default HighlightText;
