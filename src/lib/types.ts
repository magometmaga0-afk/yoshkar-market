export type ProductDTO = {
  id: string;
  name: string;
  category: "BEER" | "ENERGY" | "OTHER" | "SNACKS" | "COFFEE_TEA" | "CANNED" | "GROCERY" | "PET_SUPPLIES" | "PRODUCE";
  volumeMl: number | null;
  weightGrams: number | null;
  sellPrice: number;
  caseSize: number;
  imageUrl: string | null;
  description: string | null;
  inStock: boolean;
};
