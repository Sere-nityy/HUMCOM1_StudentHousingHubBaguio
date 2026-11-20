document.addEventListener("DOMContentLoaded", () => {
  const listings = [
    {
      id: "1",
      title: "Private Attic Solo Room",
      loc: "New Lucban, Baguio City",
      uni: "SLU",
      price: 5500,
      rateLabel: "₱5,500 / mo",
    },
    {
      id: "2",
      title: "Whole Quad-Dorm Room (Barkada Unit)",
      loc: "Bonifacio Street, Baguio City",
      uni: "SLU",
      price: 12000,
      rateLabel: "₱12,000 / mo",
    },
    {
      id: "3",
      title: "Male Bedspace Slots Available",
      loc: "Gov. Pack Road, Baguio City",
      uni: "UC",
      price: 3200,
      rateLabel: "₱3,200 / head",
    },
    {
      id: "4",
      title: "Solo Studio Apartment Unit",
      loc: "General Luna Road, Baguio City",
      uni: "UB",
      price: 7500,
      rateLabel: "₱7,500 / mo",
    },
    {
      id: "5",
      title: "Twin Sharing Room for Female Students",
      loc: "Assumption Road, Baguio City",
      uni: "UB / SLU",
      price: 4500,
      rateLabel: "₱4,500 / head",
    },
    {
      id: "6",
      title: "Cozy Private Room with Balcony",
      loc: "Military Cut-Off, Baguio City",
      uni: "UC",
      price: 6000,
      rateLabel: "₱6,000 / mo",
    },
  ];

  const roomBanner = document.getElementById("roomBanner");
  const roomPickerBox = document.getElementById("roomPickerBox");
  const roomSearchInput = document.getElementById("roomSearchInput");
  const roomSearchResults = document.getElementById("roomSearchResults");
  const changeRoomBtn = document.getElementById("changeRoomBtn");
  const submitBtn = document.getElementById("submitBtn");

  const roomBadgeLabel = document.getElementById("roomBadgeLabel");
  const selectedRoomTitle = document.getElementById("selectedRoomTitle");
  const selectedRoomPrice = document.getElementById("selectedRoomPrice");

  const hiddenId = document.getElementById("targetRoomId");
  const hiddenName = document.getElementById("targetRoomName");
  const hiddenPrice = document.getElementById("targetRoomPrice");

  function selectRoom(room) {
    const fullTitle = `${room.title} — ${room.loc}`;
    roomBadgeLabel.textContent = `Selected Property (#${room.id})`;
    selectedRoomTitle.textContent = fullTitle;
    selectedRoomPrice.textContent = room.rateLabel;

    hiddenId.value = room.id;
    hiddenName.value = fullTitle;
    hiddenPrice.value = room.rateLabel;

    roomBanner.classList.remove("hidden");
    roomPickerBox.classList.add("hidden");
    submitBtn.disabled = false;
  }

  function renderSearchResults(query = "") {
    const q = query.trim().toLowerCase();
    const filtered = listings.filter(
      (room) =>
        room.title.toLowerCase().includes(q) ||
        room.loc.toLowerCase().includes(q) ||
        room.uni.toLowerCase().includes(q) ||
        room.id === q.replace("#", ""),
    );

    roomSearchResults.innerHTML = "";

    if (filtered.length === 0) {
      roomSearchResults.innerHTML =
        '<p class="no-room-match">No matching rooms found. Try another street or university.</p>';
      return;
    }

    filtered.forEach((room) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "room-option-btn";
      btn.innerHTML = `
        <div>
          <strong>#${room.id} — ${room.title}</strong>
          <small>📍 ${room.loc} (${room.uni})</small>
        </div>
        <span class="room-option-price">${room.rateLabel}</span>
      `;
      btn.addEventListener("click", () => selectRoom(room));
      roomSearchResults.appendChild(btn);
    });
  }
  const params = new URLSearchParams(window.location.search);
  const paramId = params.get("room");
  const matchedRoom = listings.find((r) => r.id === paramId);

  if (matchedRoom) {
    selectRoom(matchedRoom);
  } else {
    renderSearchResults("");
    submitBtn.disabled = true;
  }

  roomSearchInput.addEventListener("input", (e) => {
    renderSearchResults(e.target.value);
  });

  changeRoomBtn.addEventListener("click", () => {
    roomBanner.classList.add("hidden");
    roomPickerBox.classList.remove("hidden");
    roomSearchInput.value = "";
    renderSearchResults("");
    roomSearchInput.focus();
    submitBtn.disabled = true;
  });

  const inquiryForm = document.getElementById("inquiryForm");
  const confirmationBox = document.getElementById("confirmationBox");
  const confirmationSummary = document.getElementById("confirmationSummary");

  inquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("studentName").value.trim();
    const eduEmail = document.getElementById("eduEmail").value.trim();
    const contactEmail = document.getElementById("contactEmail").value.trim();
    const chosenRoom = hiddenName.value;

    confirmationSummary.innerHTML = `Thank you, <strong>${name}</strong>! Your institutional email (<strong>${eduEmail}</strong>) has been queued for admin verification, and your application for <strong>"${chosenRoom}"</strong> has been sent to the landlord.<br><br><strong>Next Step:</strong> No payment is due right now. Once the landlord reviews and formally accepts your inquiry, they will contact you via <strong>${contactEmail}</strong> with viewing and payment instructions.`;
    confirmationBox.classList.remove("hidden");
    confirmationBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});
