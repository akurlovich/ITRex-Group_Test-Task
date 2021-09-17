import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { getUsers } from '../../redux/store/action-creators/user';
import { UserActionType } from '../../redux/types/user';
import { IAllUsers, IUsers, SortType } from '../types/user';
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

  const [sortByItems, setSortByItems] = useState<ISotrItems>({sortID: false, sortEmail: false, sortFirst: false, sortLast: false, sortPhone: false});
  // setSortByItems({
  //   ...sortByItems, sortID: true
  // })

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
    // arr.sort((a, b) => a.id > b.id ? 1 : -1);
  }

  // function sortByUp(arr: IUsers[]) {
  //   arr.sort((a, b) => a.id > b.id ? 1 : -1);
  // }
  // function sortByDown(arr: IUsers[]) {
  //   arr.sort((a, b) => a.id < b.id ? 1 : -1);
  // }

  // function sortByFirstUp(arr: IUsers[]) {
  //   arr.sort((a, b) => a.firstName > b.firstName ? 1 : -1);
  // }
  // function sortByFirstDown(arr: IUsers[]) {
  //   arr.sort((a, b) => a.firstName < b.firstName ? 1 : -1);
  // }

  const handlerSortId = () => {
    if (sortByItems.sortID) {
      sortItems(users, 'id', 'asc');
      dispatch({
        type: UserActionType.GET_USERS, payload: users
      });
      // setSortUp(!sortUp);
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
      
      {/* {usersAll.length ? <div>{usersAll[0].email}</div>} */}
      {isLoad ? (
        <div className="table_block">
          <table style={{border: '1px solid black', borderCollapse: 'collapse'}}>
            <tbody>
              <tr>
                <td onClick={handlerSortId}>
                  Id
                  {sortByItems.sortID && <img className="arrow_sort" src="../assets/arrow-down.png" alt="" />}
                  {!sortByItems.sortID && <img className="arrow_sort rotate" src="../assets/arrow-down.png" alt="" />}
                </td>
                <td onClick={handlerSortFirstName}>
                  First name
                  {sortByItems.sortFirst && <img className="arrow_sort" src="../assets/arrow-down.png" alt="" />}
                  {!sortByItems.sortFirst && <img className="arrow_sort rotate" src="../assets/arrow-down.png" alt="" />}
                </td>
                <td>Last name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>State</td>
              </tr>
              {users.slice((pageNumber * 20), (pageNumber * 20 + 20)).map((item, index: number) => {
                return (
                  <tr
                    key={index.toString()}
                    onClick={() => handlerUser(item)}
                    style={{border: '1px solid black'}}>
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