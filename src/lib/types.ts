export type ProductDTO = {
  id: string;
  name: string;
  category: "BEER" | "ENERGY" | "OTHER";
  volumeMl: number | null;
  sellPrice: number;
  imageUrl: string | null;
  inStock: boolean;
};
