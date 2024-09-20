import { useFilterContext } from "@contexts/index";
import { useLoadMoreObserver } from "@hooks/useLoadMoreObserver";
import { ProductCard, ProductCardSkeleton } from "./product-card";

export const ProductList = () => {
  const { results, fetchMoreProduct, showLoadMore, loading } =
    useFilterContext();

  const { isVisible, loadMoreRef } = useLoadMoreObserver({
    callback: () => fetchMoreProduct(),
  });

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      {results.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}

      {loading
        ? [...Array(8)].map(() => <ProductCardSkeleton />)
        : showLoadMore && (
            <div className={"load-more"} ref={loadMoreRef}>
              {isVisible ? "Loading..." : "Load more"}
            </div>
          )}
    </div>
  );
};
