export type ProductDTO = {
  id: string;
  name: string;
  category: "BEER" | "ENERGY" | "OTHER" | "SNACKS" | "COFFEE_TEA" | "CANNED";
  volumeMl: number | null;
  sellPrice: number;
  caseSize: number;
  imageUrl: string | null;
  description: string | null;
  inStock: boolean;
};
