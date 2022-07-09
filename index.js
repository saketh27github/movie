const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

//load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=52d6585f`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

// Displaying movie list
function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        // setting movie id in  data-id
        movieListItem.dataset.id = movies[idx].imdbID;   

        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

// loding movielist from IMDb api
function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=52d6585f`);
            const movieDetails = await result.json();

            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

// Details of the movie
function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>

        <a id="fav-detail" style="color: white; cursor: pointer;"><i class="fa-solid fa-heart"></i></a>

        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
        
    </div>
    `;

   

    var favDetail = document.getElementById('fav-detail');
    let flag = addedCheck(details.imbdID);

    if(flag){
        favDetail.style.color = 'red';
    }

    favDetail.addEventListener('click', function(){
        if(flag){
            removeLocalFavs(details.imbdID);
            favDetail.style.color = 'white';
            flag = false;
        }else{
            favDetail.style.color = 'red';
            saveLocalFavs(details.imbdID);
            flag = true;
        }
    });

    function saveLocalFavs(id){
        let fav;
        if(localStorage.getItem("fav") === null){
            fav = [];
        }else{
            fav = JSON.parse(localStorage.getItem("fav"));
        }
        let obj = {
            imbdID : id
        }

        fav.push(obj);
        localStorage.setItem("fav", JSON.stringify(fav));
    }

    function addedCheck(id){
        let fav;
        if(localStorage.getItem("fav") === null){
            fav = [];
        }else{
            fav = JSON.parse(localStorage.getItem("fav"));
        }

        const delIndex = fav.findIndex(function(item, index){
            if(item.imbdID == id){
                return true;
            }
        });

        if(delIndex > -1)
        return true;
    }



            function removeLocalFavs(id){
                let fav;
                if(localStorage.getItem("fav") === null){
                    fav = [];
                }else{
                    fav = JSON.parse(localStorage.getItem("fav")); 
                }

                const delIndex = fav.findIndex(function(item, index){
                    if(item.imbdID == id){
                        return true;
                    }
                });

                if(delIndex > -1)
                fav.splice(delIndex, 1);
                localStorage.setItem("fav", JSON.stringify(fav));
            }
        }
    
           // event listener for favourite icon
        favDetail.addEventListener('click', function(e){
            console.log('Inside fav');
            favDetail.style.color = 'red';
        }, true);






