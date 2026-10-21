 
/* =========================================
   HELEN GETNET | PORTFOLIO INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. MOBILE NAVIGATION
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-link, .nav-contact");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation"
    );

    navLinks.classList.toggle("open", !isOpen);
  });

  navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // 2. REVEAL SECTIONS AS THEY ENTER THE SCREEN
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 3. ACTIVE NAVIGATION LINK
  const sections = document.querySelectorAll("main section[id]");
  const sectionLinks = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionLinks.forEach((link) => {
              const isActive =
                link.getAttribute("href") === `#${entry.target.id}`;

              link.classList.toggle("active", isActive);
            });
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // 4. AUTOMATIC FOOTER YEAR
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 5. PROJECT AND CREATIVE-WORK PREVIEW
  const dialog = document.getElementById("preview-dialog");
  const closeButton = document.getElementById("preview-close");
  const previewTitle = document.getElementById("preview-title");
  const previewDescription = document.getElementById("preview-description");
  const previewImage = document.getElementById("preview-image");
  const imagePlaceholder = document.getElementById(
    "preview-image-placeholder"
  );

  function openPreview({ title, description = "", image = "" }) {
    previewTitle.textContent = title;
    previewDescription.textContent = description;

    previewImage.hidden = true;
    previewImage.removeAttribute("src");
    imagePlaceholder.hidden = true;

    if (image) {
      previewImage.alt = title;
      previewImage.onerror = () => {
        previewImage.hidden = true;
        imagePlaceholder.hidden = false;
      };
      previewImage.onload = () => {
        previewImage.hidden = false;
        imagePlaceholder.hidden = true;
      };
      previewImage.src = image;
    } else {
      imagePlaceholder.hidden = false;
    }

    if (!dialog.open) {
      dialog.showModal();
    }
  }

  document.querySelectorAll(".project-details").forEach((button) => {
    button.addEventListener("click", () => {
      openPreview({
        title: button.dataset.title || "Project details",
        description:
          button.dataset.description || "Add your project description here."
      });
    });
  });

  document.querySelectorAll(".creative-item").forEach((item) => {
    item.addEventListener("click", () => {
      openPreview({
        title: item.dataset.title || "Creative work",
        description:
          "Replace this image with your own original design or video thumbnail.",
        image: item.dataset.image || ""
      });
    });
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  // 6. CONTACT FORM
  // This opens the visitor's email app. It does not send email
  // automatically or store submitted form information.

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const recipient = "YOUR_EMAIL@example.com";

    if (
      !recipient ||
      recipient === "YOUR_EMAIL@example.com" ||
      !recipient.includes("@")
    ) {
      formStatus.textContent =
        "Please replace YOUR_EMAIL@example.com in script.js with your real email address before using this form.";
      formStatus.setAttribute("role", "alert");
      return;
    }

    const formData = new FormData(contactForm);
    const name = formData.get("name").toString().trim();
    const email = formData.get("email").toString().trim();
    const subject = formData.get("subject").toString().trim();
    const message = formData.get("message").toString().trim();

    const body = [
      `Name: ${name}`,
      `Reply email: ${email}`,
      "",
      message
    ].join("\n");

    const mailto =
      `mailto:${recipient}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    formStatus.textContent =
      "Opening your email application. Review the message and send it there.";

    window.location.href = mailto;
  });
});
