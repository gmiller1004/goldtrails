export type CartItem = {
  id: string;
  variantId: string;
  variantTitle?: string;
  handle: string;
  title: string;
  price: string;
  image: string | null;
  quantity: number;
};
