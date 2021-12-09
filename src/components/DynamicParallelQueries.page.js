import { useQueries } from "react-query";
import axios from "axios";

// 使用 useQueries 实现动态的并行查询
export const DynamicParallelQueriesPage = ({ heroIds }) => {
  // useQueries 的参数接收一个数组
  // 数组元素是一个对象，对象包含 queryKey、queryFn 以及配置对象的属性
  const queryResults = useQueries(
    heroIds.map((heroId) => ({
      queryKey: ["super-hero", heroId],
      queryFn: async () => {
        const res = await axios.get(
          `http://localhost:4000/superheroes/${heroId}`
        );
        return res.data;
      },
      onSuccess: console.log,
      refetchOnWindowFocus: false,
    }))
  );

  // useQueries 的返回值是一个对象数组
  // 查询返回的数据包含在对象的 data 属性中
  console.log(queryResults);

  return <h2>Dynamic Parallel Queries Page</h2>;
};
