import { Box, Skeleton } from "@mui/joy";

type IProps = {
  quantity: number;
  width: number;
};

const CustomSkeleton = ({ quantity, width }: IProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      {Array(quantity)
        .fill(null)
        .map((_, index) => (
          <Skeleton
            key={index}
            animation="wave"
            variant="text"
            sx={{ width: `${width}px` }}
          />
        ))}
    </Box>
  );
};

export default CustomSkeleton;
