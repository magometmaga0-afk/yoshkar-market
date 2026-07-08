export type ProductDTO = {
  id: string;
  name: string;
  category: "BEER" | "ENERGY" | "OTHER" | "SNACKS" | "COFFEE_TEA" | "CANNED" | "GROCERY" | "PET_SUPPLIES" | "PRODUCE";
  volumeMl: number | null;
  weightGrams: number | null;
  packCount: number | null;
  sellPrice: number;
  caseSize: number;
  imageUrl: string | null;
  description: string | null;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbs: number | null;
  fiber: number | null;
  moisture: number | null;
  inStock: boolean;
};
