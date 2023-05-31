/* los archivos "with-results" y "no-results" te sirven para simular
una petición a la API y tener el formato de respuesta. Además evita
tener que mirar en la consola como se trae la información.

    import withResults from "../mocks/with-results.json";
    import withNoResults from "../mocks/no-results.json";
*/
import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";
export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const prevSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (search === prevSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      prevSearch.current = search;
      const newMovies = await searchMovies({ search });

      setMovies(newMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      //esto se ejecuta tanto en el try como en el catch
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading, error };
}
