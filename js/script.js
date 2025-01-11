const themeToggle = document.getElementById("theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// setting theme
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const icon = themeToggle.querySelector("i");
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// theme for light and dark
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDarkScheme.matches) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}

// theme - toggle
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

// need to listen to theme changes - system
prefersDarkScheme.addListener((e) => {
  if (!localStorage.getItem("theme")) {
    setTheme(e.matches ? "dark" : "light");
  }
});

initializeTheme();

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector(".main-content");
  const hamburgerButtons = document.querySelectorAll(".hamburger-menu");

  //toggle sidebar
  function toggleSidebar(e) {
    if (e) e.stopPropagation();

    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("expanded");
    const isCollapsed = sidebar.classList.contains("collapsed");
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  }

  hamburgerButtons.forEach((button) => {
    button.addEventListener("click", toggleSidebar);
  });
  function setInitialSidebarState() {
    const isMobile = window.innerWidth <= 768;
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState === null) {
      //mobile:hide sidebar by default
      if (isMobile) {
        sidebar.classList.add("collapsed");
        mainContent.classList.add("expanded");
      } else {
        sidebar.classList.remove("collapsed");
        mainContent.classList.remove("expanded");
      }
    } else {
      if (savedState === "true") {
        sidebar.classList.add("collapsed");
        mainContent.classList.add("expanded");
      } else {
        sidebar.classList.remove("collapsed");
        mainContent.classList.remove("expanded");
      }
    }
  }

  function handleResize() {
    const isMobile = window.innerWidth <= 768;
    if (localStorage.getItem("sidebarCollapsed") === null) {
      if (isMobile) {
        sidebar.classList.add("collapsed");
        mainContent.classList.add("expanded");
      } else {
        sidebar.classList.remove("collapsed");
        mainContent.classList.remove("expanded");
      }
    }
  }
  setInitialSidebarState();
  window.addEventListener("resize", handleResize);
  document.addEventListener("click", function (e) {
    const isMobile = window.innerWidth <= 768;
    if (isMobile && !sidebar.classList.contains("collapsed")) {
      if (!sidebar.contains(e.target) && !e.target.closest(".hamburger-menu")) {
        toggleSidebar();
      }
    }
  });
});

const sectionNames = {
  home: "Home",
  about: "About",
  work: "Work Experience",
  projects: "Projects",
  skills: "Skills",
  involvement: "Involvements",
};

const sectionIcons = {
  home: "fas fa-home",
  about: "fas fa-user",
  work: "fas fa-briefcase",
  projects: "fas fa-code",
  involvement: "fas fa-users",
  skills: "fas fa-tools",
};

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-item");
  const currentSection = document.getElementById("current-section");
  function updateActiveSection(sectionId) {
    navItems.forEach((item) => {
      const itemHref = item.getAttribute("href").substring(1);
      item.classList.toggle("active", itemHref === sectionId);
    });

    if (sectionNames[sectionId]) {
      currentSection.innerHTML = `
                <div class="breadcrumb-icon">
                    <i class="${sectionIcons[sectionId]}"></i>
                </div>
                <span>${sectionNames[sectionId]}</span>
            `;
    }
  }

  function onScroll() {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      updateActiveSection(currentSectionId);
    }
  }

  // hamburger menu
  const quickFindInput = document.getElementById("quickFindInput");

  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      quickFindInput.focus();
    }
  });

  // block collapsing
  document.querySelectorAll(".collapsible-block").forEach((block) => {
    const header = block.querySelector(".collapsible-header");
    const icon = header.querySelector("i");
    const content = block.querySelector(".collapsible-content");

    header.addEventListener("click", () => {
      document.querySelectorAll(".collapsible-block").forEach((otherBlock) => {
        if (otherBlock !== block) {
          otherBlock.classList.remove("open");
          otherBlock.querySelector(".collapsible-content").style.display =
            "none";
          const otherIcon = otherBlock.querySelector(".collapsible-header i");
          otherIcon.classList.remove("fa-chevron-down");
          otherIcon.classList.add("fa-chevron-right");
        }
      });

      const isOpen = block.classList.contains("open");
      block.classList.toggle("open");
      content.style.display = isOpen ? "none" : "block";

      if (isOpen) {
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-right");
      } else {
        icon.classList.remove("fa-chevron-right");
        icon.classList.add("fa-chevron-down");
      }

      const sectionInBlock = block.querySelector("section[id]");
      if (sectionInBlock) {
        const sectionId = sectionInBlock.getAttribute("id");
        navItems.forEach((item) => {
          const itemHref = item.getAttribute("href").substring(1);
          if (itemHref === sectionId) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });

        if (sectionNames[sectionId]) {
          currentSection.innerHTML = `
                        <div class="breadcrumb-icon">
                            <i class="${sectionIcons[sectionId]}"></i>
                        </div>
                        <span>${sectionNames[sectionId]}</span>
                    `;
        }
      }
    });
  });

  navItems.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      navItems.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
      if (sectionNames[targetId]) {
        currentSection.innerHTML = `
                    <div class="breadcrumb-icon">
                        <i class="${sectionIcons[targetId]}"></i>
                    </div>
                    <span>${sectionNames[targetId]}</span>
                `;
      }
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const parentBlock = targetSection.closest(".collapsible-block");
        if (parentBlock) {
          const content = parentBlock.querySelector(".collapsible-content");
          const icon = parentBlock.querySelector(".collapsible-header i");
          parentBlock.classList.add("open");
          content.style.display = "block";
          icon.classList.remove("fa-chevron-right");
          icon.classList.add("fa-chevron-down");

          document.querySelectorAll(".collapsible-block").forEach((block) => {
            if (block !== parentBlock) {
              block.classList.remove("open");
              block.querySelector(".collapsible-content").style.display =
                "none";
              const otherIcon = block.querySelector(".collapsible-header i");
              otherIcon.classList.remove("fa-chevron-down");
              otherIcon.classList.add("fa-chevron-right");
            }
          });
        }

        targetSection.scrollIntoView({ behavior: "smooth" });
        updateActiveSection(targetId);
      }
    });
  });
  window.addEventListener("scroll", onScroll);
  onScroll();
});
