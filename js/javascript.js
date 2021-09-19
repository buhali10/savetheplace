const places = document.querySelector('.places');

document.addEventListener('DOMContentLoaded', function() {
  // add place form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
  // modal
  const elems = document.querySelectorAll('.modal');
  const instance = M.Modal.init(elems, {dismissible: false});
  // floating button group
  var buttonGroup = document.querySelectorAll('.fixed-action-btn');
  var instances2 = M.FloatingActionButton.init(buttonGroup, {
    direction: 'top'
  });
});


// render place data
const renderplace = (data, id) => {
  const html = `
  <div class="card-panel place white row" data-id="${id}">
    <div class="place-details">
      <div class="place-name">${data.name}</div>
      <div class="place-city">${data.city}</div>
      <div class="image"><img src="${data.picurl}" onerror="this.onerror=null; this.src='img/error_photo.png';"></div>
       <div class="card-action">
       <a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${data.location.latitude},${data.location.longitude}">Go To Map</a>
     </div>
  </div>
    <div class="place-delete">
      <i class="material-icons" data-id="${id}">delete_outline</i>
    </div>
  </div>
`;
places.innerHTML += html;
};

const removeplace = (id) => {
  const place = document.querySelector(`.place[data-id=${id}]`);
  place.remove();
};

let deferredPrompt;
const installApp = document.getElementById('installApp');

installApp.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log(`'beforeinstallprompt' event was fired.`);
  installApp.style.display = 'block';
});

installApp.addEventListener('click', async () => {
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  // console.log(`User response to the install prompt: ${outcome}`);
  deferredPrompt = null;
});

window.addEventListener('appinstalled', () => {
  installApp.style.display = 'none';
  deferredPrompt = null;
  console.log('PWA was installed');
});
