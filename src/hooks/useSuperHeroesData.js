import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { request } from "../utils/axios.utils";

export const useSuperHeroesData = (options = {}) => {
  return useQuery(
    "super-heroes",
    // async () => {
    //   const res = await axios.get(`http://localhost:4000/superheroes`);
    //   return res.data;
    // },
    // 使用 axios 拦截器
    () => request({ url: "/superheroes" }),
    { ...options }
  );
};

// 使用 useMutation 增删改数据
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(
    // async (hero) => {
    //   const res = await axios.post(`http://localhost:4000/superheroes1`, hero);
    //   return res.data;
    // },
    // 使用 axios 拦截器
    (hero) => request({ url: "/superheroes", method: "post", data: hero }),

    // {
    //   onSuccess: (data) => {
    //     // mutate 成功后的回调，使 queryKey "super-heroes" 过期会自动 refetch
    //     // queryClient.invalidateQueries("super-heroes");

    //     // 可以不必 refetch 更新数据，利用 post 请求返回的数据来更新 queryData
    //     console.log("data: ", data);
    //     queryClient.setQueryData("super-heroes", (oldSuperHeroesData) => {
    //       return [...oldSuperHeroesData, data];
    //     });
    //   },
    // }

    // 乐观更新
    {
      onMutate: async (newHero) => {
        await queryClient.cancelMutations("super-heroes");

        // 更新前保留上一次的数据，用于更新失败时回滚
        const preSuperHeroesData = queryClient.getQueryData("super-heroes");

        // 进行乐观更新
        queryClient.setQueryData("super-heroes", (oldSuperHeroesData) => {
          return [
            ...oldSuperHeroesData,
            { id: oldSuperHeroesData.length + 1, ...newHero },
          ];
        });

        // 更新失败返回之前的数据
        return {
          preSuperHeroesData,
        };
      },
      onError: (_error, _newHero, context) => {
        // 错误回滚
        queryClient.setQueryData("super-hero", context.preSuperHeroesData);
      },
      onSettled: () => {
        // 不论 mutation 成功还是失败，都 refetch 一次获取服务端的数据
        queryClient.invalidateQueries("super-heroes");
      },
    }
  );
};
