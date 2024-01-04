const accordionItemHeaders = document.querySelectorAll(".accordion-item-header")

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener('click', event =>{
        accordionItemHeader.classList.toggle("active")
    });
});

const title = document.querySelector(".card__title"); 
const description = document.querySelector(".card__description"); 
const image = document.querySelector(".card__image"); 
      
// Remove the 'loading' class 
title.classList.remove("loading"); 
description.classList.remove("loading"); 
image.classList.remove("loading"); 
      
// Add the content 
title.textContent = 'Title'; 
description.textContent = 'This is the description.'; 
image.innerHTML = `<img src="${image-source}`; 