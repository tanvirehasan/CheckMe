chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setIcon" && request.country) {
    fetch(`https://flagcdn.com/32x32/${request.country.toLowerCase()}.png`)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          chrome.action.setIcon({ imageData: drawIconFromBase64(reader.result) });
        };
        reader.readAsDataURL(blob);
      });
    sendResponse();
  }
});

function drawIconFromBase64(dataUrl) {
  let img = new Image();
  img.src = dataUrl;
  let canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 32, 32);
  ctx.drawImage(img, 0, 0, 32, 32);
  return ctx.getImageData(0, 0, 32, 32);
}
