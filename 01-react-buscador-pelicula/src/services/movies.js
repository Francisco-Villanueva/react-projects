const API_KEY = "86804d0c";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;
  try {
    const res1 = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=1`
    );
    const res2 = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=2`
    );
    const res3 = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=3`
    );
    const json1 = await res1.json();
    const json2 = await res2.json();
    const json3 = await res3.json();

    const movies = json1.Search.concat(json2.Search).concat(json3.Search);

    return movies?.map((m) => ({
      id: m.imdbID,
      title: m.Title,
      year: m.Year,
      type: m.Type,
      poster: m.Poster,
    }));
  } catch (error) {
    throw new Error("Error searching movies!");
  }
};
