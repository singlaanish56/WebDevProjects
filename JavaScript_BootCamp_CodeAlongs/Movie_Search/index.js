//customized movie selector and information display
//root : the div to add the html to
//renderOption:user customized options for the dropdown
//onOptionSelect:What to do when the user selects an option
//inputValue:return what to update the input value to
//fetchData:the apiand paramter call to the api
const autoCompleteConfig = {
    renderOption(movie) { //return the customizd options that we need to render
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `<img src="${imgSrc}">
        ${movie.Title}
        `;
    },
    inputValue(movie) {
        return movie.Title;
    },
    //with axios it sis easier for 
    //params as need not be added directly to api call
    async fetchData(searchTerm) {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: '6b2dc16e',
                s: searchTerm
            }
        });

        if (response.data.Error)
            return [];
        return response.data.Search;
    }

}
createAutocomplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
    },
});
createAutocomplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
    },
});

let leftmovie;
let rightmovie;
const onMovieSelect = async(movie, summaryTarget, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '6b2dc16e',
            i: movie.imdbID
        }
    });
    summaryTarget.innerHTML = movieTemplate(response.data);

    if (side === 'left') {
        leftmovie = response.data;
    } else {
        rightmovie = response.data;
    }

    if (leftmovie && rightmovie) {
        runComparison();
    }
}

const runComparison = () => {
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index];
        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);

        if (rightSideValue > leftSideValue) {
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        } else {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        }
    });
}

//constructing the main html to display the info
const movieTemplate = (movieDetail) => {
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(movieDetail.Metascore);;
    const imddRating = parseInt(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/'/g, ''));

    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);
        if (isNaN(value)) {
            return prev;
        } else {
            return prev + value;

        }
    }, 0);

    return `
    <article class="media">
        <figure class="media-left">
        <p class="image">
            <img src="${movieDetail.Poster}">
        </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article data-value=${awards} class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metascore} class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p></p>
    </article>
    <article data-value=${imddRating} class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
    </article>
    `;
};