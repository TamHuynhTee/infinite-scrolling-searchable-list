import { BASE_LIMIT, BASE_SKIP, BASE_TOTAL } from "@constants/index";
import { IProduct } from "@interfaces/index";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { fetchListProduct } from "@services/endpoints";

interface FilterContextType {
  loading: boolean;
  results: IProduct[];
  total: number;
  showLoadMore: boolean;
  fetchMoreProduct: () => Promise<void>;
  onSearchProduct: (args: any) => Promise<void>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<IProduct[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [skip, setSkip] = useState<number>(BASE_SKIP);
  const [total, setTotal] = useState<number>(BASE_TOTAL);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  // actions
  const fetchMoreProduct = async () => {
    setLoading(true);
    try {
      const newSkip = skip + BASE_LIMIT;
      const response = await fetchListProduct({ skip: newSkip, q: searchText });
      setSkip(newSkip);
      setResults([...results, ...response.products]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSearchProduct = async (q: string) => {
    setLoading(true);
    try {
      const response = await fetchListProduct({ skip: BASE_SKIP, q });

      setSearchText(q);
      setSkip(response.skip);
      setTotal(response.total);
      setResults(response.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const response = await fetchListProduct({
          skip: BASE_SKIP,
          q: searchText,
        });
        setSkip(response.skip);
        setTotal(response.total);
        setResults((_products) => [..._products, ...response.products]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    const timer = setTimeout(() => {
      setFirstLoad(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const showLoadMore = total > skip && !firstLoad;

  return (
    <FilterContext.Provider
      value={{
        loading,
        results,
        total,
        showLoadMore,
        fetchMoreProduct,
        onSearchProduct,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
