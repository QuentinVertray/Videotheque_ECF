import Typed from "typed.js";
var typed = new Typed('#element', {
    strings: ['Search for your favorite movies...', 'and more....'],
    typeSpeed: 30,
  });

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('results');
    const paginationDiv = document.getElementById('pagination');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('titleInput').value.trim();
        const year = document.getElementById('yearInput').value;
        const type = document.getElementById('typeSelect').value;

        searchMovies(title, year, type);
    });

    function searchMovies(title, year, type, page = 1) {
        const apiKey = '92b535a';
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}&y=${year}&type=${type}&page=${page}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
                setupPagination(data, title, year, type);
            })
            .catch(error => console.error('Erreur:', error));
    }

    function displayResults(data) {
        resultsDiv.innerHTML = '';
        if (data.Response === 'True') {
            data.Search.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/200x300'}" alt="Poster">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                `;
                resultsDiv.appendChild(movieElement);
            });
        } else {
            resultsDiv.innerHTML = `<p>${data.Error}</p>`;
        }
    }

    function setupPagination(data, title, year, type) {
        paginationDiv.innerHTML = '';
        if (data.totalResults > 10) {
            const totalPages = Math.ceil(data.totalResults / 10);
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.innerText = i;
                pageButton.addEventListener('click', () => searchMovies(title, year, type, i));
                paginationDiv.appendChild(pageButton);
            }
        }
    }
});