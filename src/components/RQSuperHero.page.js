import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

export const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  const {
    isLoading,
    data: hero,
    isError,
    error,
  } = useSuperHeroData(heroId, {
    onSuccess: (data) => console.log(data),
  });

  // console.log("heroId: ", heroId);

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h2>RQ Super Hero Page</h2>
      <p>
        {hero?.name} - {hero?.alterEgo}
      </p>
    </>
  );
};
