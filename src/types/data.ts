export type TLatLng = {
  lat: string;
  lng: string;
};

export type TAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: TLatLng;
};

export type TCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: TAddress;
  phone: string;
  website: string;
  company: TCompany;
};

export type TUserNeighbors = {
  prev: TUserPrimary | null;
  next: TUserPrimary | null;
};

export type TUserPrimary = Pick<TUser, "id" | "username" | "email">;

export type TTodo = {
  userId: number;
  id: number;
  todo: string;
  completed: boolean;
};

// в соответствии с https://dummyjson.com/docs/auth
export type TLoginResponse = {
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  token: string;
  username: string;
} & { message: string };

export type TCheckResponse = TUser;

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
