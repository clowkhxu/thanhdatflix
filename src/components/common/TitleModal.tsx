import { Divider, ModalClose, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface TitleModalProps {
  title: string;
  marginDivider?: string;
}

const TitleModal = ({ title, marginDivider }: TitleModalProps) => {
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <>
      <Typography
        color={theme === "light" ? "primary" : "neutral"}
        level="title-lg"
      >
        {title}
      </Typography>

      <ModalClose variant="plain" sx={{ margin: "unset" }} />

      <Divider sx={{ margin: marginDivider ?? "unset" }} />
    </>
  );
};

export default TitleModal;
