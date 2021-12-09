import axios from "axios";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { Fragment } from "react/cjs/react.production.min";

export const InfiniteQueriesPage = () => {
  const {
    isLoading,
    data: colors,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["colors"],
    async ({ pageParam = 1 }) => {
      console.log("pageParam: ", pageParam);
      const res = await axios.get(
        `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
      );
      return res.data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        // console.log("lastPage: ", lastPage);
        // console.log("pages: ", pages);

        // 函数返回值会作为 queryFn 参数解构 pageParam 的值
        // 返回值也会转为布尔值作为 hasNextPage 的值
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
      onSuccess: (data) => console.log("onSuccess: ", data),
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;

  console.log("hasNextPage: ", hasNextPage);

  return (
    <>
      <h2>Infinite Queries Page</h2>
      <ol>
        {colors?.pages.map((page, index) => (
          <Fragment key={`page-${index}`}>
            {page.map((color) => (
              <li key={color.id}>{color.label}</li>
            ))}
          </Fragment>
        ))}
      </ol>
      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          load more
        </button>
      </div>
      {isFetching && !isFetchingNextPage ? "Fetching..." : null}
    </>
  );
};
