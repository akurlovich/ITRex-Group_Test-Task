import { IUsers } from "../../../ts/types/user"
import { IUserArticle, IUserState, UserAction, UserActionType } from "../../types/user"

// const initialState: IUserState = {
//   posts: [],
//   post: {} as IUserArticle,
//   users: [],
//   loading: false,
//   cards: [],
// }

const initialUsersState: IUserState = {
  users: [],
  isLoad: false,
  // adress: {
  //   streetAddress: '',
  //   city: '',
  //   state: '',
  //   zip: '',
  // },
  // description: '',
  // email: '',
  // firstName: '',
  // id: 0,
  // lastName: '',
  // phone: '',
}

export const userReducer = (state = initialUsersState, action: UserAction): IUserState => {
  switch (action.type) {
    case UserActionType.GET_USERS:
      // return {posts: action.payload, users: [], loading: true, cards: []}
      return {...state, users: action.payload}
    case UserActionType.GET_USERS_SUCCESS:
      // return {posts: action.payload, users: [], loading: true, cards: []}
      return {...state, isLoad: action.payload}
    default:
      return state;
  }
}