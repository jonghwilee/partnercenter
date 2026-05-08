import { createContext, useContext } from "react";

interface BrandStoreContextValue {
  brandId: string;
  storeId: string;
  showStoreInTable: boolean;
  setBrandId: (id: string) => void;
  setStoreId: (id: string) => void;
}

const BrandStoreContext = createContext<BrandStoreContextValue>({
  brandId: "",
  storeId: "",
  showStoreInTable: false,
  setBrandId: () => {},
  setStoreId: () => {},
});

export function useBrandStore() {
  return useContext(BrandStoreContext);
}

export default BrandStoreContext;
