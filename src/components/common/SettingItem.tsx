import { Box } from "@mui/joy";

interface ISettingItemProps {
  start: React.ReactNode;
  end: React.ReactNode;
  bottom: React.ReactNode;
}

const SettingItem = ({ start, end, bottom }: ISettingItemProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {start}
        {end}
      </Box>
      {bottom}
    </Box>
  );
};

export default SettingItem;
