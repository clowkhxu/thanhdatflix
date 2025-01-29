import { Box, Skeleton } from "@mui/joy";

const SkeletonModalSearch = () => {
  return (
    <Box
      sx={{
        height: {
          xs: "calc(100vh - 300px)",
          sm: "calc(100vh - 200px)",
        },
        overflowY: "auto",
      }}
    >
      <Skeleton variant="text" level="h1" />
      <Skeleton variant="text" level="h1" />
      <Skeleton variant="text" level="h1" />
      <Skeleton variant="text" level="h1" />
      <Skeleton variant="text" level="h1" />
      <Skeleton variant="text" level="h1" />
      <Skeleton variant="text" level="h1" />
    </Box>
  );
};

export default SkeletonModalSearch;
