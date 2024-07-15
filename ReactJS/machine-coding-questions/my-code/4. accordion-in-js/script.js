const sectionData = [
    {
        section: "Section 1",
        content: "This is section 1 content"
    },
    {
        section: "Section 2",
        content: "This is section 2 content"
    },
    {
        section: "Section 3",
        content: "This is section 3 content"
    },
    {
        section: "Section 4",
        content: "This is section 4 content"
    },
]

document.addEventListener("DOMContentLoaded", function () {
    const accordionContainer = document.querySelector("#accordion");

    sectionData.forEach((accordion, index) => {
        const accordionDiv = document.createElement("div");
        accordionDiv.classList.add("accordion-item");
        const accordionHeading = document.createElement("p");
        accordionHeading.innerText = accordion.section;
        accordionHeading.classList.add("accordion-header");
        const accordionContent = document.createElement("div");
        accordionContent.innerText = accordion.content;
        accordionContent.classList.add("accordion-content");
        accordionDiv.appendChild(accordionHeading);
        accordionDiv.appendChild(accordionContent);
        accordionContainer.appendChild(accordionDiv);
        accordionDiv.classList.remove("active");
        accordionContent.style.display = "none";
        if (index == 0) {
            accordionDiv.classList.add("active");
            accordionContent.style.display = "block";
        }
    })

    accordionContainer.addEventListener("click", function (event) {
        const header = event.target.closest(".accordion-header")
        if (!header) return;

        const section = header.parentNode;
        console.log(section)
        const accordionContent = section.querySelector(".accordion-content");
        const isActive = section.classList.contains("active");

        document.querySelectorAll(".accordion-item").forEach(item => {
            item.classList.remove("active");
            item.querySelector(".accordion-content").style.display = "none";
        });

        if (!isActive) {
            section.classList.add("active");
            accordionContent.style.display = "block"
        }
    })

})