import { IMovie } from "./movie";

export interface IGetActivityLog {
  userId: string;
}

export interface IAddActivityLog {
  userId: string;
  action: string;
}

