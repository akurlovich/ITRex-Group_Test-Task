import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { getUsers } from '../../redux/store/action-creators/user';
import { UserActionType } from '../../redux/types/user';
import { IAllUsers, IUsers, SortType } from '../types/user';
import UserInfo from './UserInfo';

export const API_KEY = '1f1508a8866b41e6b9479917c6ee1b34';

const MainBlock: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortType>(SortType.popularity);
  const [page, setPage] = useState<number>(1);

  const [usersAll, setUsersAll] = useState<IUsers[]>([]);

  const [sortUp, setSortUp] = useState(false);
  const [sortUpName, setSortUpName] = useState(false);

  const {users, isLoad} = useTypedSelector(state => state.user);
  const dispatch = useDispatch();

  async function getAllAsync() {
    const res = await fetch('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json');
    res.json().then(res => {
      setUsersAll(res);
      setIsLoading(true);
      // console.log('object');
      // console.log(usersAll);
    })
  }

  const getAll = async () => {
    const response = await axios.get('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json');
    setUsersAll(response.data);
    setIsLoading(true);
    console.log('server:', usersAll);
  };

  useEffect(() => {
    dispatch(getUsers());

    // getAll();
    // getAllAsync();

  }, [])


  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  }
  
  const handlerSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // console.log(users[0].email);
    // function sortByAge(arr: IUsers[]) {
    //   arr.sort((a, b) => a.email < b.email ? 1 : -1);
    // }
    // sortByAge(users);
    // dispatch({
    //   type: UserActionType.GET_USERS, payload: users
    // })


    // setIsLoading(true);

    // const response = await axios.get('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json');
    //   console.log('server:', response.data);
    //   setUsersAll(response.data);
    //   setIsLoading(true);
    //   console.log(users[0].email);
      

    // try {
    //   dispatch(getUsers());
    //   console.log(users)
    //   } catch (error) {
    //     console.error(error)
    //   } 
      // finally {
      //   setIsLoading(false);
      // }
  }

  function sortByUp(arr: IUsers[]) {
    arr.sort((a, b) => a.id > b.id ? 1 : -1);
  }
  function sortByDown(arr: IUsers[]) {
    arr.sort((a, b) => a.id < b.id ? 1 : -1);
  }

  function sortByFirstUp(arr: IUsers[]) {
    arr.sort((a, b) => a.firstName > b.firstName ? 1 : -1);
  }
  function sortByFirstDown(arr: IUsers[]) {
    arr.sort((a, b) => a.firstName < b.firstName ? 1 : -1);
  }

  const sortId = () => {
    if (sortUp) {
      sortByUp(users);
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortUp(!sortUp);
    } else {
      sortByDown(users);
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortUp(!sortUp);
    }
    
    // setUsersAll(usersAll);
    // console.log(users);
    
  }

  const sortFirstName = () => {
    if (sortUpName) {
      sortByFirstUp(users);
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortUpName(!sortUpName);
    } else {
      sortByFirstDown(users);
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortUpName(!sortUpName);
    }
  }

  const handlerUser = (email: string) => {
    console.log(email);
  }

  return (
    <div className='search_wrapper'>
      <form className='search_form' onSubmit={handlerSubmit}>
        <div className="search_bar">
          <input
            value={searchValue}
            onChange={handlerChange}
            className="input-search"
            type="text"
            placeholder="Search bar" />
          <img className="input-icon" src="../assets/Search.svg" alt="" />
        </div>
        <button className='nav_btn' type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>
      {/* {usersAll.length ? <div>{usersAll[0].email}</div>} */}
      {isLoad ? (
        <div>
          <table style={{border: '1px solid black', borderCollapse: 'collapse'}}>
            <tbody>
              <tr>
                <td onClick={sortId}>
                  Id
                  {sortUp && <img className="arrow_sort" src="../assets/arrow-down.png" alt="" />}
                  {!sortUp && <img className="arrow_sort rotate" src="../assets/arrow-down.png" alt="" />}
                </td>
                <td onClick={sortFirstName}>
                  First name
                  {sortUpName && <img className="arrow_sort" src="../assets/arrow-down.png" alt="" />}
                  {!sortUpName && <img className="arrow_sort rotate" src="../assets/arrow-down.png" alt="" />}
                </td>
                <td>Last name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>State</td>
              </tr>
              {users.map(({firstName, lastName, email, id, phone, adress}, index: number) => {
                return (
                  <tr
                    key={index.toString()}
                    onClick={() => handlerUser(email)}
                    style={{border: '1px solid black'}}>
                      <td>{id}</td>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{adress.state}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        )
      : null}
    </div>
  );
};

export default MainBlock;