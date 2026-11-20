document.addEventListener("DOMContentLoaded", () => {
  const summaryContainer = document.getElementById("listingSummaryContent");
  const rawData = sessionStorage.getItem("submittedPropertyListing");

  if (!rawData) {
    summaryContainer.innerHTML = `
      <p>Your property details and verification documents have been securely queued for admin review. Our Baguio verification team will contact you via email to schedule your on-site inspection.</p>
    `;
    return;
  }

  const data = JSON.parse(rawData);

  const amenitiesText =
    data.amenities && data.amenities.length
      ? data.amenities.join(", ")
      : "None selected";

  const restrictionsText =
    data.restrictions && data.restrictions.length
      ? data.restrictions.join(", ")
      : "None selected";
  summaryContainer.innerHTML = `
    <div class="summary-row">
      <strong>Landlord / Manager</strong>
      <span>${data.landlordName}</span>
    </div>
    <div class="summary-row">
      <strong>Listing Title</strong>
      <span>${data.listingTitle}</span>
    </div>
    <div class="summary-row">
      <strong>Property Address</strong>
      <span>${data.address}</span>
    </div>
    <div class="summary-row">
      <strong>Monthly Rate</strong>
      <span>₱${data.rent} ${data.rateLabel}</span>
    </div>
    <div class="summary-row">
      <strong>Target Campus &amp; Distance</strong>
      <span>${data.university} (${data.distance})</span>
    </div>
    <div class="summary-row">
      <strong>Occupancy &amp; Gender</strong>
      <span>${data.occupancy} • ${data.gender}</span>
    </div>
    <div class="summary-row">
      <strong>Curfew Policy</strong>
      <span>${data.curfew}</span>
    </div>
    <div class="summary-row">
      <strong>Included Amenities</strong>
      <span>${amenitiesText}</span>
    </div>
    <div class="summary-row">
      <strong>House Prohibitions</strong>
      <span>${restrictionsText}</span>
    </div>
    <div class="summary-row">
      <strong>Contact Details</strong>
      <span>${data.email} • ${data.mobile}</span>
    </div>
    <div class="summary-row">
      <strong>Uploaded Media &amp; Permits</strong>
      <span>4 Showcase Photos + ${data.legalDocCount} Legal Document(s)</span>
    </div>
  `;
});
