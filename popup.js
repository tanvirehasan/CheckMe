document.addEventListener('DOMContentLoaded', async () => {
  const ipElem = document.getElementById('ip');
  const locationElem = document.getElementById('location');
  const mapDiv = document.getElementById('map');

  try {
    const res = await fetch('https://ipinfo.io/json?token=6ad76d4f06e977');
    if (!res.ok) throw new Error("Network Error");
    const data = await res.json();
    ipElem.textContent = `IP: ${data.ip}`;
    if (data.city && data.region && data.country) {
      locationElem.textContent = `${data.city}, ${data.region}, ${data.country}`;
    } else if (data.loc) {
      locationElem.textContent = data.loc;
    }
    // Show map if location is available
    if (data.loc) {
      const [latitude, longitude] = data.loc.split(',');
      // Note: bbox: left, bottom, right, top (longitude/latitude)
      const left = parseFloat(longitude) - 0.03;
      const bottom = parseFloat(latitude) - 0.03;
      const right = parseFloat(longitude) + 0.03;
      const top = parseFloat(latitude) + 0.03;
      mapDiv.innerHTML =
        `<iframe 
          width="100%" 
          height="120" 
          frameborder="0"
          style="border:0; border-radius:8px;"
          src="https://www.openstreetmap.org/export/embed.html?bbox=${left},${bottom},${right},${top}&layer=mapnik&marker=${latitude},${longitude}">
        </iframe>`;
    } else {
      mapDiv.innerHTML = "";
    }
  } catch (e) {
    ipElem.textContent = "Could not fetch IP/location";
    locationElem.textContent = "";
    mapDiv.innerHTML = "";
  }
});
