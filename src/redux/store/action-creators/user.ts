import { AxiosResponse } from "axios";
import { Dispatch } from "react"
import axiosInstance from "../../../services/api";
import { API_KEY } from "../../../ts/components/MainBlock";
import { IOKArticles } from "../../../ts/types/user";
import { IUserArticle, UserAction, UserActionType } from "../../types/user"

export const getUsers = (searchValue: string, sortBy: string, page: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const res: AxiosResponse<IOKArticles> = await axiosInstance.get(
        `v2/everything?q=${searchValue}&apiKey=${API_KEY}&sortBy=${sortBy}&pageSize=10&page=${page}`);
      dispatch({type: UserActionType.GET_POSTS, payload: res.data.articles})
      
    } catch (error) { 
    }
  }
}

export const setUser = (post: IUserArticle) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({type: UserActionType.GET_POST, payload: post})
  }
}