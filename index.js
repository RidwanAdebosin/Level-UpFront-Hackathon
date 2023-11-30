const dropdownTrigger = document.querySelector("#dropdown-btn1");
const dropdownContent = document.querySelector("#profile-menu-content");
const collapseTrigger = document.querySelector("#collapse-icon");
const paymentBar = document.querySelector("#payment-bar");
const allMenuItems = dropdownContent.querySelectorAll('[role = "menuitem"]');
const notCompletedIcon = document.querySelectorAll("#not-completed-icon");
const completedIcon = document.querySelectorAll("#completed-icon");
const loadingSpinnerIcon = document.querySelectorAll("#loading-spinner-icon");
const collapseContents = document.querySelector("#collapse-content");
const boxContainer = document.querySelector("#box-container");
const uncollapseContents = document.querySelector("#uncollapse-content");
const toggleContainer = document.querySelectorAll(".toggle-container");

collapseContents.addEventListener("click", function () {
  boxContainer.classList.add("box-container-inactive");
  collapseContents.style.display = "none";
  uncollapseContents.style.display = "block";
});

uncollapseContents.addEventListener("click", function () {
  boxContainer.classList.remove("box-container-inactive");
  uncollapseContents.style.display = "none";
  collapseContents.style.display = "block";
});

// function collapsePayment() {
//     collapseTrigger.addEventListener("click", function () {
//       paymentBar.classList.toggle("payment-bar-inactive");
//     });

function SpiningIcon() {}
//To load the spinning icon from uncomplete to completed
notCompletedIcon.forEach(function (notCompletedIcon, index) {
  notCompletedIcon.addEventListener("click", function (event) {
    loadingSpinnerIcon[index].style.display = "block";
    event.currentTarget.style.display = "none";
    setTimeout(function () {
      loadingSpinnerIcon[index].style.display = "none";
      completedIcon[index].style.display = "block";
    }, 1500);
  });
});

//To load the spinning icon from completed to uncomplete
completedIcon.forEach(function (completedIcon, index) {
  completedIcon.addEventListener("click", function (event) {
    event.currentTarget.style.display = "none";
    notCompletedIcon[index].style.display = "block";
  });
});

function app() {
  function handleMenuItemArrowKeypress(event, menuItemIndex) {
    const isLastMenuItem = menuItemIndex === allMenuItems.length - 1;

    const isFirstMenuItem = menuItemIndex === 0;

    const nextMenuItem = allMenuItems.item(menuItemIndex + 1);

    const previousMenuItem = allMenuItems.item(menuItemIndex - 1);

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      if (isLastMenuItem) {
        allMenuItems.item(0).focus();
        return;
      }
      nextMenuItem.focus();
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      if (isFirstMenuItem) {
        allMenuItems.item(allMenuItems.length - 1).focus();
        return;
      }
      previousMenuItem.focus();
    }
  }

  function openMenu() {
    dropdownTrigger.ariaExpanded = "true";

    allMenuItems.item(0).focus();
    dropdownContent.addEventListener("keyup", handleMenuEscapeKeypress);
  }

  function closeMenu() {
    dropdownTrigger.ariaExpanded = "false";
    dropdownTrigger.focus();
  }

  function handleMenuEscapeKeypress(event) {
    if (event.key === "Escape") {
      toggleMenu();
    }
  }

  allMenuItems.forEach(function (menuItem, menuItemIndex) {
    menuItem.addEventListener("keyup", function (event) {
      handleMenuItemArrowKeypress(event, menuItemIndex);
    });
  });

  function toggleMenu() {
    const isExpanded =
      dropdownTrigger.attributes["aria-expanded"].value === "true";
    dropdownContent.classList.toggle("dropdown-content-active");

    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  dropdownTrigger.addEventListener("click", toggleMenu);
  function collapsePayment() {
    collapseTrigger.addEventListener("click", function () {
      paymentBar.classList.toggle("payment-bar-inactive");
    });
  }
  collapsePayment();
}

//   function handleMarkDoneOrNotDone() {
//     notCompletedIcon.classList.add(HIDDEN_CLASS);
//     loadingSpinnerIcon.classList.remove(HIDDEN_CLASS);

//     setTimeout(() => {
//       completedIcon.classList.remove(HIDDEN_CLASS);
//     }, 3000);
//   }

//   checkboxButton.addEventListener("click", handleMarkDoneOrNotDone);
// }

app();
