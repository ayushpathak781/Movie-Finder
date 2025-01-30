document.getElementById('search-btn').addEventListener('click', searchMovie);

async function searchMovie() {
   document.getElementById('search-button').addEventListener('click', searchMovie);
  // Validate input
  if (!searchTerm) {
    alert('Please enter a movie title');
    return;
  }
  
  const apiKey = 'e8d061e4'; 
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Check if there are results
    if (data.Response === 'True') {
      displayMovies(data.Search);
    } else {
      document.getElementById('movie-info').innerHTML = `<p>No movies found</p>`;
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    document.getElementById('movie-info').innerHTML = `<p>Something went wrong. Please try again later.</p>`;
  }
}

function displayMovies(movies) {
  const movieInfoDiv = document.getElementById('movie-info');
  movieInfoDiv.innerHTML = ''; // Clear previous search results
  
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    
    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.Title;
    
    const movieYear = document.createElement('p');
    movieYear.textContent = `Year: ${movie.Year}`;
    
    const moviePoster = document.createElement('img');
    moviePoster.src = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150';
    moviePoster.alt = `Poster of ${movie.Title}`;
    
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(movieYear);
    movieCard.appendChild(moviePoster);
    
    movieInfoDiv.appendChild(movieCard);
  });
}