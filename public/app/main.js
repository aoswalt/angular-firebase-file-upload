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

    const store = firebase.storage().ref();

    up.submit = () => {
      const input = document.querySelector(`[type="file"]`);
      const file = input.files[0];
      const uploadTask = store.child("123.jpg").put(file);

      uploadTask.on("state_changed", null, console.error, () => {
        up.photoURLs.push(uploadTask.snapshot.downloadURL);
        input.value = "";
        $timeout();
      });
    };
  });
