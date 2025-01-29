export interface IGetCommentList {
  movieSlug: string;
  sortOrder: "DESC" | "ASC";
}

export interface  ITypeFilter {
    typeFilter: "DESC" | "ASC";
}

export interface IAddComment {
  userId: string;
  movieSlug: string;
  content: string;
}

export interface IDeleteComment {
  idComment: string;
}

export interface IUpdateComment {
  idComment: string;
  content: string;
}
