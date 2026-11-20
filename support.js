document.addEventListener("DOMContentLoaded", () => {
  // ===== 1. FAQ ACCORDION, CATEGORY TABS & LIVE SEARCH =====
  const faqTabs = document.querySelectorAll(".faq-tab");
  const faqItems = document.querySelectorAll(".faq-item");
  const faqSearchInput = document.getElementById("faqSearchInput");
  const faqEmptyState = document.getElementById("faqEmptyState");

  let activeCategory = "all";

  function filterFaqs() {
    const query = faqSearchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    faqItems.forEach((item) => {
      const categories = item.dataset.category || "";
      const text = item.textContent.toLowerCase();

      const matchesCategory =
        activeCategory === "all" || categories.includes(activeCategory);
      const matchesQuery = query === "" || text.includes(query);

      const isMatch = matchesCategory && matchesQuery;
      item.classList.toggle("hidden", !isMatch);
      if (isMatch) visibleCount++;
    });

    faqEmptyState.classList.toggle("hidden", visibleCount > 0);
  }

  faqTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      faqTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeCategory = tab.dataset.category;
      filterFaqs();
    });
  });

  faqSearchInput.addEventListener("input", filterFaqs);

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const toggleIcon = item.querySelector(".faq-toggle");

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.toggle("open");
      toggleIcon.textContent = isOpen ? "−" : "+";
    });
  });

  // ===== 2. SUPPORT TICKET & SCAM REPORT FORM =====
  const supportTicketForm = document.getElementById("supportTicketForm");
  const ticketConfirmationBox = document.getElementById(
    "ticketConfirmationBox",
  );
  const ticketRefCode = document.getElementById("ticketRefCode");
  const ticketConfirmationText = document.getElementById(
    "ticketConfirmationText",
  );

  supportTicketForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const role = document.getElementById("userRole").value;
    const category = document.getElementById("issueCategory").value;
    const name = document.getElementById("reporterName").value.trim();
    const contact = document.getElementById("reporterContact").value.trim();
    const randomNum = Math.floor(100 + Math.random() * 900);
    const refId = `SHH-2026-${randomNum}`;

    ticketRefCode.textContent = refId;
    ticketConfirmationText.innerHTML = `
      Thank you, <strong>${name}</strong> (${role}). Your report under <strong>"${category}"</strong> has been assigned reference number <strong>${refId}</strong>.<br><br>
      Our Baguio verification team will review your submission and send updates to <strong>${contact}</strong> within 24 hours.
    `;

    ticketConfirmationBox.classList.remove("hidden");
    ticketConfirmationBox.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
    supportTicketForm.reset();
  });
  // ===== 3. INTERACTIVE WEBSITE ERROR PREVIEW MODAL =====
  const errorData = {
    offline: {
      code: "📡 CONNECTION LOST",
      badgeClass: "badge-offline",
      icon: "📡",
      title: "Check Your Internet Connection",
      desc: "Your device lost connection to StudentHousingHub Baguio while loading room filters or property images.",
      steps: [
        "Toggle Airplane Mode on for 5 seconds, then turn it off.",
        "Switch between campus Wi-Fi and mobile data if signal is weak.",
        "Refresh the page once your connection is restored.",
      ],
    },
    404: {
      code: "🔍 ERROR 404 • NOT FOUND",
      badgeClass: "badge-404",
      icon: "🔍",
      title: "Listing or Page Not Found",
      desc: "This boarding house listing may have already been marked as occupied by our Baguio admin team, or the link was mistyped.",
      steps: [
        "Return to the Find Rooms catalog to browse active verified listings.",
        "Check the URL spelling if you typed the web address manually.",
        "Use the Support Ticket form if a verified link appears broken.",
      ],
    },
    403: {
      code: "🛡️ ERROR 403 • RESTRICTED",
      badgeClass: "badge-403",
      icon: "🛡️",
      title: "Student Verification Required",
      desc: "Direct landlord connection forms and protected listing actions require active .edu.ph student verification.",
      steps: [
        "Open verify.html and enter your active school email (.edu.ph).",
        "Ensure browser cookies and JavaScript are enabled.",
        "Submit a free inquiry packet—never pay any upfront deposit.",
      ],
    },
    500: {
      code: "🛠️ ERROR 500 • SERVER ISSUE",
      badgeClass: "badge-500",
      icon: "🛠️",
      title: "Temporary Database Sync",
      desc: "Our local admin team is currently updating room availability timestamps or verifying new landlord permits.",
      steps: [
        "Wait 30 seconds and reload the page.",
        "Avoid clicking Submit multiple times to prevent duplicate inquiries.",
        "If the issue lasts longer than 5 minutes, report the error code above.",
      ],
    },
  };

  const modal = document.getElementById("errorPreviewModal");
  const modalErrorCode = document.getElementById("modalErrorCode");
  const modalErrorIcon = document.getElementById("modalErrorIcon");
  const modalErrorTitle = document.getElementById("modalErrorTitle");
  const modalErrorDesc = document.getElementById("modalErrorDesc");
  const modalErrorSteps = document.getElementById("modalErrorSteps");
  const closeModalX = document.getElementById("closeModalX");
  const closeModalBtn = document.getElementById("closeModalBtn");

  document.querySelectorAll(".preview-error-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.error;
      const info = errorData[key];
      if (!info) return;

      modalErrorCode.textContent = info.code;
      modalErrorCode.className = `error-badge ${info.badgeClass}`;
      modalErrorIcon.textContent = info.icon;
      modalErrorTitle.textContent = info.title;
      modalErrorDesc.textContent = info.desc;

      modalErrorSteps.innerHTML = info.steps
        .map((step) => `<li>${step}</li>`)
        .join("");
      modal.classList.remove("hidden");
    });
  });

  function closeModal() {
    modal.classList.add("hidden");
  }

  closeModalX.addEventListener("click", closeModal);
  closeModalBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});
