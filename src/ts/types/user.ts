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
};

export interface ISotrItems {
  sortID: boolean;
  sortFirst: boolean;
  sortLast: boolean;
  sortEmail: boolean;
  sortPhone: boolean;
  sortState: boolean;
};

