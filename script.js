const langLabel = document.getElementById("lang_label");
const langBody = document.getElementById("lang_body");
const burgerIcon = document.getElementById("burger");
const burgerBody = document.getElementById("burger_body");
const closeButtons = [...document.querySelectorAll(".close")];

const controlScroll = stop => {
  if (stop) {
    document.querySelector("html").style.overflowY = "hidden";
    document.querySelector("body").style.overflowY = "hidden";
  } else {
    document.querySelector("html").style.overflowY = "auto";
    document.querySelector("body").style.overflowY = "auto";
  }
};

langLabel.addEventListener("click", () => {
  langBody.style.transition = "0.3s";
  langBody.classList.toggle("visible");
  if (window.screen.width <= 640) {
    controlScroll([...langBody.classList].includes("visible"));
  }
});

burgerIcon.addEventListener("click", () => {
  burgerBody.style.transition = "0.3s";
  burgerBody.classList.toggle("visible");
  controlScroll([...burgerBody.classList].includes("visible"));
});

closeButtons.forEach(button => {
  button.onclick = () => {
    langBody.classList.remove("visible");
    burgerBody.classList.remove("visible");
    controlScroll(false);
  };
});

// collapse comments

const collapsed_comments = [...document.querySelectorAll(".comments_column")];
const showmore = document.querySelector(".showmore");
const count_of_comments = 3;
document.addEventListener("DOMContentLoaded", () => {
  collapsed_comments.forEach(container => {
    if (container.children.length <= count_of_comments) {
      showmore.style.display = "none";
    } else {
      const gap = Math.round(
        parseFloat(
          window
            .getComputedStyle(container)
            .getPropertyValue("gap")
            .replace("px", "")
        ) || 0
      );
      const gapsInitial = gap * (count_of_comments - 1);
      container.style.maxHeight =
        [...container.children]
          .slice(0, count_of_comments)
          .map(e => e.offsetHeight)
          .reduce((a, b) => a + b) -
        1 +
        gapsInitial +
        "px";
    }
  });
});
collapsed_comments.forEach(container => {
  const gap = Math.round(
    parseFloat(
      window
        .getComputedStyle(container)
        .getPropertyValue("gap")
        .replace("px", "")
    ) || 0
  );
  const gapsInitial = gap * (count_of_comments - 1);
  const gapsNew = gap * ([...container.children].length - 1);
  const initialHeight =
    [...container.children]
      .slice(0, count_of_comments)
      .map(e => e.offsetHeight)
      .reduce((a, b) => a + b) -
    1 +
    gapsInitial +
    "px";
  const newHeight =
    [...container.children].map(e => e.offsetHeight).reduce((a, b) => a + b) -
    1 +
    gapsNew +
    "px";

  container.nextElementSibling.onclick = e => {
    container.style.transition = "500ms ease";
    if (container.style.maxHeight === initialHeight) {
      container.style.maxHeight = newHeight;
    } else {
      container.style.maxHeight = initialHeight;
    }
  };
});

// swiper

const swiper = new Swiper(".swiper", {
  // loop: true,
  speed: 400,

  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },

  breakpoints: {
    641: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    769: {
      slidesPerView: 3.5,
      spaceBetween: 32,
    },
  },
});

// search page

const search = document.getElementById("searchContainer");
const searchInput = search[0];
const tags = [...document.querySelectorAll(".search .tags span")];

tags.forEach(tag => {
  tag.addEventListener("click", e => {
    searchInput.value = e.target.innerText;
  });
});

// modal

const modalButtons = [...document.querySelectorAll(".open-modal")];
const modal = document.querySelector(".modal");

const showModal = () => {
  modal.style.transition = "all 250ms ease-out";
  modal.classList.add("visible");
  controlScroll(true);
};
const closeModal = () => {
  modal.style.transition = "all 250ms ease-out";
  modal.classList.remove("visible");
  controlScroll(false);
};

modalButtons.forEach(button => {
  button.addEventListener("click", showModal);
});

modal.addEventListener("click", e => {
  if (e.target === e.currentTarget) closeModal();
});

// send suggesting

const thanksMessage = document.querySelector(".thanksMessage");

const showThanksMessage = () => {
  thanksMessage.style.transition = "all 250ms ease-out";
  thanksMessage.classList.add("visible");
  controlScroll(true);
};

const hideThanksMessage = () => {
  thanksMessage.style.transition = "all 250ms ease-out";
  thanksMessage.classList.remove("visible");
  controlScroll(false);
};

modal.querySelector("button").onclick = e => {
  e.preventDefault();
  const text = e.path[1][0].value;
  if (text.length > 0) {
    e.target.classList.add("loading");
    setTimeout(() => fakeFetch(e.target), 1500);
    e.path[1][0].value = "";
  }
};

const fakeFetch = element => {
  element.classList.remove("loading");
  closeModal();
  console.log("loaded");
  showThanksMessage();
  setTimeout(hideThanksMessage, 2000);
};
