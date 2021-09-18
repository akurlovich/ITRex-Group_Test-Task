import React, { FC } from 'react';
import { IUsers } from '../types/user';

interface IUserInfo {
  userInfo: IUsers | undefined;
};

const UserInfo: FC<IUserInfo> = ({userInfo}) => {

  return (
    <>
      {userInfo && 
        <div className='user_block'>
          <h2>Profile info:</h2>
          <div className='user_block__items'>
            <h3>Selected profile:</h3>
            <div className='user_block__items__items-info'>{userInfo.firstName}</div>
            <div className='user_block__items__items-info'>{userInfo.lastName}</div>
          </div>
          <div className='user_block__items'>
            <h3>Description</h3>
            <div className="user_block__items__items-info">{userInfo.description}</div>
          </div>
          <div className='user_block__items'>
            <h3>Address:</h3>
            <div className="user_block__items__items-info">{userInfo.adress.streetAddress}</div>
          </div>
          <div className='user_block__items'>
            <h3>City:</h3>
            <div className="user_block__items__items-info">{userInfo.adress.city}</div>
          </div>
          <div className='user_block__items'>
            <h3>State:</h3>
            <div className="user_block__items__items-info">{userInfo.adress.state}</div>
          </div>
          <div className='user_block__items'>
            <h3>Index:</h3>
            <div className="user_block__items__items-info">{userInfo.adress.zip}</div>
          </div>
        </div>}
    </>
  );
};

export default UserInfo;