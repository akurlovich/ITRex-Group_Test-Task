import axios, { AxiosResponse } from "axios";
import { Dispatch } from "react"
import axiosInstance from "../../../services/api";
import { API_KEY } from "../../../ts/components/MainBlock";
import { IUsers } from "../../../ts/types/user";
import { IUserArticle, IUserState, UserAction, UserActionType } from "../../types/user"

export const getUsers = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    // try {
    //   const res: AxiosResponse<IOKArticles> = await axiosInstance.get(
    //     `v2/everything?q=${searchValue}&apiKey=${API_KEY}&sortBy=${sortBy}&pageSize=10&page=${page}`);
    //   dispatch({type: UserActionType.GET_POSTS, payload: res.data.articles})
      
    // } catch (error) { 
    // }
    try {
      const res = await axios.get('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json');
      const result = res.data;
      function sortByAge(arr: IUsers[]) {
        arr.sort((a, b) => a.id > b.id ? 1 : -1);
      }
      sortByAge(result);
      dispatch({type: UserActionType.GET_USERS, payload: result})
      console.log(res.data)
      dispatch({type: UserActionType.GET_USERS_SUCCESS, payload: true})
    } catch (error) {

    }

  }
};

export const getUsersUp = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    // try {
    //   const res: AxiosResponse<IOKArticles> = await axiosInstance.get(
    //     `v2/everything?q=${searchValue}&apiKey=${API_KEY}&sortBy=${sortBy}&pageSize=10&page=${page}`);
    //   dispatch({type: UserActionType.GET_POSTS, payload: res.data.articles})
      
    // } catch (error) { 
    // }
    try {
      const res = await axios.get('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json');
      const result = res.data;
      function sortByAge(arr: IUsers[]) {
        arr.sort((a, b) => a.id < b.id ? 1 : -1);
      }
      sortByAge(result);
      dispatch({type: UserActionType.GET_USERS, payload: result})
      console.log(res.data)
      dispatch({type: UserActionType.GET_USERS_SUCCESS, payload: true})
    } catch (error) {

    }

  }
}

// export const setUser = (post: IUserArticle) => {
//   return (dispatch: Dispatch<UserAction>) => {
//     dispatch({type: UserActionType.GET_POST, payload: post})
//   }
// }