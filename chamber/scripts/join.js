// ===============================
// TIMESTAMP
// ===============================
const timestampField = document.getElementById("timestamp");
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// ===============================
// MODAL LOGIC
// ===============================
const modalLinks = document.querySelectorAll("[data-modal]");
const dialogs = document.querySelectorAll("dialog");

modalLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        const modal = document.getElementById(link.dataset.modal);
        if (modal) modal.showModal();
    });
});

// Close buttons
dialogs.forEach(dialog => {
    const closeBtn = dialog.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => dialog.close());
    }

    // click outside modal
    dialog.addEventListener("click", event => {
        const rect = dialog.getBoundingClientRect();
        if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        ) {
            dialog.close();
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("#navList a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById("menuBtn");
    const navList = document.getElementById("navList");

    menuBtn.addEventListener("click", () => {
        navList.classList.toggle("open");
    });
});

