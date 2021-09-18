let currentlatitude = '';
let currentlongitude = '';
let pic_url = '';
let my_pic = '';
let videoPlayer = document.querySelector('#player');
let canvasElement = document.querySelector('#canvas');
let captureButton = document.querySelector('#capture-btn');
let imagePicker = document.querySelector('#image-picker');
let imagePickerArea = document.querySelector('#pick-image');

// From this moment any document received from the server 
// is stored locally in an Indexed DB

db.enablePersistence()
  .catch(function (err) {
    if (err.code == 'failed-precondition') {
      // multible tabs open at once
      console.log('Multiple tabs open!!! Persistence can only be enabled in one tab at a time')
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('Lack of browser support for this feature');
    }
  });

// real-time listener
db.collection('places').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      renderplace(change.doc.data(), change.doc.id);
    }
    else if (change.type === 'removed') {
      removeplace(change.doc.id);
    }
  });
});

// camera access 
if (!('mediaDevices' in navigator)) {
  navigator.mediaDevices = {};
}

if (!('getUserMedia' in navigator.mediaDevices)) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    })
  }
}

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    videoPlayer.srcObject = stream;
    videoPlayer.style.display = 'block';
    videoPlayer.play();

  })
  .catch(err => {
    imagePickerArea.style.display = 'block';
    captureButton.style.display = 'none';
  });

captureButton.addEventListener('click', event => {
  canvasElement.style.display = 'block';
  videoPlayer.style.display = 'none';
  captureButton.style.display = 'block';
  let context = canvasElement.getContext('2d');
  context.drawImage(videoPlayer, 0, 0, canvasElement.width, canvasElement.height);;
  /*  videoPlayer.srcObject.getVideoTracks().forEach(track => {
     track.stop();
   }) */
  my_pic = canvasElement.toDataURL('image/jpeg');
  // data url of the image
  console.log("Captured this photo " + my_pic);
  const storage = firebase.storage().ref('SaveThePlaces/' + new Date());;
  // 'file' comes from the Blob or File API
  storage.putString(my_pic, 'data_url').then((snapshot) => {
    storage
      .getDownloadURL()
      .then(function (url) {
        console.log(url);
        pic_url = url;
      })
      .catch(function (error) {
        console.log("error encountered");
      });
  });
});

// Configure File

var files = [];
document.getElementById("image-picker").addEventListener("change", function (e) {
  files = e.target.files;
  my_pic = files[0]
  console.log('Uploaded this photo: ', my_pic);
  // Configure Storage
  const storage = firebase.storage().ref('SaveThePlaces/' + my_pic.name);
  // 'file' comes from the Blob or File API
  storage.put(my_pic).then((snapshot) => {
    console.log('Uploaded a blob or file!', snapshot);
    storage
      .getDownloadURL()
      .then(function (url) {
        console.log(url);
        pic_url = url;
        document.getElementById("myframe").src = pic_url;
      })
      .catch(function (error) {
        console.log("error encountered");
      });
  });
});

// add new place
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  const place = {
    name: form.name.value,
    city: form.city.value,
    location: new firebase.firestore.GeoPoint(currentlatitude, currentlongitude),
    picurl: pic_url
  };

  db.collection("places").add(place)
    .then(function (docRef) {
      console.log("Document written with ID ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document", error);
    })
  location.reload('/');
});

// remove a place
const placeContainer = document.querySelector('.places');
var deletepath = '';
var deletefile = ''
placeContainer.addEventListener('click', event => {
  if (event.target.tagName === 'I') {
    const id = event.target.getAttribute('data-id');
    db.collection('places').doc(id)
      .onSnapshot((doc) => {
        deletepath = doc.data().picurl;
        deletefile = firebase.storage().refFromURL(deletepath).name;
        firebase.storage().ref('SaveThePlaces/' + deletefile).delete().then(() => {
          console.log("File deleted successfully");
        }).catch((error) => {
          console.log('Uh-oh, an error occurred! ' + error);
        });
      });
    db.collection('places').doc(id).delete();
    console.log('Object ' + id + ' is deleted');
  };
});

// geolocation
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
        alert("The Locator was denied")
      })
  }

  function getUserAddressBy(lat, long) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var address = JSON.parse(this.responseText)
        console.log(address, lat, long);
        currentlatitude = lat
        currentlongitude = long
        setAddressToInputField(address.results[0].formatted_address)
      }
    };
    xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="
      + lat + "," + long + "&key=AIzaSyDTarYtWcGqXrPgoldDizulOxif2q1V3TI", true);
    xhttp.send();
  }

  function setAddressToInputField(address) {
    var input = document.getElementById("location_fill");
    input.value = address
    locatorSection.classList.remove("loading")
  }

  init()
})();
