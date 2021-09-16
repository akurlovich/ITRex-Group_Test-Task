export interface IUsers {
  adress: {
    streetAddress: string,
    city: string,
    state: string,
    zip: string,
  }
  description: string,
  email: string,
  firstName: string,
  id: number,
  lastName: string,
  phone: string,
}


export interface IArticles {
  author: string
  content: string
  description: string
  publishedAt: string
  source: {id: string, name: string}
  title: string
  url: string
  urlToImage: string
}
export interface IAllUsers {
  allUsers: IUsers[]
}
export enum SortType {
  relevancy = 'relevancy',
  popularity = 'popularity',
  publishedAt = 'publishedAt',
}