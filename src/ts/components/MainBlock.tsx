import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { getUsers } from '../../redux/store/action-creators/user';
import { UserActionType } from '../../redux/types/user';
import { IUsers, SortType } from '../types/user';
import ReactPaginate from 'react-paginate';

export const API_KEY = '1f1508a8866b41e6b9479917c6ee1b34';

interface ISotrItems {
  sortID: boolean;
  sortFirst: boolean;
  sortLast: boolean;
  sortEmail: boolean;
  sortPhone: boolean;
}

const MainBlock: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortType>(SortType.popularity);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [usersAll, setUsersAll] = useState<IUsers[]>([]);

  const [userItem, setUserItem] = useState<IUsers>();

  const [sortUp, setSortUp] = useState(false);
  const [sortUpName, setSortUpName] = useState(false);

  const [sortByItems, setSortByItems] = useState<ISotrItems>(
    {
      sortID: false,
      sortEmail: false,
      sortFirst: false,
      sortLast: false,
      sortPhone: false
    });

  const {users, isLoad} = useTypedSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());

  }, [])


  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  }
  
  const handlerSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

  }
  function sortItems(arr: IUsers[], type: string, method: string) {
    switch (type) {
      case 'id':
        console.log('id');
        if (method === 'asc') {
          arr.sort((a, b) => a.id > b.id ? 1 : -1);
          console.log('id2');
        } else {
          arr.sort((a, b) => a.id < b.id ? 1 : -1);
        }
        break;
      case 'first':
        if (method === 'asc') {
          arr.sort((a, b) => a.firstName > b.firstName ? 1 : -1);
        } else {
          arr.sort((a, b) => a.firstName < b.firstName ? 1 : -1);
        }
        break;
      case 'last':
        if (method === 'asc') {
          arr.sort((a, b) => a.lastName > b.lastName ? 1 : -1);
        } else {
          arr.sort((a, b) => a.lastName < b.lastName ? 1 : -1);
        }
        break;
      case 'email':
        if (method === 'asc') {
          arr.sort((a, b) => a.email > b.email ? 1 : -1);
        } else {
          arr.sort((a, b) => a.email < b.email ? 1 : -1);
        }
        break;
      case 'phone':
        if (method === 'asc') {
          arr.sort((a, b) => a.phone > b.phone ? 1 : -1);
        } else {
          arr.sort((a, b) => a.phone < b.phone ? 1 : -1);
        }
        break;
    
      default:
        break;
    }
  }

  const handlerSortId = () => {
    if (sortByItems.sortID) {
      sortItems(users, 'id', 'asc');
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortByItems({
        ...sortByItems, sortID: false
      });
    } else {
      sortItems(users, 'id', 'desc');
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortByItems({
        ...sortByItems, sortID: true
      });
    }
    
  }

  const handlerSortFirstName = () => {
    if (sortByItems.sortFirst) {
      sortItems(users, 'first', 'asc');
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortByItems({
        ...sortByItems, sortFirst: false
      });
    } else {
      sortItems(users, 'first', 'desc');
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortByItems({
        ...sortByItems, sortFirst: true
      });
    }
  }

  const handlerSortLastName = () => {
    if (sortByItems.sortLast) {
      sortItems(users, 'last', 'asc');
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortByItems({
        ...sortByItems, sortLast: false
      });
    } else {
      sortItems(users, 'last', 'desc');
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortByItems({
        ...sortByItems, sortLast: true
      });
    }
  }

  const handlerSortEmail = () => {
    if (sortByItems.sortEmail) {
      sortItems(users, 'email', 'asc');
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortByItems({
        ...sortByItems, sortEmail: false
      });
    } else {
      sortItems(users, 'email', 'desc');
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortByItems({
        ...sortByItems, sortEmail: true
      });
    }
  }

  const handlerSortPhone = () => {
    if (sortByItems.sortPhone) {
      sortItems(users, 'phone', 'asc');
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortByItems({
        ...sortByItems, sortPhone: false
      });
    } else {
      sortItems(users, 'phone', 'desc');
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      setSortByItems({
        ...sortByItems, sortPhone: true
      });
    }
  }

  const handlerUser = (item: IUsers) => {
    setUserItem(item);
  }

  const changePage = (selectedItem: {selected: number}) => {
    setPageNumber(selectedItem.selected);
  };

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
      {isLoad ? (
        <div className="table_block">
          <table className="table_block__main" >
            <tbody>
              <tr className="table_block__title">
                <td onClick={handlerSortId}>
                  Id
                  {!sortByItems.sortID && 
                    <img className="arrow_sort" src="../assets/arrow-down.png" alt="" />}
                  {sortByItems.sortID &&
                    <img className="arrow_sort rotate" src="../assets/arrow-down.png" alt="" />}
                </td>
                <td onClick={handlerSortFirstName}>
                  First name
                  {!sortByItems.sortFirst &&
                    <img className="arrow_sort" src="../assets/arrow-down.png" alt="" />}
                  {sortByItems.sortFirst &&
                    <img className="arrow_sort rotate" src="../assets/arrow-down.png" alt="" />}
                </td>
                <td onClick={handlerSortLastName}>
                  Last name
                  {!sortByItems.sortLast &&
                    <img className="arrow_sort" src="../assets/arrow-down.png" alt="" />}
                  {sortByItems.sortLast &&
                    <img className="arrow_sort rotate" src="../assets/arrow-down.png" alt="" />}
                </td>
                <td onClick={handlerSortEmail}>
                  Email
                  {!sortByItems.sortEmail &&
                    <img className="arrow_sort" src="../assets/arrow-down.png" alt="" />}
                  {sortByItems.sortEmail &&
                    <img className="arrow_sort rotate" src="../assets/arrow-down.png" alt="" />}
                </td>
                <td onClick={handlerSortPhone}>
                  Phone
                  {!sortByItems.sortPhone &&
                    <img className="arrow_sort" src="../assets/arrow-down.png" alt="" />}
                  {sortByItems.sortPhone &&
                    <img className="arrow_sort rotate" src="../assets/arrow-down.png" alt="" />}
                </td>
                <td>
                  State
                </td>
              </tr>
              {users.slice((pageNumber * 20), (pageNumber * 20 + 20)).map((item, index: number) => {
                return (
                  <tr
                    key={index.toString()}
                    onClick={() => handlerUser(item)}
                    className="table_block__item">
                      <td>{item.id}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.adress.state}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        )
      : null}
      <ReactPaginate
        pageCount={Math.ceil(users.length / 20)}
        previousLabel={'Prev'}
        nextLabel={'Next'}
        onPageChange={changePage}
        pageRangeDisplayed={1}
        marginPagesDisplayed={3}
        containerClassName={'paginationBtns'}
        previousLinkClassName={'prevBtn'}
        nextLinkClassName={'nextBtn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
      {userItem && 
        <div className='user_block'>
          <h2>Profile info:</h2>
          <div className='user_block__items'>
            <h3>Selected profile:</h3>
            <div className='user_block__items__items-info'>{userItem.firstName}</div>
            <div className='user_block__items__items-info'>{userItem.lastName}</div>
          </div>
          <div className='user_block__items'>
            <h3>Description</h3>
            <div className="user_block__items__items-info">{userItem.description}</div>
          </div>
          <div className='user_block__items'>
            <h3>Address:</h3>
            <div className="user_block__items__items-info">{userItem.adress.streetAddress}</div>
          </div>
          <div className='user_block__items'>
            <h3>City:</h3>
            <div className="user_block__items__items-info">{userItem.adress.city}</div>
          </div>
          <div className='user_block__items'>
            <h3>State:</h3>
            <div className="user_block__items__items-info">{userItem.adress.state}</div>
          </div>
          <div className='user_block__items'>
            <h3>Index:</h3>
            <div className="user_block__items__items-info">{userItem.adress.zip}</div>
          </div>
        </div>}
    </div>
  );
};

export default MainBlock;