import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query

  const { data, fetchNextPage, hasNextPage, isError, isLoading, error } =
    useInfiniteQuery(
      "sw-species",
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.next || undefined,
      }
    );

  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (isError) {
    return <div>{error.toString()}</div>;
  }
  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {data?.pages?.map((page) => {
        return page?.results?.map((specis) => (
          <Species
            key={specis.name}
            name={specis.name}
            language={specis.language}
            averageLifespan={specis.average_lifespan}
          />
        ));
      })}
    </InfiniteScroll>
  );
}
