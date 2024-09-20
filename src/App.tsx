import { ProductList } from "@components/product-list";
import { SearchBar } from "@components/search-bar";
import { FilterProvider } from "./contexts";

function App() {
  return (
    <section className="pt-24 pb-12">
      <FilterProvider>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <h2 className="font-manrope font-bold text-4xl text-black max-xl:text-center">
              New Arrivals
            </h2>

            <SearchBar />
          </div>
          <ProductList />
        </div>
      </FilterProvider>
    </section>
  );
}

export default App;
