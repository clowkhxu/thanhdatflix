import { Box, Skeleton } from "@mui/joy";

const SkeletonActivityLog = () => {
  return (
    <Box>
      <Skeleton variant="text" level="h1" sx={{ width: "100%" }} />
      <Skeleton variant="text" level="h4" sx={{ width: "100%" }} />
      <Skeleton variant="text" level="h4" sx={{ width: "100%" }} />
      <Skeleton variant="text" level="h4" sx={{ width: "100%" }} />
      <Skeleton variant="text" level="h4" sx={{ width: "100%" }} />
      <Skeleton variant="text" level="h4" sx={{ width: "100%" }} />
      <Skeleton variant="text" level="h4" sx={{ width: "100%" }} />
      <Skeleton variant="text" level="h4" sx={{ width: "100%" }} />
    </Box>
  );
};

export default SkeletonActivityLog;
