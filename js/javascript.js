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
        <div class="card-action">
        <a href="https://www.google.com/maps/search/?api=1&query=${data.latitude},<${data.longtitude}>">Go To Map</a>
        
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