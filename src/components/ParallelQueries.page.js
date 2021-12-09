import { useQuery } from "react-query";
import axios from "axios";

// 多次使用 useQuery 就可以实现并行查询
export const ParallelQueriesPage = () => {
  const { data: superHero } = useQuery(
    "super-heroes",
    async () => {
      const res = await axios.get("http://localhost:4000/superheroes");
      return res.data;
    },
    {
      onSuccess: (data) => console.log(data),
    }
  );

  const { data: frineds } = useQuery(
    "friends",
    async () => {
      const res = await axios.get("http://localhost:4000/friends");
      return res.data;
    },
    {
      onSuccess: (data) => console.log(data),
    }
  );

  return <h2>Parallel Queries Page</h2>;
};
