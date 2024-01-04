const accordionItemHeaders = document.querySelectorAll(".accordion-item-header")
const codeSnippet = document.getElementById("code-snip")
        let btn = document.querySelector("#btn");
        let sidebar = document.querySelector(".sidebar");
        let search = document.querySelector(".bx-search-alt-2");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener('click', event =>{
        accordionItemHeader.classList.toggle("active")
    });
});


    btn.onclick = function() {
        sidebar.classList.toggle("active");
    }
        