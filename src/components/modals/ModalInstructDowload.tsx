import {
  Alert,
  Box,
  Divider,
  Modal,
  ModalClose,
  Option,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ModalContainer from "./ModalContainer";
import { over } from "lodash";
import TitleModal from "../common/TitleModal";

type IProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ModalInstructDowload = ({ open, setOpen }: IProps) => {
  const isMobile = useSelector((state: RootState) => state.system.isMobile);
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <ModalContainer
      open={open}
      setOpen={setOpen}
      sx={{
        animation: "scaleIn 0.3s",
        minWidth: {
          xs: "90%",
          sm: "500px",
        },
        maxWidth: {
          xs: "90%",
          sm: "520px",
        },
        maxHeight: {
          xs: "90vh",
          sm: "unset",
        },
        overflow: "auto",
        borderRadius: "md",
        p: 2,
        boxShadow: "lg",
      }}
    >
      <TitleModal title="Hướng dẫn tải video" marginDivider="12px -16px" />

      {!isMobile ? (
        <Box sx={{ marginTop: "12px" }}>
          <Typography level="body-md">
            Vẫn còn đang phát triển
          </Typography>

          <Typography level="body-md">
          </Typography>

          <Typography level="body-md">
          </Typography>

          <Typography level="body-md">
          </Typography>

          <Typography level="body-md">
          </Typography>

          <Typography level="body-md">
          </Typography>

          <Typography level="body-md">
          </Typography>

          <Typography level="body-md">
          </Typography>
        </Box>
      ) : (
        <Box sx={{ marginTop: "12px" }}>
          <Typography level="title-md"></Typography>
          <Typography level="body-md">
          </Typography>
          <Typography level="body-md">
          </Typography>
          <Typography level="body-md">
          </Typography>
          <Typography level="title-md" sx={{ marginTop: "12px" }}>
          </Typography>
          <Typography level="body-md">
          </Typography>
          <Typography level="body-md">
          </Typography>
          <Typography level="body-md">
          </Typography>
        </Box>
      )}
    </ModalContainer>
    // <Modal
    //   aria-labelledby="modal-title"
    //   aria-describedby="modal-desc"
    //   open={open}
    //   onClose={() => setOpen(false)}
    //   sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    // >
    //   <Sheet
    //     variant="outlined"
    //     sx={{
    //       animation: "scaleIn 0.3s",
    //       width: { xs: "90%", md: "600px" },
    //       borderRadius: "md",
    //       padding: {
    //         xs: "16px",
    //         md: "24px",
    //       },
    //       boxShadow: "lg",
    //     }}
    //   >
    //     <ModalClose variant="plain" sx={{ m: 1 }} />
    //     <Typography level="title-lg" color="primary">
    //       Hướng dẫn tải video
    //     </Typography>
    //     {!isMobile ? (
    //       <Box sx={{ marginTop: "12px" }}>
    //         <Typography level="body-md">
    //           1. Nếu bạn chưa có, tải và cài đặt VLC Media Player từ trang chủ:
    //           VLC Media Player
    //         </Typography>

    //         <Typography level="body-md">
    //           2. Khởi động ứng dụng VLC Media Player
    //         </Typography>

    //         <Typography level="body-md">
    //           3. Vào menu "Media" và chọn "Open Network Stream" hoặc nhấn Ctrl +
    //           N
    //         </Typography>

    //         <Typography level="body-md">
    //           4. Dán link M3U8 của video vào ô URL và nhấn "Play"
    //         </Typography>

    //         <Typography level="body-md">
    //           5. Để tải video, vào menu "Media" và chọn "Convert/Save"
    //         </Typography>

    //         <Typography level="body-md">
    //           6/ Trong tab "Network", dán lại link M3U8 và nhấn "Convert/Save".
    //         </Typography>

    //         <Typography level="body-md">
    //           7. Trong phần "Destination", chọn đường dẫn và định dạng tệp để
    //           lưu video.
    //         </Typography>

    //         <Typography level="body-md">
    //           8. Nhấn "Start" để bắt đầu tải video.
    //         </Typography>
    //       </Box>
    //     ) : (
    //       <Box sx={{ marginTop: "12px" }}>
    //         <Typography level="title-md">Hệ điều hành Android</Typography>
    //         <Typography level="body-md">
    //           1. Tải xuống TubeMate từ trang web chính thức
    //         </Typography>
    //         <Typography level="body-md">
    //           2.Mở ứng dụng và dán liên kết video M3U8 hoặc tìm video bạn muốn
    //           tải
    //         </Typography>
    //         <Typography level="body-md">
    //           3. Nhấn vào nút tải xuống và chọn định dạng video mong muốn
    //         </Typography>
    //         <Typography level="title-md" sx={{ marginTop: "12px" }}>
    //           Hệ điều hành IOS
    //         </Typography>
    //         <Typography level="body-md">
    //           1. Tải xuống và cài đặt ứng dụng Documents by Readdle
    //         </Typography>
    //         <Typography level="body-md">
    //           2. Mở trình duyệt trong ứng dụng và dán liên kết M3U8
    //         </Typography>
    //         <Typography level="body-md">
    //           3. Tải video và lưu vào thư viện
    //         </Typography>
    //       </Box>
    //     )}
    //   </Sheet>
    // </Modal>
  );
};

export default ModalInstructDowload;
