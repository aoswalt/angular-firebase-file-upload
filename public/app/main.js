angular.module("app", [])
  .config(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyDnwDqZiVYoz8OS1t8yYikfjEEfQAYbNZA",
      authDomain: "project-5923074717115769440.firebaseapp.com",
      databaseURL: "https://project-5923074717115769440.firebaseio.com",
      storageBucket: "project-5923074717115769440.appspot.com"
    });
  })


  .controller("UploadCtrl", function(uploadFactory) {
    const up = this;
    up.heading = "Up the photos!";
    up.photoURLs = [];

    up.submit = () => {
      const input = document.querySelector(`[type="file"]`);
      const file = input.files[0];

      const randomInteger = Math.random() * 1e17;
      const getFileExtension = file.type.split("/").slice(-1)[0];
      const randomPath = `${randomInteger}.${getFileExtension}`;

      uploadFactory.send(file, randomPath)
        .then(data => {
          up.photoURLs.push(data.downloadURL);
          input.value = "";
          return data.downloadURL;
        }).then(url => firebase.database().ref("/images").push({url}));
    };
  })


  .factory("uploadFactory", ($timeout) => {
    const store = firebase.storage().ref();

    return {
      send: (file, path = file.name) =>
        $timeout().then(() => new Promise((res, rej) => {
          const uploadTask = store.child(path).put(file);
          uploadTask.on("state_changed",
            null,
            rej,
            () => res(uploadTask.snapshot));
        }))
    };
  });
