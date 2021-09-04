if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('service worker registered', reg))
    .catch(err => console.log('service worker not registered', err));
}

navigator.serviceWorker.getRegistrations()
.then(function(registrations) { 
    for(let registration of registrations) 
    { registration.unregister() 
  } 
})

