import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { getUsers } from '../../redux/store/action-creators/user';
import { IAllUsers, IUsers, SortType } from '../types/user';
import UserInfo from './UserInfo';

export const API_KEY = '1f1508a8866b41e6b9479917c6ee1b34';

const MainBlock: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortType>(SortType.popularity);
  const [page, setPage] = useState<number>(1);

  const [usersAll, setUsersAll] = useState<IUsers[]>([])

  const {users, isLoad} = useTypedSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    // setIsLoading(true);
    try {
      const response = axios.get('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json').then(res => {
        setUsersAll(res.data);
        // setIsLoading(true);
      });
        // console.log('server:', response.data);
        // setUsersAll(response.data)
      
    } catch (error) {
      
    }
  }, [])


  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  }
  
  const handlerSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // console.log(users[0].email);


    // setIsLoading(true);

    const response = await axios.get('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json');
      console.log('server:', response.data);
      setUsersAll(response.data);
      setIsLoading(true);
      console.log(users[0].email);
      

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
      {isLoad && <div>{users[0].email}</div>}
      {/* <UserInfo articles={users} /> */}
    </div>
  );
};

export default MainBlock;