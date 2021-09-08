const places = document.querySelector('.places');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add place form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});


// render place data
const renderplace = (data, id) => {
  const html = `
  <div class="card-panel place white row" data-id="${id}">
    <div class="place-details">
      <div class="place-name">${data.name}</div>
      <div class="place-city">${data.city}</div>
      <div class="image"><img src="${data.picurl}"></div>
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


// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;
const installApp = document.getElementById('installApp');
installApp.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
  installApp.style.display = 'block';

  installApp.addEventListener('click', async () => {
      installApp.style.display = 'none'
      // The user has had a postive interaction with our app and Chrome
      // has tried to prompt previously, so let's show the prompt.
      deferredPrompt.prompt();
      // Follow what the user has done with the prompt.
      deferredPrompt.userChoice.then(function(choiceResult) {
        if(choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }
        // We no longer need the prompt.  Clear it up.
        deferredPrompt = null;
      });
  });

});


