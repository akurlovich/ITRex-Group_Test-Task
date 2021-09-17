import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IUsers } from '../types/user';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

const stateArray = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'HI', 'IA', 'ID', 'IL', 'IN', 
'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 
'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

interface ISotrItems {
  sortID: boolean;
  sortFirst: boolean;
  sortLast: boolean;
  sortEmail: boolean;
  sortPhone: boolean;
  sortState: boolean;
}

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

  const dispatch = useDispatch();

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

  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };
  
  function sortItems(arr: IUsers[], type: string, method: string) {
    switch (type) {
      case 'id':
        if (method === 'asc') {
          arr.sort((a, b) => a.id > b.id ? 1 : -1);
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
      {filterUsers.length > 10 ? <ReactPaginate
        pageCount={Math.ceil(filterUsers.length / 20)}
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
      /> : null}
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

export default Main;