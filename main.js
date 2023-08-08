import { detecType, setStorage, detecIcon } from "./helpers.js";

//! HTML'den gelenler
const form = document.querySelector("form");
const list = document.querySelector("ul");
//! Olay İzleyicileri
form.addEventListener("submit", handleSubmit);
list.addEventListener("click", handleClick);

//! Ortak Kullanım Alanı
var map;
var notes = JSON.parse(localStorage.getItem("notes")) || [];
var coords = [];
var layerGroup = [];

console.log(notes);
//* Kullanıcının konumunu öğrenme
navigator.geolocation.getCurrentPosition(
  loadMap,
  console.log("Kullanıcı kabul etmedi")
);

//* Haritaya tıklanınca çalışır.
function onMapClick(e) {
  form.style.display = "flex";
  coords = [e.latlng.lat, e.latlng.lng];
}

//* Kullanıcının konumuna göre ekrana haritayı gösterme
function loadMap(e) {
  // Haritanın kurulumu
  map = new L.map("map").setView([e.coords.latitude, e.coords.longitude], 10);
  L.control;
  // Haritanın nasıl gözükeceğini belirler
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  // Harita da ekrana basılacak imleçleri tutacağımız katman
  layerGroup = L.layerGroup().addTo(map);

  // Local'den gelen notesları listeleme
  renderNoteList(notes);
  // Haritada bir tıklanma olduğunda çalışacak fonksiyon
  map.on("click", onMapClick);
}

//* Ekrana marker basma
function renderMarker(item) {
  // Marker ı oluşturur
  L.marker(item.coords, { icon: detecIcon(item.status) })
    // imleçlerin olduğu katmana ekler
    .addTo(layerGroup)
    // üzerine tıklanınca açılacak popup ekleme
    .bindPopup(`${item.desc}`);
}

//* Formun gönderilmesi olayını çalışır
function handleSubmit(e) {
  e.preventDefault();
  const desc = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;
  // notes dizisine eleman ekleme
  notes.push({ id: new Date().getTime(), desc, date, status, coords });
  // Local storage güncelle
  setStorage(notes);
  // renderNoteList fonksiyonuna notes dizisini gönderdik
  renderNoteList(notes);
  // Formu kapatma
  form.style.display = "none";
}

//* Ekrana notları basma
function renderNoteList(item) {
  // Notlar alanını temizler
  list.innerHTML = "";
  // Markerlerı temizler
  layerGroup.clearLayers();
  // Her bir not için fonksiyon çalışır
  item.forEach((item) => {
    const listElement = document.createElement("li");
    // data'sına sahip olduğu  id'yi ekleme
    listElement.dataset.id = item.id;
    listElement;
    listElement.innerHTML = `
        <div>
          <p>${item.desc}</p>
          <p><span>Tarih:</span> ${item.date}</p>
          <p><span>Durum:</span> ${detecType(item.status)}</p>
        </div>
       
        <i id="delete" class="bi bi-x"></i>
        <i id="fly" class="bi bi-airplane-fill"></i>
      
    `;
    list.insertAdjacentElement("afterbegin", listElement);

    // Ekrana marker bas
    renderMarker(item);
  });
}

//* Notes alanında tıklanma olayını izle
function handleClick(e) {
  // güncellenecek elemanın id'sini öğrenme
  const id = e.target.parentElement.dataset.id;
  if (e.target.id === "delete") {
    // id'sini bildiğimiz elemanı diziden kaldırma
    notes = notes.filter((note) => note.id != id);

    // local'i güncelle
    setStorage(notes);

    // Ekranı güncelle
    renderNoteList(notes);
  }

  if (e.target.id === "fly") {
    const note = notes.find((note) => note.id == id);
    map.flyTo(note.coords);
  }
}
