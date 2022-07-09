const searchList = document.getElementById('search-list');
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
const resultGrid = document.getElementById('result-grid');


var favMovies = [];

function fetchFavs(){
    if(localStorage.getItem("fav")  === null){
        favMovies = [];

    }else{
        favMovies = JSON.parse(localStorage.getItem("fav"));
    }
    console.log(favMovies);
}
fetchFavs();

for(let i=0; i<favMovies.length; i++){
    loadMovies(favMovies[i].imbdID);
}


async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?apikey=52d6585f&i=${searchTerm}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response == "True"){
        displayMovieList(data);
    }
}

function displayMovieList(movies){

    let movieListItem = document.createElement('div');
    movieListItem.setAttribute('id', movies.imbdID);
    movieListItem.classList.add('fav-movie');
    let moviePoster = "N/A";
    if(movies.Poster != "N/A")
       moviePoster = movies.Poster;
       else 
       moviePoster = "image_not_found.png";

       let img = document.createElement('img');
       img.classList.add('fav-img');
       img.src = moviePoster;
       movieListItem.appendChild(img);


       let title = document.createElement('h3');
       title.classList .add("fav-title");
       title.innerText = movies.Title;
       movieListItem.appendChild(title);

       searchList.appendChild(movieListItem);
}


async function loadMovieDetails(favId){
    const URL = `https://omdbapi.com/?apikey=52d6585f&i=${favId}`;
    const res = await fetch(`$(URL)`);
    const data = await res.json();
    if(data.Response == "True"){
        displayMovieDetails(data);
    }
}

function eventTarget(e){
    console.log(e.target.parentElement);
    let favId = e.target.parentElement.id;

    console.log(favId);
    loadMovieDetails(favId);
}





searchList.addEventListener('click', eventTarget, false);


searchList.onclick = function(){
    modal.style.display = "block";

}

span.onclick = function(){
    modal.style.display = "none";

}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
     <div class = "movie-poster">
     <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
     </div>
     <div class = "movie-info">
     <h3 class = "movie-title">${details.Title}</h3>
     <a id="fav-detail" style="color:white; cursor:pointer;"><i class="fa-heart"></i></a>
     
     <ul class = "movie-misc-info">
     <li class = "year">Year: ${details.Year}</li>
     <li class = "rated">Ratings: ${details.imdbRating}</li>
     <li class = "released">Released: ${details.Released}</li>
     </ul>

     <p class="genre"><b>Genre:</b> ${details.Genre}</p>
    <p class="writer"><b>Writer:</b> ${details.writer}</p>
    <p class="actors"><b>Actors:</b> ${details.Actors}</p>
    <p class="plot"><b>Plot:</b> ${details.Plot}</p>
    <p class="language"><b>Language:</b> ${details.Language}</p>
    <p class="awards"><b><i class="fas fa-award"></i></b><b> Awards:</b> ${details.Awards}</p>
   </div>

    `;
}

var favDetail = document.getElementById('fav-details');


let flag = addedCheck(details.imdbID);