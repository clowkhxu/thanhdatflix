import { Alert, Button, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IProps {
  path: string;
  content: string;
  icon: React.ReactNode;
}

const TitleContainer = ({ path, content, icon }: IProps) => {
  const navigate = useNavigate();
  const isMobile = useSelector((state: RootState) => state.system.isMobile);
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <Alert
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "24px 0",
      }}
    >
      <Typography
        startDecorator={icon}
        color="neutral"
        level={isMobile ? "title-md" : "title-lg"}
      >
        {content}
      </Typography>
      <Button
        size="sm"
        color={theme === "light" ? "primary" : "neutral"}
        variant="solid"
        onClick={() => navigate(path)}
      >
        Xem thêm
      </Button>
    </Alert>
  );
};

export default TitleContainer;
