import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, fetchNextPage, hasNextPage, isError, isLoading, error } =
    useInfiniteQuery(
      "sw-people",
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
      {data?.pages?.map((pageData) => {
        return pageData?.results?.map((people) => (
          <Person
            key={people.name}
            name={people.name}
            hairColor={people.hair_color}
            eyeColor={people.eye_color}
          />
        ));
      })}
    </InfiniteScroll>
  );
}
