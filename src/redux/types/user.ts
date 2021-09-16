import { IArticles, IUsers } from "../../ts/types/user";

export interface IUserArticle {
  author: string;
  title: string;
  source: string;
  index: number;
}

export interface IUserState {
  users: IUsers[];
  isLoad: boolean;
  // posts: IArticles[];
  // post: IUserArticle;
  // users: string[];
  // loading: boolean;
  // cards: number[];
}

export enum UserActionType {
  GET_POSTS = 'GET_POSTS',
  GET_POST = 'GET_POST',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  GET_CARDS = 'GET_CARDS',
  GET_USERS = 'GET_USERS',
}

interface IGetPosts {
  type: UserActionType.GET_POSTS,
  payload: IArticles[];
}

interface IGetUsers {
  type: UserActionType.GET_USERS,
  payload: IUsers[];
}

interface IGetUsersSuccess {
  type: UserActionType.GET_USERS_SUCCESS,
  payload: boolean;
}

interface IGetCards {
  type: UserActionType.GET_CARDS,
  payload: number[];
}

export type UserAction = 
  IGetPosts |
  IGetUsers |
  IGetUsersSuccess |
  IGetCards;