import React, { FC } from 'react';
import { IArticles } from '../types/user';

interface IArticlesBlock {
  articles: IArticles[];
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
            {articles.map(({author, title, publishedAt, urlToImage, source}, index: number) => {
              return (
                <tr key={index} >
                    <td>{title}</td>
                    <td>{author}</td>
                    <td>{publishedAt}</td>
                    <td>
                      <img width={200} src={urlToImage} alt={title} />
                    </td>
                </tr>
              )
            })}
          </table>
        </div>
        )
      : null}
    </div>
  );
};

export default UserInfo;