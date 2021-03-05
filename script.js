let API_film = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&";
//Les mots-clés async et await permettent d'écrire un comportement asynchrone basé sur des promesses dans un style plus propre, évtant ainsi d'avoir à configurer explicitement les chaînes de promesses
const IMG_p = "https://image.tmdb.org/t/p/w1280";
const rech_api = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const btns = document.getElementById("btns");
const cart = document.getElementById("cart")
const movie = document.getElementsByClassName("movie")

let ctr = 1;
let next = document.createElement("button");
let previous = document.createElement("button");
getfilm(API_film);
managePages();
async function getfilm(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showmovies(respData.results);
}

function showmovies(movies) {
    //clear html
    main.innerHTML = ''
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${IMG_p +poster_path}" alt="${title}"/>
            <button class="addToCart btn btn-outline-danger btn-lg">Order</button>
            <div class="movie_info">
            <h3>${title}</h3>
            <span class="${getClassByRate(
                vote_average
            )}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview:</h3>
            <p>${overview}</p>
            <h3>Price = <span>${((vote_average + 1) * Math.floor((Math.random() +1) * 10)).toFixed(2)}</span> $
        </div>`
        main.appendChild(movieEl)
    });
    next.id = "nextButton"
    previous.id = "previousButton"
    next.textContent = "Next";
    previous.textContent = "Previous"
    btns.append(previous);
    btns.append(next);
    if (ctr === 1) {
        previous.style.visibility = 'hidden';
    } else {
        previous.style.visibility = 'visible';
    }
    let addToCartBtn = document.querySelectorAll('.addToCart');

    for (let i = 0; i < addToCartBtn.length; i++) {
        addToCartBtn[i].addEventListener('click', () => {
            let cartItems = document.querySelector("#test")
            let element = addToCartBtn[i].parentElement
            console.log(element)
            let divs = Array.prototype.slice.call(cartItems.children)
            console.log(divs)
            if (divs.length === 0) {
                alert("Movie added to shopping cart")
                let clone = element.cloneNode(true)
                clone.children[1].remove()
                cartItems.prepend(clone)
                let priceTotal = document.querySelector("#priceTotal")
                priceTotal.innerHTML = (parseFloat(priceTotal.innerHTML) + parseFloat(element.children[3].children[2].children[0].innerHTML)).toFixed(2)
            } else {
                for (let i = 0; i < divs.length; i++) {
                    console.log(divs.length)
                    if (divs[i].children[1].children[0].innerHTML === element.children[2].children[0].innerHTML) {
                        alert("item has already been added to the cart")
                        break
                    } else {
                        alert("Movie added to shopping cart")
                        let clone = element.cloneNode(true)
                        clone.children[1].remove()
                        cartItems.prepend(clone)
                        let priceTotal = document.querySelector("#priceTotal")
                        priceTotal.innerHTML = (parseFloat(priceTotal.innerHTML) + parseFloat(element.children[3].children[2].children[0].innerHTML)).toFixed(2)
                    }
                    breack
                }
            }
        })
    }
}
let cartimage = document.querySelector("#cartContainer")
cartimage.addEventListener("click", (e) => {
    let cartItems1 = document.querySelector("#cartItems")
    let mainItems = document.querySelector("#mainItems")
    cartItems1.style.display = "flex"
    mainItems.style.display = "none"
})

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'vert';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'rouge';
    }

};
form.addEventListener("keyup", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getfilm(rech_api + searchTerm);
        next.style.visibility = 'hidden';
        previous.style.visibility = "hidden";
    }
});

function managePages() {
    previous.style.visibility = 'visible';
    previous.addEventListener("click", (e) => {
        ctr--
        API_film = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&" + "page=" + ctr
        document.location = "#"
        getfilm(API_film);
    });

    next.addEventListener("click", (e) => {
        ctr++
        API_film = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&" + "page=" + ctr
        document.location = "#"
        getfilm(API_film);
    });
}