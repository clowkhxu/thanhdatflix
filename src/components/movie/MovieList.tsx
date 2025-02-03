import { Box, Grid } from "@mui/joy";
import MovieItem from "./MovieItem";
import SkeletonMovie from "../common/SkeletonMovies";
import { IMovie } from "../../interfaces/movie";
import searchNotFoundImg from "../../images/search-not-found.png";
import ShowBackground from "../common/ShowBackground";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IProps {
  movies: IMovie[];
  page?: string;
  isLoading?: boolean;
  handleDeleteMovie?: (slug: string, type: string) => void;
}

const MovieList = ({ movies, page, isLoading, handleDeleteMovie }: IProps) => {
  const width = useSelector((state: RootState) => state.system.width);

  if (isLoading) {
    return <SkeletonMovie quantity={width > 467 ? 12 : 4} />;
  }

  return (
    <>
      {!isLoading && movies.length > 0 ? (
        <Box>
          <Grid container spacing={1} sx={{ flexGrow: 1, "--Grid-columns": { xs: 12, md: 16 } }}>
            {movies?.map((movie: IMovie, index) => (
              <Grid xs={6} sm={4} lg={2} md={3} key={index}>
                <MovieItem
                  movie={movie}
                  page={page as string}
                  handleDeleteMovie={handleDeleteMovie}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <ShowBackground
          urlImage={searchNotFoundImg}
          content="Không tìm thấy kết quả nào!"
          color="danger"
        />
      )}
    </>
  );
};

export default MovieList;
