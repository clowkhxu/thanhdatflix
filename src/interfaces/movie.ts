export interface ICategory {
  name?: string;
  slug?: string;
}

export interface ICountry {
  name?: string;
  slug?: string;
}

export interface IMovie {
  name?: string;
  slug?: string;
  origin_name?: string;
  content?: string;
  type?: string;
  status?: string;
  poster_url?: string;
  thumb_url?: string;
  trailer_url?: string;
  time?: string;
  episode_current?: string;
  episode_total?: string;
  quality?: string;
  lang?: string;
  year?: number;
  actor?: string[];
  director?: string[];
  category?: ICategory[];
  country?: ICountry[];
}

export interface IPagination {
  totalItems?: number;
  totalItemsPerPage?: number;
  currentPage?: number;
  totalPages?: number;
}

export interface IEpisodes {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface IGetMovieDetail {
  describe: string;
  slug: string;
  page: number;
  quantity: number;
}

export interface ISearchMovie {
  keyword: string;
  page: number;
  quantity: number;
}

export interface IAddMovie {
  userId: string;
  movieInfo: IMovie;
  type: string;
}

export interface IGetAllMovies {
  userId: string;
  type: string;
}

export interface IDeleteAllMovie {
  userId: string;
  type: string;
}

export interface IDeleteMovie {
  userId: string;
  movieSlug: string;
  type: string;
}
