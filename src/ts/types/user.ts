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
export interface IOKArticles {
  articles: IArticles[]
}
export enum SortType {
  relevancy = 'relevancy',
  popularity = 'popularity',
  publishedAt = 'publishedAt',
}