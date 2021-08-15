// enable offline data
db.enablePersistence()
  .catch(function (err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

// real-time listener
db.collection('places').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      renderplace(change.doc.data(), change.doc.id);
    }
    if (change.type === 'removed') {
      removeplace(change.doc.id);
    }
  });
});

(function () {
  var locatorSection = document.getElementById("locator-input-section")

  function init() {
      var locatorButton = document.getElementById("locator-button");
      locatorButton.addEventListener("click", locatorButtonPressed)
  }

  function locatorButtonPressed() {
      locatorSection.classList.add("loading")

      navigator.geolocation.getCurrentPosition(function (position) {
              getUserAddressBy(position.coords.latitude, position.coords.longitude)
          },
          function (error) {
              locatorSection.classList.remove("loading")
              alert("The Locator was denied :( Please add your address manually")
          })
  }

  function getUserAddressBy(lat, long) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              var address = JSON.parse(this.responseText)
              setAddressToInputField(address.results[0].formatted_address)
          }
      };
      xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=****", true);
      xhttp.send();
  }

  function setAddressToInputField(address) {
      var input = document.getElementById("autocomplete");
      input.value = address
      locatorSection.classList.remove("loading")
  }

  init()

})();

// add new place

function createForm(position) {
  const form = document.querySelector('form');
  const longitude = position.coords.longitude;
  const latitud = position.coords.latitude;

  form.addEventListener('submit', evt => {
    evt.preventDefault();

    const place = {
      name: form.name.value,
      city: form.city.value,
      latitude: latitude,
      longitude: longitude
    };

    db.collection('places').add(place)
      .catch(err => console.log(err));

    form.name.value = '';
    form.city.value = '';
    console.log(place.name + ' in ' + place.name + ' is added to the gallery')
  });

};


// remove a place
const placeContainer = document.querySelector('.places');
placeContainer.addEventListener('click', evt => {
  if (evt.target.tagName === 'I') {
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('places').doc(id).delete();
    console.log('Object' + id + 'is deleted')
  }
})


//function that gets the location and returns it
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geo Location not supported by browser");
  }
}


//function that retrieves the position
function showPosition(position) {
  var location = {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude
  }
  console.log(location)
}
