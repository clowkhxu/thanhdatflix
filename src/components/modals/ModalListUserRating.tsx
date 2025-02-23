import { Box, Chip, Divider, ModalClose, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ModalContainer from "./ModalContainer";
import TitleModal from "../common/TitleModal";

interface ModalListUserRatingProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalListUserRating = ({ open, setOpen }: ModalListUserRatingProps) => {
  const rating = useSelector((state: RootState) => state.rating);
  const user = useSelector((state: RootState) => state.users.user);
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <ModalContainer
      open={open}
      setOpen={setOpen}
      sx={{
        animation: "scaleIn 0.3s",
        maxWidth: {
          xs: "90vw",
          sm: "420px",
        },
        minWidth: {
          xs: "90vw",
          sm: "400px",
        },
        borderRadius: "md",
        p: 2,
        boxShadow: "lg",
      }}
    >
      <TitleModal title="Danh sách đánh giá" marginDivider="12px -16px" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          minHeight: "50vh",
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        {rating?.listUserRating.length === 0 ? (
          <Typography
            sx={{ margin: "auto" }}
            level="title-sm"
            color={theme === "light" ? "primary" : "neutral"}
          >
            Chưa có lượt đánh giá nào!
          </Typography>
        ) : (
          <>
            {rating.listUserRating.map((userRating, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    maxWidth: "240px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  level="title-sm"
                  color={
                    userRating?.userId === user?.id ? "primary" : "neutral"
                  }
                >
                  {userRating?.userId === user?.id
                    ? "Bản thân"
                    : userRating.username}
                </Typography>
                <Chip
                  variant={theme === "light" ? "soft" : "outlined"}
                  color={theme === "light" ? "primary" : "neutral"}
                  endDecorator={<StarBorderRoundedIcon />}
                >
                  {userRating.rating}
                </Chip>
              </Box>
            ))}
          </>
        )}
      </Box>
    </ModalContainer>
  );
};

export default ModalListUserRating;
