'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const avatarImg = document.querySelector("[data-avatar-img]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

if (avatarImg) {
  const defaultAvatar = avatarImg.dataset.avatarDefault || avatarImg.src;
  const hoverAvatar = avatarImg.dataset.avatarHover;

  const showHoverAvatar = function () {
    if (hoverAvatar) avatarImg.src = hoverAvatar;
    if (sidebar) sidebar.classList.add("batman-mode");
  };

  const showDefaultAvatar = function () {
    avatarImg.src = defaultAvatar;
    if (sidebar) sidebar.classList.remove("batman-mode");
  };

  avatarImg.addEventListener("mouseenter", showHoverAvatar);
  avatarImg.addEventListener("mouseleave", showDefaultAvatar);
  avatarImg.addEventListener("mousedown", showHoverAvatar);
  avatarImg.addEventListener("mouseup", showDefaultAvatar);
  avatarImg.addEventListener("touchstart", showHoverAvatar, { passive: true });
  avatarImg.addEventListener("touchend", showDefaultAvatar);
  avatarImg.addEventListener("touchcancel", showDefaultAvatar);
  avatarImg.addEventListener("dragstart", function (event) { event.preventDefault(); });
}



// portfolio project modal variables
const projectItems = document.querySelectorAll("[data-project-item]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalImg = document.querySelector("[data-project-modal-img]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalDescription = document.querySelector("[data-project-modal-description]");
const projectModalStack = document.querySelector("[data-project-modal-stack]");
const projectModalLink = document.querySelector("[data-project-modal-link]");

const techStyleMap = {
  "react": { icon: "logo-react", bg: "hsla(193, 95%, 68%, 0.18)", border: "hsla(193, 95%, 68%, 0.45)", color: "hsl(193, 95%, 72%)" },
  "react native": { icon: "phone-portrait-outline", bg: "hsla(193, 95%, 68%, 0.18)", border: "hsla(193, 95%, 68%, 0.45)", color: "hsl(193, 95%, 72%)" },
  "node.js": { icon: "server-outline", bg: "hsla(105, 55%, 55%, 0.2)", border: "hsla(105, 55%, 55%, 0.45)", color: "hsl(105, 55%, 62%)" },
  "express": { icon: "git-network-outline", bg: "hsla(0, 0%, 88%, 0.12)", border: "hsla(0, 0%, 88%, 0.28)", color: "hsl(0, 0%, 88%)" },
  "mongodb": { icon: "leaf-outline", bg: "hsla(142, 45%, 48%, 0.2)", border: "hsla(142, 45%, 48%, 0.45)", color: "hsl(142, 50%, 62%)" },
  "blazor webassembly": { icon: "layers-outline", bg: "hsla(284, 65%, 62%, 0.2)", border: "hsla(284, 65%, 62%, 0.45)", color: "hsl(284, 75%, 72%)" },
  ".net": { icon: "code-slash-outline", bg: "hsla(260, 90%, 70%, 0.2)", border: "hsla(260, 90%, 70%, 0.45)", color: "hsl(260, 95%, 78%)" },
  "c#": { icon: "terminal-outline", bg: "hsla(286, 60%, 58%, 0.2)", border: "hsla(286, 60%, 58%, 0.45)", color: "hsl(286, 72%, 72%)" },
  "javascript": { icon: "logo-javascript", bg: "hsla(48, 95%, 62%, 0.2)", border: "hsla(48, 95%, 62%, 0.45)", color: "hsl(48, 100%, 72%)" },
  "typescript": { icon: "code-working-outline", bg: "hsla(211, 95%, 62%, 0.2)", border: "hsla(211, 95%, 62%, 0.45)", color: "hsl(211, 100%, 74%)" },
  "azure devops": { icon: "cloud-outline", bg: "hsla(206, 90%, 62%, 0.2)", border: "hsla(206, 90%, 62%, 0.45)", color: "hsl(206, 100%, 74%)" },
  "rest apis": { icon: "swap-horizontal-outline", bg: "hsla(18, 90%, 66%, 0.2)", border: "hsla(18, 90%, 66%, 0.45)", color: "hsl(18, 95%, 76%)" },
  "firebase": { icon: "flame-outline", bg: "hsla(34, 96%, 61%, 0.2)", border: "hsla(34, 96%, 61%, 0.45)", color: "hsl(34, 100%, 74%)" },
  "html": { icon: "logo-html5", bg: "hsla(15, 90%, 63%, 0.2)", border: "hsla(15, 90%, 63%, 0.45)", color: "hsl(15, 95%, 75%)" },
  "css": { icon: "logo-css3", bg: "hsla(211, 95%, 64%, 0.2)", border: "hsla(211, 95%, 64%, 0.45)", color: "hsl(211, 100%, 75%)" },
  "php": { icon: "ellipse-outline", bg: "hsla(245, 45%, 65%, 0.2)", border: "hsla(245, 45%, 65%, 0.45)", color: "hsl(245, 55%, 76%)" },
  "tailwind css": { icon: "color-wand-outline", bg: "hsla(191, 95%, 65%, 0.2)", border: "hsla(191, 95%, 65%, 0.45)", color: "hsl(191, 100%, 75%)" },
  "vercel": { icon: "triangle-outline", bg: "hsla(0, 0%, 96%, 0.12)", border: "hsla(0, 0%, 96%, 0.28)", color: "hsl(0, 0%, 92%)" },
  "unity": { icon: "game-controller-outline", bg: "hsla(0, 0%, 85%, 0.16)", border: "hsla(0, 0%, 85%, 0.34)", color: "hsl(0, 0%, 90%)" },
  "2d physics": { icon: "move-outline", bg: "hsla(330, 80%, 68%, 0.2)", border: "hsla(330, 80%, 68%, 0.45)", color: "hsl(330, 92%, 78%)" },
  "mobile optimization": { icon: "phone-portrait-outline", bg: "hsla(166, 80%, 56%, 0.2)", border: "hsla(166, 80%, 56%, 0.45)", color: "hsl(166, 90%, 70%)" },
  "ocr": { icon: "scan-outline", bg: "hsla(44, 90%, 64%, 0.2)", border: "hsla(44, 90%, 64%, 0.45)", color: "hsl(44, 100%, 76%)" },
  "hosting cpanel": { icon: "globe-outline", bg: "hsla(26, 90%, 62%, 0.2)", border: "hsla(26, 90%, 62%, 0.45)", color: "hsl(26, 96%, 74%)" },
};

const defaultTechStyle = { icon: "layers-outline", bg: "hsla(45, 100%, 72%, 0.14)", border: "hsla(45, 100%, 72%, 0.35)", color: "hsl(45, 100%, 78%)" };

const renderTechBadge = function (tech) {
  const style = techStyleMap[tech.toLowerCase()] || defaultTechStyle;
  return `<span class="project-tech-badge" style="--tech-bg:${style.bg};--tech-border:${style.border};--tech-color:${style.color};"><ion-icon name="${style.icon}"></ion-icon>${tech}</span>`;
}

// project modal toggle function
const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
}

