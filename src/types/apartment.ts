export type ApartmentReview = {
  id: number;
  authorId: number;
  author: string;
  text: string;
  rating: number;
  createdAt: string;
};

export type Apartment = {
  id: number;
  title: string;
  description: string;
  price: string;
  address: string;
  image: string;
  reviews?: ApartmentReview[];
};