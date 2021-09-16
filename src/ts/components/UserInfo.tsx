import React, { FC } from 'react';
import { IArticles, IUsers } from '../types/user';

interface IArticlesBlock {
  articles: IUsers[];
}

const UserInfo: FC<IArticlesBlock> = ({articles}) => {

  return (
    <div>
      {articles.length ? (
        <div>
          <table style={{border: '1px solid black'}}>
            <tr>
              <td>Title</td>
              <td>Author</td>
              <td>
                Published at
              </td>
              <td>Image</td>
            </tr>
            {/* {articles.map((item, index) => {
              return ( */}
                {/* <tr key={articles[0].id} >
                    <td>{articles[0].adress}</td>
                    <td>{articles[0].firstName}</td>
                    <td>{articles[0].lastName}</td>
                    
                </tr> */}
              {/* )
            })} */}
          </table>
        </div>
        )
      : null}
    </div>
  );
};

export default UserInfo;