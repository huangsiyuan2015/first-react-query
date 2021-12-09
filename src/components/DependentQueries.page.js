import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

// 使用配置对象的 enabled 属性实现依赖查询
export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(
    ["user", email],
    async () => {
      const res = await axios.get(`http://localhost:4000/users/${email}`);
      return res.data;
    },
    {
      onSuccess: console.log,
    }
  );

  const channelId = user?.channelId;
  useQuery(
    ["courses", channelId],
    async () => {
      const res = await axios.get(
        `http://localhost:4000/channels/${channelId}`
      );
      return res.data;
    },
    {
      onSuccess: console.log,
      enabled: !!channelId, // 请求的发送依赖于 channelId 的值
    }
  );

  return <h2>Dependent Queries Page</h2>;
};
