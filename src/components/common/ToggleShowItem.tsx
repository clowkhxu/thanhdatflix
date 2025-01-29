import { Box, Button } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface ToggleShowItemProps {
  type: string;
  data: any[];
  quantity: number;
  text: string;
  location?: string;
  handleShowItem: (data: any[], type: string) => void;
}

const ToggleShowItem: React.FC<ToggleShowItemProps> = ({
  type,
  data,
  quantity,
  text,
  location,
  handleShowItem,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: location ?? "center" }}>
      {type === "collapse" ? (
        <Button
          onClick={() => handleShowItem(data, "expand")}
          endDecorator={<KeyboardArrowDownIcon />}
          variant="plain"
        >{`Hiển thị ${data.length - quantity} ${text} còn lại`}</Button>
      ) : (
        <Button
          onClick={() => handleShowItem(data.slice(0, quantity), "collapse")}
          endDecorator={<KeyboardArrowUpIcon />}
          variant="plain"
        >
          Ẩn bớt
        </Button>
      )}
    </Box>
  );
};

export default ToggleShowItem;
