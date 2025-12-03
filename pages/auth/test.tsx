import { Close, Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React from "react";

const HomeTest = () => {
  return (
    <div>
      <Button variant="primary" size="xlarge">
        Clik
      </Button>
      <Button variant="primary" size="large">
        Clik
      </Button>
      <Button variant="primary" size="small">
        Clik
      </Button>
      <Box m={10}>
        <TextField
          label="label"
          size="xlarge"
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="medium" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Close fontSize="medium" />
                </InputAdornment>
              ),
            },
          }}
          error
        />
      </Box>
      <Box m={10}>
        <TextField
          label="label"
          size="large"
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="medium" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Close fontSize="medium" />
                </InputAdornment>
              ),
            },
          }}
          error
        />
      </Box>
      <Box m={10}>
        <TextField
          label="label"
          size="medium"
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="medium" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Close fontSize="medium" />
                </InputAdornment>
              ),
            },
          }}
          error
        />
      </Box>
      <Box m={10}>
        <TextField
          label="label"
          size="small"
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="medium" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Close fontSize="medium" />
                </InputAdornment>
              ),
            },
          }}
          error
        />
      </Box>
    </div>
  );
};

export default HomeTest;
