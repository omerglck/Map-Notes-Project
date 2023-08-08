//* Tipi analiz edip ona göre fonksiyonun çağrıldığı yere tipe denk gelen açıklmayı gönderme
export const detecType = (type) => {
  switch (type) {
    case "park":
      return "Park Yeri";
    case "home":
      return "Ev";
    case "job":
      return "İş";
    case "goto":
      return "Ziyaret ";
  }
};

export const setStorage = (data) => {
  // Veriyi locale göndermek için stringe çevirme
  const strData = JSON.stringify(data);
  // Local storage güncelle
  localStorage.setItem("notes", strData);
};

var carIcon = L.icon({
  iconUrl: "car.png",

  iconSize: [50, 60], // size of the icon
});

var homeIcon = L.icon({
  iconUrl: "home-marker.png",

  iconSize: [50, 60], // size of the icon
});

var jobIcon = L.icon({
  iconUrl: "job.png",

  iconSize: [50, 60], // size of the icon
});

var visitIcon = L.icon({
  iconUrl: "visit.png",

  iconSize: [50, 60], // size of the icon
});

export function detecIcon(type) {
  switch (type) {
    case "park":
      return carIcon;
    case "home":
      return homeIcon;
    case "job":
      return jobIcon;
    case "goto":
      return visitIcon;
  }
}
