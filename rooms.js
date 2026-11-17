document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const universityFilter = document.getElementById('universityFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  const genderFilter = document.getElementById('genderFilter');
  const priceFilter = document.getElementById('priceFilter');
  const sortFilter = document.getElementById('sortFilter');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const emptyResetBtn = document.getElementById('emptyResetBtn');

  const roomsGrid = document.getElementById('roomsGrid');
  const resultsCount = document.getElementById('resultsCount');
  const noResultsMessage = document.getElementById('noResultsMessage');

  const originalCards = Array.from(document.querySelectorAll('.room-card'));

  function updateRooms() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedUni = universityFilter.value;
    const selectedCat = categoryFilter.value;
    const selectedGender = genderFilter.value;
    const maxPriceInput = priceFilter.value;
    const sortOrder = sortFilter.value;

    let sortedCards = [...originalCards];
    if (sortOrder === 'price-asc') {
      sortedCards.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    } else if (sortOrder === 'price-desc') {
      sortedCards.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    }

    sortedCards.forEach(card => roomsGrid.appendChild(card));

    let visibleCount = 0;

    sortedCards.forEach(card => {
      const cardText = card.textContent.toLowerCase();
      const cardPrice = parseInt(card.dataset.price, 10);
      const cardGender = card.dataset.gender;

      const matchesSearch = query === '' || cardText.includes(query);
      const matchesUni = selectedUni === 'all' || card.classList.contains(selectedUni);
      const matchesCat = selectedCat === 'all' || card.classList.contains(selectedCat);
      const matchesGender = selectedGender === 'all' || cardGender === selectedGender;
      const matchesPrice = maxPriceInput === 'all' || cardPrice <= parseInt(maxPriceInput, 10);

      const isVisible = matchesSearch && matchesUni && matchesCat && matchesGender && matchesPrice;

      card.classList.toggle('hidden', !isVisible);
      if (isVisible) visibleCount++;
    });

    resultsCount.textContent = `Showing ${visibleCount} of ${originalCards.length} verified rooms`;
    noResultsMessage.classList.toggle('hidden', visibleCount > 0);
  }
  function resetAllFilters() {
    searchInput.value = '';
    universityFilter.value = 'all';
    categoryFilter.value = 'all';
    genderFilter.value = 'all';
    priceFilter.value = 'all';
    sortFilter.value = 'default';
    updateRooms();
  }

  searchInput.addEventListener('input', updateRooms);
  universityFilter.addEventListener('change', updateRooms);
  categoryFilter.addEventListener('change', updateRooms);
  genderFilter.addEventListener('change', updateRooms);
  priceFilter.addEventListener('change', updateRooms);
  sortFilter.addEventListener('change', updateRooms);
  resetFiltersBtn.addEventListener('click', resetAllFilters);
  emptyResetBtn.addEventListener('click', resetAllFilters);

  const params = new URLSearchParams(window.location.search);
  if (params.has('uni') && universityFilter.querySelector(`option[value="${params.get('uni')}"]`)) {
    universityFilter.value = params.get('uni');
  }

  updateRooms();
});
