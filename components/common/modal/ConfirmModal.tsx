import { Box, Modal, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import eventBus from "@/utils/event";
import { getIconImage } from "@/utils/getErrorOTP";

import ButtonComponent from "../ButtonComponent";

export interface IEventNotiModal {
  icon: string; // hiển thị icon
  message: string; // hiện thị content modal
  title: string; // tiêu đề modal
  textActionNext: string;
  textActionPrev: string;
  eventActionNext?: () => void;
  eventActionPrev?: () => void;
}

const ConfirmModal = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<IEventNotiModal>({
    icon: "",
    textActionNext: "",
    textActionPrev: "",
    message: "",
    title: "",
    eventActionNext: () => {},
    eventActionPrev: () => {},
  });

  useEffect(() => {
    const handler = (data: IEventNotiModal & { status: boolean }) => {
      requestAnimationFrame(() => {
        setModalData({ ...data, icon: getIconImage(data.icon as string) });
        setOpen(data.status);
      });
    };

    eventBus.on("showConfirmModal", handler);

    return () => {
      eventBus.off("showConfirmModal", handler);
    };
  }, []);

  const handleActionNext = () => {
    setOpen(false);
    modalData.eventActionNext?.();
  };

  const handleActionPrev = () => {
    setOpen(false);
    modalData.eventActionPrev?.();
  };

  return (
    <Modal
      open={open}
      sx={{
        zIndex: 2000,
      }}
      className="custom-modal-msg"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(4px)",
          },
        },
      }}
      disableAutoFocus
      disableEnforceFocus
    >
      <Box className="custom-modal-container">
        <Box className="custom-modal-content">
          {/* Icon */}
          <Box className="custom-modal-icon">
            <Box sx={{ p: 8, position: "relative" }}>
              <Image src={modalData.icon} alt="" fill />
            </Box>
          </Box>
          <Box className="custom-modal-text">
            {/* Tiêu đề */}
            <Typography
              id="success-modal-title"
              className="custom-modal-title"
              variant="heading18-B27"
            >
              {modalData.title}
            </Typography>

            {/* Thông báo */}
            <Typography
              id="success-modal-description"
              className="custom-modal-message"
              variant="body16-M24"
            >
              {modalData.message}
            </Typography>
          </Box>
        </Box>
        <Box className="custom-modal-footer">
          <Stack className="custom-modal-action" gap={2} flexDirection="row">
            <ButtonComponent
              fullWidth
              size="xlarge"
              variant="secondary"
              onClick={handleActionPrev}
            >
              <Typography variant="body16-M24">
                {modalData.textActionPrev}
              </Typography>
            </ButtonComponent>
            <ButtonComponent
              fullWidth
              size="xlarge"
              variant="primary"
              onClick={handleActionNext}
            >
              <Typography variant="body16-M24">
                {modalData.textActionNext}
              </Typography>
            </ButtonComponent>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
