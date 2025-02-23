import { AspectRatio, Grid, Skeleton } from "@mui/joy";

const SkeletonMovie = ({ quantity }: { quantity: number }) => {
  return (
    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
      {Array(quantity)
        .fill(null)
        .map((_, index) => (
          <Grid xs={6} sm={4} lg={2} md={3} key={index}>
            <AspectRatio ratio="3/4" sx={{ borderRadius: "6px" }}>
              <Skeleton animation="wave" variant="overlay" />
            </AspectRatio>
          </Grid>
        ))}
    </Grid>
  );
};

export default SkeletonMovie;
