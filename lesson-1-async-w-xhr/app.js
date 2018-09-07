(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        function addImage(){
          let htmlContent = '';
          const data = JSON.parse(this.responseText);
          const firstImage = data.results[0];

          if (data && data.results && data.results[0]) {
            htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
          }
        }

        const unslpashRequest = new XMLHttpRequest();

        unslpashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unslpashRequest.onload = addImage;
        unslpashRequest.setRequestHeader('Authorization', 'Client-ID 7639d91e9fade8eb2b958dbefb677a0be5e5825a90eb3209c0fb9f14e6b3cb7d');

        unslpashRequest.send();

        function addArticles() {
          let htmlContent = '';
          const data = JSON.parse(this.responseText);

          if(data.response && data.response.docs && data.response.docs.length > 1){
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
            </li>`
          ).join('') + '</u>';
        } else {
          htmlContent = '<div class="error-no-articles">No articles available</div>';
        }
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }

        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=469a24ebe13a477f90655dc44e2ecef1`);
        articleRequest.send();
    });





})();
