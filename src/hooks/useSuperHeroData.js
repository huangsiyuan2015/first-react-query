import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

// 使用 SuperHeroesData 初始化 SuperHeroData
// 这样访问 SuperHeroesPage 后访问 SuperHeroPage 不用 loading
// 但是后台还是会 refech SuperHeroPage 的数据
export const useSuperHeroData = (heroId, options = {}) => {
  const queryClient = useQueryClient();

  return useQuery(
    ["super-hero", heroId],
    async () => {
      const res = await axios.get(
        `http://localhost:4000/superheroes/${heroId}`
      );
      return res.data;
    },
    {
      // initial query data
      initialData: () => {
        const hero = queryClient
          .getQueryData("super-heroes")
          ?.find((hero) => hero.id === parseInt(heroId));

        if (hero) return hero;
        else return undefined;
      },
      refetchOnWindowFocus: false,
    }
  );
};

// export const useSuperHeroData = (heroId, options = {}) => {
//   return useQuery(
//     ["super-hero", heroId],

//     // 写法一
//     // async () => {
//     //   const res = await axios.get(
//     //     `http://localhost:4000/superheroes/${heroId}`
//     //   );
//     //   return res.data;
//     // },

//     // 写法二：queryFn 接受一个参数包含 queryKey
//     async ({ queryKey }) => {
//       const heroId = queryKey[1];
//       const res = await axios.get(
//         `http://localhost:4000/superheroes/${heroId}`
//       );
//       return res.data;
//     },
//     { ...options }
//   );
// };
