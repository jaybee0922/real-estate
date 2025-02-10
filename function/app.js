// Declared variables
const body = document.querySelector("body");
const myNav = document.querySelector(".main-nav-bar");
const toggleBtn = document.querySelector(".dark-light");
const searchToggle = document.querySelector(".searchToggle");
const sidebarOpen = document.querySelector(".sidebarOpen");
const getYoursButton = document.querySelector(".get-yours");
const formContainer = document.querySelector(".form-container");
let getMode = localStorage.getItem("mode");
const closeButton = document.querySelector(".close-btn");


const sliderControls = document.querySelector(".slider-controls");
const sliderTabs = sliderControls.querySelectorAll(".slider-tab");
const sliderIndicator = sliderControls.querySelector(".slider-indicator");


// Update the indicator
const updateIndicator = (tab, index) => {
    document.querySelector(".slider-tab.current")?.classList.remove("current");
    tab.classList.add("current");
    sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
    sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;

    // Calculate the scroll position and scroll smoothly
    const scrollLeft = sliderTabs[index].offsetLeft - sliderControls.offsetWidth / 2 + sliderTabs[index].offsetWidth / 2;
    sliderControls.scrollTo({ left: scrollLeft, behavior: "smooth" });
};

// Initialize swiper instance
const swiper = new Swiper(".slider-container", {
    effect: "fade",
    speed: 1300,
    autoplay: { delay: 4000 },
    navigation: {
        prevEl: "#slide-prev",
        nextEl: "#slide-next",
    },
    on: {
        // Update indicator on slide change
        slideChange: () => {
            const currentTabIndex = [...sliderTabs].indexOf(sliderTabs[swiper.activeIndex]);
            updateIndicator(sliderTabs[swiper.activeIndex], currentTabIndex);
        },
        reachEnd: () => swiper.autoplay.stop(),
    },
});

// Update the slide on tab click
sliderTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        swiper.slideTo(index);
        updateIndicator(tab, index);
    });
});

updateIndicator(sliderTabs[0], 0);
window.addEventListener("resize", () => updateIndicator(sliderTabs[swiper.activeIndex], 0));


// Handle dark mode on page load
const darkBg = () => {
    if (getMode && getMode === "dark-mode") {
        body.classList.add("dark");
        updateButtonStyles();
    }
};

// Update button styles based on theme
const updateButtonStyles = () => {
    if (body.classList.contains("dark")) {
        getYoursButton.classList.add("dark-theme");
        getYoursButton.classList.remove("light-theme");
    } else {
        getYoursButton.classList.add("light-theme");
        getYoursButton.classList.remove("dark-theme");
    }
};

// Change theme when toggling dark/light mode  // Save the theme in localStorage
const changeBg = () => {
    toggleBtn.addEventListener("click", () => {
        toggleBtn.classList.toggle("active");
        body.classList.toggle("dark");

        if (!body.classList.contains("dark")) {
            localStorage.setItem("mode", "light-mode");
        } else {
            localStorage.setItem("mode", "dark-mode");
        }

        updateButtonStyles();
    });
};

// Handle search field visibility
const searchField = () => {
    searchToggle.addEventListener("click", () => {
        searchToggle.classList.toggle("active");
    });
};

// Sidebar toggle for mobile view
const sideBarClick = () => {
    sidebarOpen.addEventListener("click", () => {
        myNav.classList.add("active");
    });
};

// Close sidebar when clicking outside
const closeSideBar = () => {
    body.addEventListener("click", e => {
        let clickedElms = e.target;
        if (!clickedElms.classList.contains("sidebarOpen") && !clickedElms.classList.contains("menu")) {
            myNav.classList.remove("active");
        }
    });
};

// Toggle the visibility of the form
const toggleFormVisibility = () => {
    getYoursButton.addEventListener("click", () => {
        formContainer.classList.toggle("show-form");
    });
};

// close modal 
const closeModal = () => {
    closeButton.addEventListener("click", () => {
        formContainer.classList.remove("show-form");
    });
}


// Call functions
darkBg();
changeBg();
searchField();
sideBarClick();
closeSideBar();
toggleFormVisibility();
closeModal();
