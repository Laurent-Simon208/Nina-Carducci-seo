document.addEventListener("DOMContentLoaded", function () {
  //** déclaration des constantes pour generateImages*/
  const galleryContainer = document.querySelector(".gallery");
  const galleryImages = document.querySelectorAll(".gallery-item");
  const categories = document.querySelectorAll(".categories button");
  const selectCategory = document.querySelectorAll("[data-gallery-tag]");
  /** fonction pour afficher les images dans la galerie*/
  function generateImage(images) {
    galleryContainer.style.display = "grid";
    galleryContainer.innerHTML = "";
    images.forEach(function (image) {
      galleryContainer.appendChild(image);
    });
  }

  generateImage(Array.from(galleryImages));
  /**déclaration de constantes pour les filtres */
  const categoryConcert = Array.from(selectCategory).filter(function (element) {
    return element.getAttribute("data-gallery-tag") === "Concert";
  });
  const categoryMariages = Array.from(selectCategory).filter(function (
    element
  ) {
    return element.getAttribute("data-gallery-tag") === "Mariages";
  });
  const categoryPortraits = Array.from(selectCategory).filter(function (
    element
  ) {
    return element.getAttribute("data-gallery-tag") === "Portrait";
  });
  const categoryEntreprises = Array.from(selectCategory).filter(function (
    element
  ) {
    return element.getAttribute("data-gallery-tag") === "Entreprises";
  });
  /**déclarations des bouton de filtre */
  const buttonAll = document.querySelector(".all");
  buttonAll.classList.add("active-tag");
  const buttonConcert = document.querySelector(".Concert");
  const buttonEntreprise = document.querySelector(".Entreprises");
  const buttonMariage = document.querySelector(".Mariages");
  const buttonPortrait = document.querySelector(".Portraits");
  /**evenement des bouton filtres */
  buttonAll.addEventListener("click", function () {
    generateImage(Array.from(galleryImages));
  });

  buttonConcert.addEventListener("click", function () {
    generateImage(categoryConcert);
  });

  buttonEntreprise.addEventListener("click", function () {
    generateImage(categoryEntreprises);
  });

  buttonMariage.addEventListener("click", function () {
    generateImage(categoryMariages);
  });

  buttonPortrait.addEventListener("click", function () {
    generateImage(categoryPortraits);
  });

  categories.forEach((category) => {
    category.addEventListener("click", function () {
      categories.forEach((c) => c.classList.remove("active-tag"));
      this.classList.add("active-tag");
    });
  });
  //** déclaration des constantes pour afficher la modale */
  const modal = document.querySelector("#modal");
  const modalImage = document.querySelector("#modal-image");
  const closeBtn = document.getElementsByClassName("close")[0];
  const galleryItems = document.querySelectorAll(".gallery-item");
  const prevButton = document.querySelector("#prevButton");
  const nextButton = document.querySelector("#nextButton");
  let currentIndex = 0;
  /**fonction pour ouvrir la modale */
  function openModal(event) {
    const image = event.target;
    const imageSource = image.getAttribute("src");

    modal.style.display = "block";
    modalImage.src = imageSource;
    currentIndex = Array.from(galleryItems).indexOf(image);
  }
  /**boutons pour naviger entre les images dans la modales  */
  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const nextImageSource = galleryItems[currentIndex].getAttribute("src");

    modalImage.src = nextImageSource;
  }

  function prevImage() {
    currentIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const prevImageSource = galleryItems[currentIndex].getAttribute("src");
    modalImage.src = prevImageSource;
  }

  for (let i = 0; i < galleryItems.length; i++) {
    galleryItems[i].addEventListener("click", function (event) {
      openModal(event);
    });
  }
  /**fonction pour fermer la modale */
  function closeModal() {
    modal.style.display = "none";
  }
  /**evenements pour la modale */
  closeBtn.addEventListener("click", closeModal);
  nextButton.addEventListener("click", nextImage);
  prevButton.addEventListener("click", prevImage);
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  /**fonction pour ajuster les images en fonction de la taille de la fenetre */
  function adjustImageHeight() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const windowWidth = window.innerWidth;

    galleryItems.forEach((item) => {
      if (windowWidth < 1500 && windowWidth > 550) {
        const width = item.offsetWidth;
        item.style.height = `${width}px`;
      } else {
        item.style.height = "440px";
      }
    });
  }

  window.addEventListener("resize", adjustImageHeight);
});