document.addEventListener("DOMContentLoaded", () => {
  const hotelsSlider = document.getElementById("hotelsSlider");

  if (!hotelsSlider) {
    console.error("Slider element not found!");
    return;
  }

  const totalCards = hotels.length;
  const cardWidth = 260;
  let position = 0;

  hotels.forEach((hotel) => {
    const hotelCard = document.createElement("li");
    hotelCard.classList.add("hotel-card");
    hotelCard.innerHTML = `
      <div class="hotel-image">
        <img src="${hotel.image}" alt="${hotel.name}">
      </div>
      <div class="hotel-info">
        <span class="hotel-country">${hotel.location
          .split(",")
          .pop()
          .trim()}</span>
        <h3 class="hotel-name">${hotel.name}</h3>
        <div class="hotel-rating">
          <div class="stars">${"★".repeat(hotel.stars)}</div>
          <span class="rating-value">${hotel.rating} / 5</span>
        </div>
        <a href="./pages/hotel-details.html?id=${
          hotel.id
        }" class="view-details">View Details</a>
      </div>
    `;
    hotelsSlider.appendChild(hotelCard);
  });

  function calculateVisibleCards() {
    const width = window.innerWidth;
    if (width < 600) return 1;
    if (width < 834) return 2;
    if (width < 1200) return 3;
    return 4;
  }

  function getSliderWidth() {
    return document.querySelector(".slider-container").offsetWidth;
  }

  function getMaxPosition() {
    const visibleWidth = getSliderWidth();
    const totalWidth = totalCards * (cardWidth + 20);
    return Math.min(0, visibleWidth - totalWidth);
  }

  function slideNext() {
    const maxPosition = getMaxPosition();
    position -= cardWidth + 20;
    if (position < maxPosition) position = maxPosition;
    hotelsSlider.style.transform = `translateX(${position}px)`;
  }

  function slidePrev() {
    position += cardWidth + 20;
    if (position > 0) position = 0;
    hotelsSlider.style.transform = `translateX(${position}px)`;
  }

  window.addEventListener("resize", () => {
    position = 0;
    hotelsSlider.style.transform = `translateX(0px)`;
  });

  document.getElementById("nextBtn").addEventListener("click", slideNext);
  document.getElementById("prevBtn").addEventListener("click", slidePrev);
});
