import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

// 分页查询
export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    isLoading,
    data: colors,
    isError,
    error,
    isFetching,
  } = useQuery(
    ["colors", pageNumber],
    async () => {
      const res = await axios.get(
        `http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
      );
      return res.data;
    },
    {
      onSuccess: console.log,
      // isLoading 时显示之前的数据，isFetching 可以显示加载状态
      keepPreviousData: true,
    }
  );

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h2>Paginated Queries Page</h2>
      <ol>
        {colors?.map((color) => (
          <li key={color.id}>{color.label}</li>
        ))}
      </ol>
      <div>
        <button
          onClick={() => setPageNumber((pageNumber) => pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          pre
        </button>
        <span>{pageNumber}</span>
        <button
          onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
          disabled={pageNumber === 4}
        >
          next
        </button>
      </div>
      {isFetching && "Fetching..."}
    </>
  );
};
