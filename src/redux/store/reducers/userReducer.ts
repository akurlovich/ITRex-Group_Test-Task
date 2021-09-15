import { IUserArticle, IUserState, UserAction, UserActionType } from "../../types/user"

const initialState: IUserState = {
  posts: [],
  post: {} as IUserArticle,
  users: [],
  loading: false,
  cards: [],
}

export const userReducer = (state = initialState, action: UserAction): IUserState => {
  switch (action.type) {
    case UserActionType.GET_POSTS:
      // return {posts: action.payload, users: [], loading: true, cards: []}
      return {...state, posts: action.payload}
    case UserActionType.GET_POST:
      return {...state, post: action.payload}
    case UserActionType.GET_USERS_SUCCESS:
      return {...state}
    case UserActionType.GET_CARDS:
      return {...state}
    default:
      return state;
  }
}