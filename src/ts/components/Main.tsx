import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { ISotrItems, IUsers } from '../types/user';
import axios from 'axios';
import UserInfo from './UserInfo';
import sortItems from '../../services/sortItems';
import stateArray from '../../services/dataInfo';

const Main: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [userItem, setUserItem] = useState<IUsers>();
  const [sortStateBoolean, setSortStateBoolean] = useState(false);
  const [sortByItems, setSortByItems] = useState<ISotrItems>(
    {
      sortID: false,
      sortEmail: false,
      sortFirst: false,
      sortLast: false,
      sortPhone: false,
      sortState: false,
    });

  const [users, setUsers] = useState<IUsers[]>([]);
  const getAllUsers = () => {
    axios.get('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json')
      .then((res) => {
        setUsers(res.data);
      })
  };
  const [sortState, setSortState] = useState('');

  
  useEffect(() => {
    getAllUsers();
    setIsLoading(true);
  }, [])
  
  const filterUsers = users.filter(user => {
    if (sortStateBoolean) {
      return user.adress.state.toLowerCase().includes(sortState.toLowerCase());
    } else {
      return user.firstName.toLowerCase().includes(searchValue.toLowerCase());
    }
  });

  const pageCount: number = Math.ceil(filterUsers.length / 20);
  const pageArray = new Array();

  for (let i = 0; i < pageCount; i++) {
    pageArray.push(i + 1)
  }

  console.log('page', pageArray);
  
  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };
  
  const handlerSortId = () => {
    if (sortByItems.sortID) {
      sortItems(users, 'id', 'asc');
      setSortByItems({
        ...sortByItems, sortID: false
      });
    } else {
      sortItems(users, 'id', 'desc');
      setSortByItems({
        ...sortByItems, sortID: true
      });
    }
  };

  const handlerSortFirstName = () => {
    if (sortByItems.sortFirst) {
      sortItems(users, 'first', 'asc');
      setSortByItems({
        ...sortByItems, sortFirst: false
      });
    } else {
      sortItems(users, 'first', 'desc');
      setSortByItems({
        ...sortByItems, sortFirst: true
      });
    }
  };

  const handlerSortLastName = () => {
    if (sortByItems.sortLast) {
      sortItems(users, 'last', 'asc');
      setSortByItems({
        ...sortByItems, sortLast: false
      });
    } else {
      sortItems(users, 'last', 'desc');
      setSortByItems({
        ...sortByItems, sortLast: true
      });
    }
  };

  const handlerSortEmail = () => {
    if (sortByItems.sortEmail) {
      sortItems(users, 'email', 'asc');
      setSortByItems({
        ...sortByItems, sortEmail: false
      });
    } else {
      sortItems(users, 'email', 'desc');
      setSortByItems({
        ...sortByItems, sortEmail: true
      });
    }
  };

  const handlerSortPhone = () => {
    if (sortByItems.sortPhone) {
      sortItems(users, 'phone', 'asc');
      setSortByItems({
        ...sortByItems, sortPhone: false
      });
    } else {
      sortItems(users, 'phone', 'desc');
      setSortByItems({
        ...sortByItems, sortPhone: true
      });
    }
  };

  const handlerSortState = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortState(event.target.value);
    setSortStateBoolean(true);
  }

  const handlerUser = (item: IUsers) => {
    setUserItem(item);
  }

  const changePage = (selectedItem: {selected: number}) => {
    setPageNumber(selectedItem.selected);
  };

  const handlerChangePage = (index: number) => {
    setPageNumber(index);
  };

  const handlerChangePageNext = () => {
    if (pageNumber >= (pageCount - 1)) {
      return;
    }
    setPageNumber(pageNumber + 1)
  };

  const handlerChangePagePrev = () => {
    if (pageNumber <= 0) {
      return;
    }
    setPageNumber(pageNumber - 1)
  };

  return (
    <div className='search_wrapper'>
      <form className='search_form'>
        <div className="search_bar">
          <input
            value={searchValue}
            onChange={handlerChange}
            className="input-search"
            type="text"
            placeholder="Enter user First Name for search..." />
          <img className="input-icon" src="../assets/Search.svg" alt="" />
        </div>
      </form>
      {isLoading ? (
        <div className="table_block">
          <table className="table_block__main" >
            <tbody>
              <tr className="table_block__title">
                <td onClick={handlerSortId}>
                  Id
                  {!sortByItems.sortID && 
                    <img className="arrow_sort" src="../assets/arrow-down.png" />}
                  {sortByItems.sortID &&
                    <img className="arrow_sort rotate" src="../assets/arrow-down.png" />}
                </td>
                <td onClick={handlerSortFirstName}>
                  First name
                  {!sortByItems.sortFirst &&
                    <img className="arrow_sort" src="../assets/arrow-down.png" />}
                  {sortByItems.sortFirst &&
                    <img className="arrow_sort rotate" src="../assets/arrow-down.png" />}
                </td>
                <td onClick={handlerSortLastName}>
                  Last name
                  {!sortByItems.sortLast &&
                    <img className="arrow_sort" src="../assets/arrow-down.png" />}
                  {sortByItems.sortLast &&
                    <img className="arrow_sort rotate" src="../assets/arrow-down.png" />}
                </td>
                <td onClick={handlerSortEmail}>
                  Email
                  {!sortByItems.sortEmail &&
                    <img className="arrow_sort" src="../assets/arrow-down.png" />}
                  {sortByItems.sortEmail &&
                    <img className="arrow_sort rotate" src="../assets/arrow-down.png" />}
                </td>
                <td onClick={handlerSortPhone}>
                  Phone
                  {!sortByItems.sortPhone &&
                    <img className="arrow_sort" src="../assets/arrow-down.png" />}
                  {sortByItems.sortPhone &&
                    <img className="arrow_sort rotate" src="../assets/arrow-down.png" />}
                </td>
                <td>
                  State
                  <select
                    onChange={handlerSortState}
                    value={sortState} 
                    >
                    <option value=''></option>
                    <option value=''>all</option>
                    {stateArray.map(state => <option key={state} value={`${state}`}>{state}</option>)}
                  </select>
                </td>
              </tr>
              {filterUsers.slice((pageNumber * 20), (pageNumber * 20 + 20)).map((item, index: number) => {
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
      {filterUsers.length > 20 ? 
        <>
          <div>
            <ul className='paginationBtns'>
              <li
                className={pageNumber == 0 ? 'paginationDisabled' : ''}
                onClick={handlerChangePagePrev}>
                <a>Prev</a>
              </li>
              {pageArray.map((item, index) => {
                return (
                  <li
                    className={pageNumber == index ? 'paginationActive' : ''}
                    key={index.toString()}
                    onClick={() => handlerChangePage(index)}
                    >
                    <a>{item}</a>
                  </li>
                )
              })}
              <li
                className={pageNumber >= (pageCount - 1) ? 'paginationDisabled' : ''}
                onClick={handlerChangePageNext}>
                <a>Next</a>
              </li>
            </ul>
          </div>
        </>: null}
      <UserInfo userInfo={userItem}/>
    </div>
  );
};

export default Main;