angular.module("app", [])
  .config(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyDnwDqZiVYoz8OS1t8yYikfjEEfQAYbNZA",
      authDomain: "project-5923074717115769440.firebaseapp.com",
      databaseURL: "https://project-5923074717115769440.firebaseio.com",
      storageBucket: "project-5923074717115769440.appspot.com"
    });
  })

  .controller("UploadCtrl", function() {
    const up = this;
    up.heading = "Up the photos!";

    up.submit = () => {
      const input = document.querySelector(`[type="file"]`);
      const file = input.files[0];
      console.dir(file);
    };
  });
