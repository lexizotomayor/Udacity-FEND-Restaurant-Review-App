//Register Service Worker
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
      .then(register => {
        console.log(`HOORAY! REGISTRATION DONE! ${register.scope}`);
      }).catch(err => {
        console.log(`HOUSTON, WE HAVE A PROBLEM: ${err}`);
      });
  }

