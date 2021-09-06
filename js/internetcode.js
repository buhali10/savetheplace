imagePicker.addEventListener('change', event => {
  let picture = event.target.files[0];
  blobToBase64(picture)
    .then(res => {
      let base64StringWithTag = res;
      base64String = base64StringWithTag.substr(base64StringWithTag.indexOf(',') + 1)
      console.log('base64String', base64String);
    }
    )
});

captureButton.addEventListener('click', event => {
  canvasElement.style.display = 'block';
  videoPlayer.style.display = 'none';
  captureButton.style.display = 'none';
  let context = canvasElement.getContext('2d');
  context.drawImage(videoPlayer, 0, 0, canvas.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width));
  videoPlayer.srcObject.getVideoTracks().forEach(track => {
    track.stop();
  });
  let picture = dataURItoBlob(canvasElement.toDataURL());
  console.log('picture', picture);
  blobToBase64(picture)
    .then(res => {
      let base64StringWithTag = res;
      base64String = base64StringWithTag.substr(base64StringWithTag.indexOf(',') + 1)
      console.log('base64String', base64String);
    }
    )
});

