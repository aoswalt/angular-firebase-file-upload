angular.module("app", [])
  .config(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyDnwDqZiVYoz8OS1t8yYikfjEEfQAYbNZA",
      authDomain: "project-5923074717115769440.firebaseapp.com",
      databaseURL: "https://project-5923074717115769440.firebaseio.com",
      storageBucket: "project-5923074717115769440.appspot.com"
    });
  })

  .controller("UploadCtrl", function($timeout) {
    const up = this;
    up.heading = "Up the photos!";
    up.photoURLs = [];


    up.submit = () => {
      const input = document.querySelector(`[type="file"]`);
      const file = input.files[0];

      $timeout()
        .then(uploadFile(file, "123.jpg")
          .then(data => up.photoURLs.push(data.downloadURL))
          .then(input.value = ""));
    };
  });

function uploadFile(file, path) {
  const store = firebase.storage().ref();

  return new Promise((res, rej) => {
    const uploadTask = store.child(path).put(file);
    uploadTask.on("state_changed",
      null,
      rej,
      () => res(uploadTask.snapshot));
  });
}
