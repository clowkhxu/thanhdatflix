import { Box, CardContent, Skeleton } from "@mui/joy";
import SkeletonMovie from "./SkeletonMovies";

const SkeletonComments = () => {
  return (
    <>
      <Box sx={{ display: "flex", gap: "24px", flexDirection: "column" }}>
        <Skeleton variant="text" level="h1" />
        <CardContent sx={{ gap: "12px" }} orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={48}
            height={48}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
            <Skeleton
              animation="wave"
              variant="text"
              level="body-sm"
              sx={{ width: 200 }}
            />
          </div>
        </CardContent>
        <CardContent sx={{ gap: "12px" }} orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={48}
            height={48}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
            <Skeleton
              animation="wave"
              variant="text"
              level="body-sm"
              sx={{ width: 200 }}
            />
          </div>
        </CardContent>
        <CardContent sx={{ gap: "12px" }} orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="circular"
            width={48}
            height={48}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
            <Skeleton
              animation="wave"
              variant="text"
              level="body-sm"
              sx={{ width: 200 }}
            />
          </div>
        </CardContent>
      </Box>
    </>
  );
};
export default SkeletonComments;
