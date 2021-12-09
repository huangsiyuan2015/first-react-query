import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const HomePage = () => {
  const { refetch } = useSuperHeroesData({
    enabled: false,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  return (
    <>
      <h2>Home Page</h2>
      <button onClick={refetch}>Fetch heroes</button>
    </>
  );
};