// add click event to all projects
for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function (event) {
    event.preventDefault();

    const projectImage = this.querySelector(".project-img img");
    const projectTitle = this.querySelector(".project-title");
    const projectCategory = this.querySelector(".project-category");
    const projectDescription = this.dataset.projectDescription || "Project details coming soon.";
    const projectStack = (this.dataset.projectStack || "").split(",").map((tech) => tech.trim()).filter(Boolean);
    const projectLink = (this.getAttribute("data-project-link") ?? "").trim();

    projectModalImg.src = projectImage.src;
    projectModalImg.alt = projectImage.alt;
    projectModalTitle.innerHTML = projectTitle.innerHTML;
    projectModalDescription.innerHTML = `${projectDescription} <br><br><span>${projectCategory.innerHTML}</span>`;
    if (projectModalStack) {
      if (projectStack.length) {
        projectModalStack.innerHTML = projectStack
          .map((tech) => renderTechBadge(tech))
          .join("");
        projectModalStack.hidden = false;
      } else {
        projectModalStack.innerHTML = "";
        projectModalStack.hidden = true;
      }
    }

    if (projectModalLink) {
      if (projectLink) {
        projectModalLink.href = projectLink;
        projectModalLink.hidden = false;
      } else {
        projectModalLink.removeAttribute("href");
        projectModalLink.hidden = true;
      }
    }

    projectModalFunc();
  });
}

// add click event to project modal close
projectModalCloseBtn.addEventListener("click", projectModalFunc);
projectOverlay.addEventListener("click", projectModalFunc);


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}