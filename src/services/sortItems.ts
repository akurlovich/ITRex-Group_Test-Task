import { IUsers } from "../ts/types/user";

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
    case 'state':
      if (method === 'asc') {
        arr.sort((a, b) => a.adress.state > b.adress.state ? 1 : -1);
      } else {
        arr.sort((a, b) => a.adress.state < b.adress.state ? 1 : -1);
      }
      break;
    default:
      break;
  }
};

export default sortItems;