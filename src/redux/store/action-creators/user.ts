import axios, { AxiosResponse } from "axios";
import { Dispatch } from "react"
import axiosInstance from "../../../services/api";
import { API_KEY } from "../../../ts/components/MainBlock";
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
      dispatch({type: UserActionType.GET_USERS, payload: res.data})
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