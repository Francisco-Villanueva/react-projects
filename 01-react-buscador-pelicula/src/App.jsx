import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";
function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }

    // if(query.match(/))´´´¨´´´´asdasd

    setError(null);
  }, [search]);

  return { search, error, setSearch };
}

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(false);
  const { search, error, setSearch } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort }); //useMovies : custom Hook
  const handleSumbit = (e) => {
    e.preventDefault();

    getMovies({ search });
  };

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    []
  );
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    if (newQuery.startsWith(" ")) return;
    setSearch(newQuery);
    debouncedGetMovies(newQuery);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const moviesToShow = () => {
    const moviesPerPage = 9;
    const firtsIndex = (currentPage - 1) * moviesPerPage;
    const lastIndex = firtsIndex + moviesPerPage;

    return movies.slice(firtsIndex, lastIndex);
  };
  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form action="" className="form" onSubmit={handleSumbit}>
          <input
            name="query"
            value={search}
            onChange={handleInputChange}
            type="text"
            placeholder="Avengers, Star Wars, Hulk ..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />

          <button type="submit">buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      {movies.length ? (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(movies.length / 9)} // Calcula el número total de páginas
          onPageChange={setCurrentPage} // Actualiza la página actual al hacer clic en una página
        />
      ) : (
        ""
      )}

      <main>{loading ? "Cargando.." : <Movies movies={moviesToShow()} />}</main>
      {!loading &&
        (movies.length ? (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(movies.length / 9)} // Calcula el número total de páginas
            onPageChange={setCurrentPage} // Actualiza la página actual al hacer clic en una página
          />
        ) : (
          ""
        ))}
    </div>
  );
}

export default App;
