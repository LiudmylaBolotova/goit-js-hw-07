import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector(".gallery");

const listGalleryItems = createItemsOnGallery(galleryItems);

galleryEl.insertAdjacentHTML("beforeend", listGalleryItems);

function createItemsOnGallery(item) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class = "gallery__item">
      <a class = "gallery__link" href="${original}">
      <img 
      class ="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}">
      </a>
      </div>`;
    })
    .join(" ");
}

galleryEl.addEventListener("click", onContainerClick);

function onContainerClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  modalShow(event.target.dataset.source);
}

let counter;
function modalShow(src) {
  counter = basicLightbox.create(
    `
    <div class="modal">
        <img src="${src}" style="height:100vh; display:block"></img>
    </div>
`,
    {
      onShow: (counter) => {
        addListener();
      },

      onClose: (counter) => {
        removeListener();
      },
    }
  );
  counter.show();
}

function addListener() {
  window.addEventListener("keydown", onEscClick);
}

function onEscClick(event) {
  if (event.code === "Escape") {
    counter.close();
  }
}

function removeListener() {
  window.removeEventListener("keydown", onEscClick);
}
