export interface IGetRatings {
  movieSlug: string;
  userId: string;
}

export interface IAddMovieRating {
  movieSlug: string;
  userId: string;
  rating: number;
}
