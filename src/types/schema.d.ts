interface Iproduct {
  id?: number;
  img: string;
  name: string;
  types: number[];
  category: string;
  sizes: number[];
  price: number;
  rating: number;
}
interface IsortWidthPopular {
  name: string;
  sortProperty: string;
}
interface IprofileUser {
  profile: {
    id: number;
    username: string;
    role: string;
    email: string;
    isActive: boolean;
    photo: string;
    createdAt: string;
    updatedAt: string;
  };
}
