document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const universityFilter = document.getElementById("universityFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const genderFilter = document.getElementById("genderFilter");
  const priceFilter = document.getElementById("priceFilter");
  const sortFilter = document.getElementById("sortFilter");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  const emptyResetBtn = document.getElementById("emptyResetBtn");

  const roomsGrid = document.getElementById("roomsGrid");
  const resultsCount = document.getElementById("resultsCount");
  const noResultsMessage = document.getElementById("noResultsMessage");

  const originalCards = Array.from(document.querySelectorAll(".room-card"));

  function updateRooms() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedUni = universityFilter.value;
    const selectedCat = categoryFilter.value;
    const selectedGender = genderFilter.value;
    const maxPriceInput = priceFilter.value;
    const sortOrder = sortFilter.value;

    let sortedCards = [...originalCards];
    if (sortOrder === "price-asc") {
      sortedCards.sort(
        (a, b) => Number(a.dataset.price) - Number(b.dataset.price),
      );
    } else if (sortOrder === "price-desc") {
      sortedCards.sort(
        (a, b) => Number(b.dataset.price) - Number(a.dataset.price),
      );
    }

    sortedCards.forEach((card) => roomsGrid.appendChild(card));

    let visibleCount = 0;

    sortedCards.forEach((card) => {
      const cardText = card.textContent.toLowerCase();
      const cardPrice = parseInt(card.dataset.price, 10);
      const cardGender = card.dataset.gender;

      const matchesSearch = query === "" || cardText.includes(query);
      const matchesUni =
        selectedUni === "all" || card.classList.contains(selectedUni);
      const matchesCat =
        selectedCat === "all" || card.classList.contains(selectedCat);
      const matchesGender =
        selectedGender === "all" || cardGender === selectedGender;
      const matchesPrice =
        maxPriceInput === "all" || cardPrice <= parseInt(maxPriceInput, 10);

      const isVisible =
        matchesSearch &&
        matchesUni &&
        matchesCat &&
        matchesGender &&
        matchesPrice;

      card.classList.toggle("hidden", !isVisible);
      if (isVisible) visibleCount++;
    });

    resultsCount.textContent = `Showing ${visibleCount} of ${originalCards.length} verified rooms`;
    noResultsMessage.classList.toggle("hidden", visibleCount > 0);
  }

  function resetAllFilters() {
    searchInput.value = "";
    universityFilter.value = "all";
    categoryFilter.value = "all";
    genderFilter.value = "all";
    priceFilter.value = "all";
    sortFilter.value = "default";
    updateRooms();
  }

  searchInput.addEventListener("input", updateRooms);
  universityFilter.addEventListener("change", updateRooms);
  categoryFilter.addEventListener("change", updateRooms);
  genderFilter.addEventListener("change", updateRooms);
  priceFilter.addEventListener("change", updateRooms);
  sortFilter.addEventListener("change", updateRooms);
  resetFiltersBtn.addEventListener("click", resetAllFilters);
  emptyResetBtn.addEventListener("click", resetAllFilters);

  const params = new URLSearchParams(window.location.search);
  if (
    params.has("uni") &&
    universityFilter.querySelector(`option[value="${params.get("uni")}"]`)
  ) {
    universityFilter.value = params.get("uni");
  }

  updateRooms();

  // ===== ROOM DETAILS OVERLAY & 4-PHOTO GALLERY (ROOMS 1 & 2) =====
  const roomModal = document.getElementById("roomDetailsModal");
  const modalRoomImage = document.getElementById("modalRoomImage");
  const modalThumbnails = document.getElementById("modalThumbnails");
  const galleryCounter = document.getElementById("galleryCounter");
  const galleryPrevBtn = document.getElementById("galleryPrevBtn");
  const galleryNextBtn = document.getElementById("galleryNextBtn");

  const modalRoomPrice = document.getElementById("modalRoomPrice");
  const modalRoomTitle = document.getElementById("modalRoomTitle");
  const modalRoomLocation = document.getElementById("modalRoomLocation");
  const modalRoomOverview = document.getElementById("modalRoomOverview");
  const modalRoomSpecs = document.getElementById("modalRoomSpecs");
  const modalRoomPolicies = document.getElementById("modalRoomPolicies");
  const modalInquireLink = document.getElementById("modalInquireLink");
  const modalRegistryFooter = document.getElementById("modalRegistryFooter");

  const closeRoomModalX = document.getElementById("closeRoomModalX");
  const closeRoomModalBtn = document.getElementById("closeRoomModalBtn");

  const allRoomsDetails = {
    1: {
      price: "₱5,500 / month fixed rate",
      title: "Private Attic Solo Room",
      location: "📍 New Lucban, Baguio City (Near SLU Main Campus)",
      overview:
        "A quiet, highly insulated private attic loft designed specifically for single occupants. Features windows structurally positioned to receive optimal morning sunlight, actively preventing the dampness and mold common to high-elevation properties in Baguio.",
      specs: [
        "🔑 Solo Occupancy Only",
        "🚿 Hot Shower Installed",
        "☀️ High Natural Sunlight",
        "📶 Free Fiber Wi-Fi",
        "🔒 No Curfew Gates",
      ],
      policies: [
        "No cooking inside the attic bedroom; please utilize the shared second-floor kitchen workspace. Quiet hours are strictly monitored starting at 10:00 PM.",
      ],
      registryDate: "November 6, 2026",
      photos: [
        "assets/images/privateAtticRoom.jpg",
        "assets/images/privateAtticRoomBathroom.jpg",
        "assets/images/privateAtticRoomSpace.jpg",
        "assets/images/privateAtticRoomStudy.png",
      ],
    },
    2: {
      price: "₱12,000 / month complete room rate",
      title: "Whole Quad-Dorm Room (Barkada Unit)",
      location:
        "📍 Bonifacio Street, Baguio City (3-minute walk to SLU Main Gate)",
      overview:
        "A group-friendly dormitory space designed for matching roommates or provincial barkadas moving together. Rather than splitting contracts, the landlord rents this space as a whole unit to optimize group savings and ensure you stay together with friends you trust.",
      specs: [
        "👨‍👩‍👦‍👦 Max 4 Pax Capacity",
        "🛏 4 Bunkbeds Provided",
        "🚿 Centralized Shower Heater",
        "🔒 10:00 PM Strict Curfew",
        "⚡ Sub-metered Electricity",
      ],
      policies: [
        "Rent rate excludes water and electricity bills. This unit operates under local student safety ordinances enforcing strict curfew lockdowns. Main gates lock automatically at 10:00 PM.",
      ],
      registryDate: "November 6, 2026",
      photos: [
        "assets/images/wholeQuadRoom.png",
        "assets/images/wholeQuadRoomStudyArea.png",
        "assets/images/wholeQuadRoomStudyAreaAngle2.png",
        "assets/images/wholeQuadRoomBathroom.png",
      ],
    },

    3: {
      price: "₱3,200 / month per head rate",
      title: "Male Bedspace Slots Available",
      location:
        "📍 Gov. Pack Road, Baguio City (Walking distance to UC and SM Baguio)",
      overview:
        "Highly accessible shared bedspace units tailored for low-budget male student migrants. Located right in the commercial hub of Gov. Pack Road, reducing urban transit poverty down to zero commuting steps while keeping you connected to major school networks.",
      specs: [
        "👥 Shared Bedspace Layout",
        "💧 Utilities Base Included",
        "📶 Shared Wi-Fi Accessible",
        "🚶 Near Transit Terminal",
        "🔑 Personal Lockers Provided",
      ],
      policies: [
        "Strictly for male students currently enrolled in local institutions. Curfew is set at 10:00 PM. Guests are restricted to the ground-floor reception areas for structural safety.",
      ],
      registryDate: "November 5, 2026",
      photos: [
        "assets/images/maleBedspaceSlots.jpg",
        "assets/images/maleBedspaceSlotsLivingRoom.jpg",
        "assets/images/maleBedspaceSlotsKitchen.jpg",
        "assets/images/maleBedspaceSlotsYard.jpg",
      ],
    },

    4: {
      price: "₱7,500 / month standalone rate",
      title: "Solo Studio Apartment Unit",
      location:
        "📍 General Luna Road, Baguio City (4-minute walk to UB Campus)",
      overview:
        "A private, unshared studio apartment offering maximum independence. Includes an integrated kitchenette layout, enabling independent meal preparation to counter the costs of commercial food joints.",
      specs: [
        "🔑 Solo Occupancy Only",
        "🍳 Kitchenette/Cooking Allowed",
        "🚿 Hot Shower Unit",
        "🔒 No Curfew Hours",
        "⚡ Independent Sub-meters",
      ],
      policies: [
        "Tenants manage their independent utility bills using separate sub-meters. Only electronic induction cooktops are permitted inside the unit.",
      ],
      registryDate: "November 6, 2026",
      photos: [
        "assets/images/soloStudioApartment.jpg",
        "assets/images/soloStudioApartmentDiningArea.webp",
        "assets/images/soloStudioApartmentKitchen.webp",
        "assets/images/soloStudioApartmentBed.webp",
      ],
    },

    5: {
      price: "₱4,500 / month per head rate",
      title: "Twin Sharing Room for Female Students",
      location:
        "📍 Assumption Road, Baguio City (Walking access to UB and SLU)",
      overview:
        "A highly secure twin sharing space optimized for sisters, relatives, or close friends. Includes pre-installed study alcoves and separate desk setups, creating a quiet, productive learning environment outside the university library.",
      specs: [
        "👥 Max 2 Female Tenants",
        "✍️ 2 Study Desks Pre-fit",
        "🚿 Hot Shower Unit",
        "🔒 10:00 PM Main Gate Lock",
        "📶 High-Speed Shared Wi-Fi",
      ],
      policies: [
        "Strictly a female-only housing block. Male visitors are restricted from entering the upper residential floors to preserve student security, focus, and layout privacy.",
      ],
      registryDate: "November 4, 2026",
      photos: [
        "assets/images/twinSharingRoom.jpg",
        "assets/images/twinSharingRoomAngle2.webp",
        "assets/images/twinSharingRoomAngle3.webp",
        "assets/images/twinSharingRoomLaundry.jpg",
      ],
    },

    6: {
      price: "₱6,000 / month standalone rate",
      title: "Cozy Private Room with Balcony",
      location:
        "📍 Military Cut-Off, Baguio City (1 Jeepney Ride to UC Campus)",
      overview:
        "A premium private bedroom located in a quiet residential district. Features an individual sliding glass door balcony that maximizes ambient natural light and allows for excellent moisture ventilation to handle cold Baguio weather fronts.",
      specs: [
        "🔑 Solo Occupancy Only",
        "🌅 Attached Airing Balcony",
        "☀️ High Natural Light",
        "🚿 Hot Shower Included",
        "🚌 Near Public Jeep Line",
      ],
      policies: [
        "Ideal for graduate or thesis-writing students needing zero internal background noise. Laundering items must be air-dried strictly on the balcony rack systems to prevent indoor dampness.",
      ],
      registryDate: "November 6, 2026",
      photos: [
        "assets/images/cozyPrivateRoomWithBalcony.jpg",
        "assets/images/cozyPrivateRoomWithBalconyBed.jpg",
        "assets/images/cozyPrivateRoomWithBalconyCloset.jpg",
        "assets/images/cozyPrivateRoomWithBalconyKitchen.jpg",
      ],
    },
  };

  let currentPhotos = [];
  let currentPhotoIndex = 0;

  function showGalleryPhoto(index) {
  if (typeof resetImagePanZoom === "function") resetImagePanZoom();
  if (!currentPhotos.length) return;
  currentPhotoIndex = (index + currentPhotos.length) % currentPhotos.length;

  modalRoomImage.src = currentPhotos[currentPhotoIndex];
  galleryCounter.textContent = `${currentPhotoIndex + 1} / ${currentPhotos.length}`;

  modalThumbnails.querySelectorAll(".modal-thumb-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx === currentPhotoIndex);
  });
}

  function loadRoomGallery(photoList, fallbackCardImg) {
    const safeFallback = fallbackCardImg || "assets/images/BackgroundIntro.jpg";
    currentPhotos = photoList.map((src, i) =>
      i === 0 && fallbackCardImg ? fallbackCardImg : src,
    );

    modalRoomImage.onerror = () => {
      modalRoomImage.src = safeFallback;
    };

    modalThumbnails.innerHTML = "";
    currentPhotos.forEach((src, index) => {
      const thumbBtn = document.createElement("button");
      thumbBtn.type = "button";
      thumbBtn.className = "modal-thumb-btn";
      thumbBtn.innerHTML = `<img src="${src}" alt="Room snapshot ${index + 1}" onerror="this.src='${safeFallback}'">`;
      thumbBtn.addEventListener("click", () => showGalleryPhoto(index));
      modalThumbnails.appendChild(thumbBtn);
    });

    showGalleryPhoto(0);
  }

  function openRoomModal(roomId, cardImgSrc) {
    const room = allRoomsDetails[roomId];
    if (!room || !roomModal) return;

    if (modalRoomPrice) modalRoomPrice.textContent = room.price;
    if (modalRoomTitle) modalRoomTitle.textContent = room.title;
    if (modalRoomLocation) modalRoomLocation.textContent = room.location;
    if (modalRoomOverview) modalRoomOverview.textContent = room.overview;

    if (modalRoomSpecs) {
      modalRoomSpecs.innerHTML = room.specs
        .map((spec) => `<span class="spec-pill">${spec}</span>`)
        .join("");
    }

    if (modalRoomPolicies) {
      modalRoomPolicies.innerHTML = room.policies
        .map((policy) => `<li>${policy}</li>`)
        .join("");
    }

    if (modalInquireLink) modalInquireLink.href = `verify.html?room=${roomId}`;
    if (modalRegistryFooter) {
      modalRegistryFooter.textContent = `🛡 Registry confirmation logged by website administration on file: ${room.registryDate}.`;
    }

    loadRoomGallery(room.photos, cardImgSrc);

    roomModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeRoomModal() {
    if (!roomModal) return;
    roomModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  // Connects "View Details" on all cards (works automatically as we add Rooms 3–6)
  originalCards.forEach((card, index) => {
    const roomId = card.dataset.id || String(index + 1);
    const cardImg = card.querySelector("img")?.getAttribute("src");
    const triggers = card.querySelectorAll("a, button");

    triggers.forEach((btn) => {
      if (btn.textContent.toLowerCase().includes("view details")) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          openRoomModal(roomId, cardImg);
        });
      }
    });
  });

  galleryPrevBtn?.addEventListener("click", () =>
    showGalleryPhoto(currentPhotoIndex - 1),
  );
  galleryNextBtn?.addEventListener("click", () =>
    showGalleryPhoto(currentPhotoIndex + 1),
  );
  closeRoomModalX?.addEventListener("click", closeRoomModal);
  closeRoomModalBtn?.addEventListener("click", closeRoomModal);
  roomModal?.addEventListener("click", (e) => {
    if (e.target === roomModal) closeRoomModal();
  });
  document.addEventListener("keydown", (e) => {
    if (roomModal?.classList.contains("hidden")) return;
    if (e.key === "Escape") closeRoomModal();
    if (e.key === "ArrowLeft") showGalleryPhoto(currentPhotoIndex - 1);
    if (e.key === "ArrowRight") showGalleryPhoto(currentPhotoIndex + 1);
  });

    // ===== INTERACTIVE IMAGE PAN & ZOOM (INSPECT DETAILS) =====
  const galleryMainFrame = document.getElementById('galleryMainFrame');
  const zoomHintBadge = document.getElementById('zoomHintBadge');

  let zoomScale = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let hasDragged = false;
  let startX = 0;
  let startY = 0;

  function applyImageTransform() {
    if (!modalRoomImage || !galleryMainFrame) return;

    if (zoomScale <= 1) {
      panX = 0;
      panY = 0;
      modalRoomImage.classList.remove('is-zoomed', 'is-dragging');
      if (zoomHintBadge) zoomHintBadge.textContent = '🔍 Click image to zoom & drag';
    } else {
      // Clamp pan so image edges stay inside the frame
      const maxX = (galleryMainFrame.clientWidth * (zoomScale - 1)) / 2;
      const maxY = (galleryMainFrame.clientHeight * (zoomScale - 1)) / 2;
      panX = Math.max(-maxX, Math.min(maxX, panX));
      panY = Math.max(-maxY, Math.min(maxY, panY));

      modalRoomImage.classList.add('is-zoomed');
      if (zoomHintBadge) zoomHintBadge.textContent = '✋ Drag to pan • Click to reset';
    }

    modalRoomImage.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomScale})`;
  }

  function resetImagePanZoom() {
    zoomScale = 1;
    panX = 0;
    panY = 0;
    isDragging = false;
    hasDragged = false;
    applyImageTransform();
  }

  // Click to toggle zoom (2.2x)
  modalRoomImage?.addEventListener('click', (e) => {
    if (hasDragged) {
      hasDragged = false;
      return;
    }

    if (zoomScale === 1) {
      const rect = galleryMainFrame.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      zoomScale = 2.2;
      panX = -offsetX * 0.8;
      panY = -offsetY * 0.8;
    } else {
      zoomScale = 1;
    }
    applyImageTransform();
  });

  // Mouse wheel zoom (optional smooth zoom between 1x and 3x)
  galleryMainFrame?.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.35 : -0.35;
    zoomScale = Math.max(1, Math.min(3, Number((zoomScale + delta).toFixed(2))));
    applyImageTransform();
  }, { passive: false });

  // Drag to pan with cursor
  modalRoomImage?.addEventListener('mousedown', (e) => {
    if (zoomScale <= 1) return;
    e.preventDefault();
    isDragging = true;
    hasDragged = false;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
    modalRoomImage.classList.add('is-dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    hasDragged = true;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    applyImageTransform();
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    modalRoomImage?.classList.remove('is-dragging');
  });

});
