import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  // const [pollTime, setPollTime] = useState(3000);

  // const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
  //   "super-heroes",
  //   async () => {
  //     const res = await axios.get(`http://localhost:4000/superheroes`);
  //     return res.data;
  //   },
  //   {
  //     // cacheTime: 5000, // 缓存时间，默认是 5 分钟
  //     // staleTime: 30000, // 过期时间，refetch 需要等待的时间，默认是 0
  //     // refetchOnMount: false, // 挂载组件时 refetch，默认为 true
  //     // refetchOnWindowFocus: false, // 聚焦页面时 refetch，默认为 true
  //     // refetchInterval: 2000, // 固定频率 refetch，用于获取实时数据（商品库存）
  //     // refetchIntervalInBackground: true, // 上面失焦后停止 refetch，开启后会在后台一直 refetch
  //     // enabled: false, // 挂载组件时自动 fetch 数据，默认为 true，关掉后配合 refetch 方法手动 fetch 数据

  //     // refetchInterval: pollTime,
  //     // onSuccess: (data) => {
  //     //   // fetch 数据成功后的回调
  //     //   console.log("Perform side effect after data fetching", data);
  //     //   // 请求成功的数据符合条件，停止轮询
  //     //   if (data.length === 4) {
  //     //     setPollTime(false);
  //     //   }
  //     // },
  //     // onError: (error) => {
  //     //   // fetch 数据失败后的回调
  //     //   console.log("Perform side effect after encountering error", error);
  //     //   // 请求过程中发生错误，停止轮询
  //     //   if (error) {
  //     //     setPollTime(false);
  //     //   }
  //     // },

  //     // 对成功返回的数据进行转换（选取/过滤）
  //     select: (data) => {
  //       return data.map((hero) => hero.name);
  //     },
  //   }
  // );

  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  // 把 useQuery 包装成自定义 hook，复用数据请求的逻辑
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData({
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
      refetchOnWindowFocus: false,
    });

  const { mutate: addHero } = useAddSuperHeroData();

  if (isLoading) return <h2>Loading...</h2>;

  // if (isFetching) return <h2>Fetching...</h2>;

  if (isError) return <h2>{error.message}</h2>;

  const handleAddHeroClick = () => {
    addHero({ name, alterEgo });
  };

  return (
    <>
      <h2>RQ Super Heroes Page</h2>

      <div>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(event) => setAlterEgo(event.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>

      {/* 手动 fetch 数据 */}
      <button onClick={refetch}>Fetch heroes</button>

      {/* data 是数组，数组中的每个元素是一个对象 */}
      {data?.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}

      {/* data 是数组，数组中的每个元素是一个字符串 */}
      {/* {data?.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))} */}
    </>
  );
};
