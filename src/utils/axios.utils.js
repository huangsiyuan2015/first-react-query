import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

// 配置拦截器
export const request = ({ ...options }) => {
  // 拦截请求，配置一些请求头信息
  client.defaults.headers.common.Authorization = `Bearer token`;

  // 拦截响应，处理响应数据再返回
  const onSuccess = (response) => response.data;
  const onError = (error) => console.log(error);

  return client(options).then(onSuccess).catch(onError);
};
