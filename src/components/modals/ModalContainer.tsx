import { Modal, ModalClose, Sheet } from "@mui/joy";

interface ModalContainerProps {
  open: boolean;
  children: React.ReactNode;
  sx?: any;
  setOpen: (open: boolean) => void;
}

const ModalContainer = ({
  open,
  children,
  sx,
  setOpen,
}: ModalContainerProps) => {
  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > div": {
          backdropFilter: "unset !important",
        },
      }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Sheet variant="outlined" sx={sx}>
        {children}
      </Sheet>
    </Modal>
  );
};

export default ModalContainer;
