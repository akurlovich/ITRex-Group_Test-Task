import React, { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { getUsers } from '../../redux/store/action-creators/user';
import { SortType } from '../types/user';
import UserInfo from './UserInfo';

export const API_KEY = '1f1508a8866b41e6b9479917c6ee1b34';

const MainBlock: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortType>(SortType.popularity);
  const [page, setPage] = useState<number>(1);

  const {posts} = useTypedSelector(state => state.user);
  const dispatch = useDispatch();


  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  }
  
  const handlerSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      dispatch(getUsers(searchValue, sortBy, page.toString()));
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false);
      }
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
      <UserInfo articles={posts} />
    </div>
  );
};

export default MainBlock;