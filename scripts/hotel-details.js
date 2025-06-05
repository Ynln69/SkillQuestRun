const urlParams = new URLSearchParams(window.location.search);
const hotelId = parseInt(urlParams.get("id"));

const hotel = hotels.find((h) => h.id === hotelId);

if (hotel) {
  // Hero
  document.querySelector(".hotel-name").textContent = hotel.name;
  document.querySelector(".hotel-stars").innerHTML = "★".repeat(hotel.stars);
  const imagePath = window.location.pathname.includes("/pages/")
    ? `../${hotel.image}`
    : hotel.image;
  document.querySelector(".hotel-image").src = imagePath;

  // Опис
  document.querySelector(".hotel-heading").textContent = hotel.name;
  const descriptionContainer = document.querySelector(
    ".hotel-description-text"
  );
  hotel.description.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    descriptionContainer.appendChild(p);
  });

  // Extras
  const extrasList = document.querySelector(".extras-list");
  hotel.extras.forEach((extra) => {
    const li = document.createElement("li");
    li.textContent = extra;
    extrasList.appendChild(li);
  });

  // Check-in / Check-out
  document.querySelector(".check-in").textContent = hotel.checkIn;
  document.querySelector(".check-out").textContent = hotel.checkOut;

  // Amenities
  const amenitiesList = document.querySelector(".amenities-list");
  hotel.amenities.forEach((amenity) => {
    const li = document.createElement("li");
    li.textContent = amenity;
    amenitiesList.appendChild(li);
  });
} else {
  document.querySelector("main").innerHTML = "<p>Hotel not found.</p>";
}
