import './App.css';
import Movie from './components/Movie'
import {useState, useEffect} from 'react'
import NotFound from './components/NotFound';
import {Spinner} from 'react-bootstrap';

const movieApi = 'https://imdb-api.com/en/API/SearchMovie/k_z3c8o889/'
const movieTop = 'https://imdb-api.com/en/API/Top250Movies/k_z3c8o889'

function App() {
  const [movie,setMovie] = useState([])
  const [term,setTerm] = useState('')
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)
  
  const onHandleTerm = (e) => {
    setTerm(e.target.value)
  }

  useEffect(() => {
    fetch(movieTop)
    .then(res => res.json())
    .then(res => { 
      setMovie(res.items)
      setLoading(false)
    })
  }, [])

  const onHandleSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    fetch(movieApi + term)
    .then(res => res.json())
    .then(res => {
      if (res.results !== 0) {
        setMovie(res.results)
      } else {
        setError(true)
      }
      setLoading(false)
    })
    setTerm('')
  }
  
  const onNotFound = () => {
    setLoading(true)
    fetch(movieTop)
    .then(res => res.json())
    .then(res => {
      setMovie(res.items)
      setError(false)
      setLoading(false)
    })
}

  return (
    <>
      <header>
        <form action="submit" onSubmit={onHandleSearch}>
          <input type="text" placeholder="Найти..." value={term} onChange={onHandleTerm}/>
        </form>
      </header>
      <div className="movies">
        {
        error ? <NotFound onNotFound={onNotFound} /> :
         (loading ? <Spinner className="spinner" animation="border" role="status" variant="light"/> :
          movie.map((elem) => <Movie key={elem.id} {...elem}/>))
        }
      </div>
    </>
  );
}

export default App;
