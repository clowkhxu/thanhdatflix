import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/joy";
import ModalContainer from "./ModalContainer";

interface IProps {
  open: boolean;
  title: string;
  content: string;
  isLoading?: boolean;
  setOpen: (open: boolean) => void;
  handleSubmit: () => void;
  handleCancel?: () => void;
}

const ModalAlertDialog = ({
  open,
  title,
  content,
  isLoading,
  setOpen,
  handleSubmit,
  handleCancel,
}: IProps) => {
  return (
    <ModalContainer
      open={open}
      setOpen={setOpen}
      sx={{
        animation: "scaleIn 0.3s",
        minWidth: {
          xs: "90%",
          md: "320px",
        },
        maxWidth: {
          xs: "90%",
          md: "360px",
        },
        borderRadius: "md",
        p: 2,
        boxShadow: "lg",
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <Divider sx={{ margin: "12px -16px" }} />
      <DialogContent>{content}</DialogContent>
      <DialogActions sx={{ marginTop: "32px" }}>
        <Button
          loading={isLoading}
          variant="solid"
          color="danger"
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
        <Button
          sx={{ marginRight: "12px" }}
          variant="plain"
          color="neutral"
          onClick={() => {
            setOpen(false);
            handleCancel && handleCancel();
          }}
        >
          Huỷ bỏ
        </Button>
      </DialogActions>
    </ModalContainer>
  );
};

export default ModalAlertDialog;
