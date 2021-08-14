// enable offline data
db.enablePersistence()
  .catch(function(err) {
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
    if(change.type === 'added'){
      renderplace(change.doc.data(), change.doc.id);
    }
    if(change.type === 'removed'){
      // remove the document data from the web page
    }
  });
});

// add new place
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const place = {
    name: form.name.value,
    city: form.city.value,
    photo: form.city.photo
  };

  db.collection('places').add(place)
    .catch(err => console.log(err));

  form.name.value = '';
  form.city.value = '';
  form.photo.value = '';

});

// remove a place
const placeContainer = document.querySelector('.places');
placeContainer.addEventListener('click', evt => {
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('places').doc(id).delete();
  }
})