const tabsData = [
    {
        id: 1,
        tab: "Tab 1",
        data: "This is tab 1"
    },
    {
        id: 2,
        tab: "Tab 2",
        data: "This is tab 2"
    },
    {
        id: 3,
        tab: "Tab 3",
        data: "This is tab 3"
    },
    {
        id: 4,
        tab: "Tab 4",
        data: "This is tab 4"
    },
]
document.addEventListener("DOMContentLoaded", function () {
    const tabsContainer = document.querySelector(".tabs-container");
    const tabsDataContainer = document.querySelector("#tabs-data-container");
    tabsData.forEach((tab, index) => {
        const tabDiv = document.createElement("div");
        tabDiv.setAttribute("data-index", tab.id);

        const button = document.createElement("button");
        button.textContent = tab.tab;
        tabDiv.appendChild(button);
        tabsContainer.appendChild(tabDiv);
        const tabContentDiv = document.createElement("div");
        if (index === 0) {
            button.classList.add("active")
            tabContentDiv.classList.add("active")
        }
        tabContentDiv.textContent = tab.data
        tabsDataContainer.appendChild(tabContentDiv)
    })

    tabsContainer.addEventListener("click", function (event) {
        console.log(event.target.className)
    })

})