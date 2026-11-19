document.addEventListener('DOMContentLoaded', () => {
  const propertyForm = document.getElementById('propertyForm');
  const galleryPhotos = document.getElementById('galleryPhotos');
  const galleryPhotoCount = document.getElementById('galleryPhotoCount');
  const photoPreviewGrid = document.getElementById('photoPreviewGrid');
  const legalDocs = document.getElementById('legalDocs');
  const legalDocStatus = document.getElementById('legalDocStatus');

  // Prevent selecting both "Cooking Allowed" and "No Cooking Allowed"
  const cookingAmenity = document.querySelector('input[name="amenities"][value="Cooking Allowed"]');
  const noCookingRestriction = document.getElementById('restrictNoCooking');

  cookingAmenity.addEventListener('change', () => {
    if (cookingAmenity.checked) noCookingRestriction.checked = false;
  });

  noCookingRestriction.addEventListener('change', () => {
    if (noCookingRestriction.checked) cookingAmenity.checked = false;
  });

  // Enforce exact 4 photos requirement + render live image thumbnails
  galleryPhotos.addEventListener('change', () => {
    const files = Array.from(galleryPhotos.files);
    const count = files.length;

    galleryPhotoCount.classList.remove('valid', 'error');
    photoPreviewGrid.innerHTML = '';

    if (count === 4) {
      galleryPhotoCount.textContent = '✓ 4 of 4 photos selected (Ready)';
      galleryPhotoCount.classList.add('valid');
    } else if (count === 0) {
      galleryPhotoCount.textContent = '0 of 4 photos selected';
      photoPreviewGrid.classList.add('hidden');
      return;
    } else {
      galleryPhotoCount.textContent = `⚠ ${count} selected — please select exactly 4 photos`;
      galleryPhotoCount.classList.add('error');
    }

    photoPreviewGrid.classList.remove('hidden');
    files.slice(0, 4).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const item = document.createElement('div');
        item.className = 'photo-preview-item';
        item.innerHTML = `
          <img src="${e.target.result}" alt="Room preview ${index + 1}">
          <span class="photo-preview-tag">Photo ${index + 1}</span>
        `;
        photoPreviewGrid.appendChild(item);
      };
      reader.readAsDataURL(file);
    });
  });
  // Legal docs feedback
  legalDocs.addEventListener('change', () => {
    const count = legalDocs.files.length;
    legalDocStatus.classList.remove('valid');

    if (count > 0) {
      legalDocStatus.textContent = `✓ ${count} verification file(s) attached`;
      legalDocStatus.classList.add('valid');
    } else {
      legalDocStatus.textContent = 'No verification documents attached';
    }
  });

  // Handle submission & redirect to separate confirmation page
  propertyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (galleryPhotos.files.length !== 4) {
      alert('Please upload exactly 4 high-resolution room photos before submitting.');
      galleryPhotos.focus();
      return;
    }

    const rateSelect = document.getElementById('rateType');
    const rateLabel = rateSelect.value === 'head' ? '/ month per head' : rateSelect.value === 'fixed' ? '/ month fixed' : '/ month';

    const universitySelect = document.getElementById('targetUniversity');
    const genderSelect = document.getElementById('tenantGender');
    const occupancySelect = document.getElementById('occupancyRestriction');
    const curfewSelect = document.getElementById('curfewPolicy');

    const listingData = {
      landlordName: document.getElementById('landlordName').value.trim(),
      listingTitle: document.getElementById('listingTitle').value.trim(),
      address: document.getElementById('propertyAddress').value.trim(),
      rent: Number(document.getElementById('monthlyRent').value).toLocaleString('en-PH'),
      rateLabel,
      university: universitySelect.options[universitySelect.selectedIndex].text,
      distance: document.getElementById('campusDistance').value.trim(),
      occupancy: occupancySelect.options[occupancySelect.selectedIndex].text,
      gender: genderSelect.options[genderSelect.selectedIndex].text,
      curfew: curfewSelect.options[curfewSelect.selectedIndex].text,
      email: document.getElementById('landlordEmail').value.trim(),
      mobile: document.getElementById('landlordMobile').value.trim(),
      customRules: document.getElementById('customRules').value.trim(),
      amenities: Array.from(document.querySelectorAll('input[name="amenities"]:checked')).map(cb => cb.value),
      restrictions: Array.from(document.querySelectorAll('input[name="restrictions"]:checked')).map(cb => cb.value),
      legalDocCount: legalDocs.files.length
    };

    sessionStorage.setItem('submittedPropertyListing', JSON.stringify(listingData));
    window.location.href = 'register-property-submitted.html';
  });
});
