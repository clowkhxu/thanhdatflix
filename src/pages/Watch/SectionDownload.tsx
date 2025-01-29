import { useState } from "react";
import { copyText } from "../../utils";
import toast from "react-hot-toast";
import { Alert, Box, IconButton, Tooltip, Typography } from "@mui/joy";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IProps {
  link_m3u8: string;
  setOpen: (open: boolean) => void;
}
type TypeCopy = "not-copy" | "copied";

const SectionDownload = ({ link_m3u8, setOpen }: IProps) => {
  const [typeCopy, setTypeCopy] = useState<TypeCopy>("not-copy");
  const theme = useSelector((state: RootState) => state.system.theme);
  const handleCopyLinkM3U8 = () => {
    // Không cần sao chép gì nữa
    toast.success("Chức năng này còn đang phát triển.");
  };

  return (
    <Alert sx={{ flexDirection: "column", alignItems: "start" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Typography startDecorator={<LinkOutlinedIcon />} level="title-lg">
            Liên kết tải video
          </Typography>

          <Tooltip title="Hướng dẫn tải xuống">
            <IconButton size="sm" onClick={() => setOpen(true)}>
              <HelpOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {typeCopy === "not-copy" ? (
          <Tooltip
            title="Chức năng này còn đang phát triển"
            variant={theme === "light" ? "soft" : "solid"}
            color={theme === "light" ? "primary" : "neutral"}
          >
            <IconButton onClick={handleCopyLinkM3U8}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Đã sao chép">
            <IconButton>
              <CheckOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Hiển thị thông báo phát triển thay vì liên kết */}
      <Typography
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
        }}
        level="body-md"
      >
        Chức năng này còn đang phát triển.
      </Typography>
    </Alert>
  );
};

export default SectionDownload;
