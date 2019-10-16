function displayPhotos(photos) {
  const container = document.getElementById("container");
  photos.forEach(function(photo) {
    let imgUrl =
      "https://farm" +
      photo.farm +
      ".staticflickr.com/" +
      photo.server +
      "/" +
      photo.id +
      "_" +
      photo.secret +
      ".jpg";
    let imgDiv = document.createElement("div");
    let img = document.createElement("img");
    img.height = 284;
    img.width = 421;
    img.src = imgUrl;
    imgDiv.appendChild(img);

    let title = document.createElement("div");

    let titleSpan = document.createElement("div");
    titleSpan.innerText = photo.title;
    title.appendChild(titleSpan);

    imgDiv.appendChild(title);
    title.classList.add("title-class");
    container.appendChild(imgDiv);
  });
}

function disableLoader() {
  document.getElementById("loader").style.display = "none";
}

function displayError() {
  const error = document.createElement("p");
  error.innerText = "Någonting gick fel, vänligen ladda om sidan.";
  document.getElementById("title").parentNode.appendChild(error);
}
var mykey = config.APY_KEY;

let galleryUrl =
  "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=" +
  mykey +
  "&gallery_id=72157691209937521&format=json&nojsoncallback=1";

fetch(galleryUrl)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    disableLoader();

    if (data) {
      displayPhotos(data.photos.photo);
    } else {
      displayError();
    }
  })
  .catch(function(err) {
    disableLoader();
    displayError();
  });
