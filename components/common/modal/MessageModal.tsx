import { Box, Modal, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import eventBus from "@/utils/event";
import { getIconImage } from "@/utils/getErrorOTP";

import ButtonComponent from "../ButtonComponent";

export interface IEventNotiModal {
  icon: string; // hiển thị icon
  message: string; // hiện thị content modal
  title: string; // tiêu đề modal
  textAction: string;
  eventAction?: () => void;
  // trạng thái đóng mở modal
}

const MessageModal = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<IEventNotiModal>({
    icon: "",
    textAction: "",
    message: "",
    title: "",
    eventAction: () => {},
  });

  useEffect(() => {
    const handler = (data: IEventNotiModal & { status: boolean }) => {
      requestAnimationFrame(() => {
        setModalData({ ...data, icon: getIconImage(data.icon as string) });
        setOpen(data.status);
      });
    };

    eventBus.on("showAlert", handler);

    return () => {
      eventBus.off("showAlert", handler);
    };
  }, []);

  const handleModal = () => {
    setOpen(false);
    modalData.eventAction?.();
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
          <ButtonComponent
            fullWidth
            size="xlarge"
            variant="primary"
            autoFocus={true}
            onClick={handleModal}
          >
            <Typography variant="body16-M24">{modalData.textAction}</Typography>
          </ButtonComponent>
        </Box>
      </Box>
    </Modal>
  );
};

export default MessageModal;
