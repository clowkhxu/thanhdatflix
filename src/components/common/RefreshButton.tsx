import { IconButton, Tooltip } from "@mui/joy";
import CircularProgress from "@mui/joy/CircularProgress";

import RefreshIcon from "@mui/icons-material/Refresh";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface RefreshButtonProps {
  title?: string;
  isLoading?: boolean;
  handleRefresh?: () => void;
}

const RefreshButton = ({
  title,
  isLoading,
  handleRefresh,
}: RefreshButtonProps) => {
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <Tooltip
      title={title}
      color={theme === "light" ? "primary" : "neutral"}
      variant={theme === "light" ? "soft" : "solid"}
    >
      <IconButton onClick={handleRefresh} disabled={isLoading}>
        {isLoading ? (
          <CircularProgress
            size="sm"
            color={theme === "light" ? "primary" : "neutral"}
          />
        ) : (
          <RefreshIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default RefreshButton;
