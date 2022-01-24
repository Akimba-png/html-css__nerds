const mapImageElement = document.querySelector(".contacts__map-image");

const MapOption = {
  CITY_CENTER_COORDINATES: [59.938466, 30.319356],
  ICON_COORDINATES: [59.938635, 30.323118],
  MAP_SCALE: 15,
  ICON_SIZES: [231, 190],
  ICON_ANCHORE_SIZES: [48, 190],
};

const map = L.map(
  "map",
  {
    zoomControl: false,
  })
  .on("load", () => {
    mapImageElement.style.display = "none"
  })
  .setView(MapOption.CITY_CENTER_COORDINATES, MapOption.MAP_SCALE);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const logoIcon = L.icon({
  iconUrl: "./../../img/logo-map.png",
  iconSize: MapOption.ICON_SIZES,
  iconAnchor: MapOption.ICON_ANCHORE_SIZES,
});

const marker = L.marker(MapOption.ICON_COORDINATES, {icon: logoIcon});
marker.addTo(map);
