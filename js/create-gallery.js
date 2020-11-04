import galleryItems from './gallery-items.js';


const refs = {
    galleryContainer: document.querySelector(".js-gallery"),
    modal: document.querySelector(".js-lightbox"),
    modalImg:document.querySelector(".lightbox__image"),
    modalContent: document.querySelector(".lightbox__image"),
    overlay: document.querySelector(".lightbox__overlay"),
    modalBtnClose: document.querySelector(".lightbox__button"),
    modalBtnRight: document.querySelector(".scroll-right"),
    modalBtnLeft: document.querySelector(".scroll-left"),
}



refs.galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup(galleryItems));
   
function galleryMarkup(img) {
    return img.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
                    <a class="gallery__link"
                     href=${original}>
                         <img class="gallery__image"
                          src=${preview}
                          data-source=${original}
                          alt=${description} />
                    </a>
                    </li>`
    }).join("");
};

refs.galleryContainer.addEventListener('click', modalOpen);

function modalOpen(event) {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") {
        return
    };
    refs.modal.classList.add("is-open");
    refs.modalImg.src = event.target.dataset.source;
    refs.modalImg.alt = event.target.alt;
    refs.overlay.addEventListener("click", modalCloseByOverlayClick);
    document.addEventListener("keydown", modalCloseByEsc);
    refs.modalBtnClose.addEventListener('click', modalClose);
    window.addEventListener("keydown", modalImgScrolling);
    refs.modalBtnRight.addEventListener("click", modalImgScrolling);
    refs.modalBtnLeft.addEventListener("click", modalImgScrolling);
    refs.modalContent.addEventListener("click", modalImgScrolling);   
};


function modalClose(event) {
    refs.modal.classList.remove("is-open");
    refs.overlay.removeEventListener("click", modalCloseByOverlayClick);
    document.removeEventListener("keydown", modalCloseByEsc);
    refs.modalBtnClose.removeEventListener('click', modalClose);
    window.removeEventListener("keydown", modalImgScrolling);
    refs.modalBtnRight.removeEventListener("click", modalImgScrolling);
    refs.modalBtnLeft.removeEventListener("click", modalImgScrolling);
    refs.modalContent.removeEventListener("click", modalImgScrolling);
};

function modalCloseByEsc(event) {
    if (event.code === "Escape") {
        modalClose(event)        
    }
};

function modalCloseByOverlayClick(event) {
    if (event.currentTarget === event.target) {
        modalClose(event)      
    }
};


function modalImgScrolling(event) {

    
    let imgIndex = galleryItems.findIndex(img => img.original === refs.modalImg.src);

    if (event.code === 'ArrowLeft' || event.code === 'ArrowDown' || refs.modalBtnLeft === event.target) {
        if (imgIndex === 0) {
            imgIndex += galleryItems.length;
        }
        imgIndex -= 1;
    };

    if (event.code === 'ArrowRight' || event.code === 'ArrowUp' || refs.modalBtnRight === event.target || refs.modalContent === event.target) {
        if (imgIndex === galleryItems.length - 1) {
            imgIndex -= galleryItems.length;
        }
        imgIndex += 1;
    };

    refs.modalImg.src = galleryItems[imgIndex].original;
    refs.modalImg.alt = galleryItems[imgIndex].description;

};