export interface IGetSearchHistory {
  userId: string;
}

export interface IAddSearchHistory {
  userId: string;
  type: "recent" | "favourite";
  keyword: string;
  idSearchHistory?: string;
}

export interface IDeleteSearchHistory {
  idSearchHistory: string;
}
