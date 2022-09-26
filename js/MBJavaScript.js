
//-----------------------------------------------------------------------
//侧边栏
let header = document.querySelector(".Header");
let sidebar = document.querySelector(".SideBar");

document.addEventListener("scroll", function () {
    let mainHeight = header.scrollHeight - 8;
    if (window.pageYOffset > mainHeight) {
        sidebar.style.position = "fixed";
        sidebar.style.top = "0px";
    } else {
        sidebar.style.position = "absolute";
        sidebar.style.top = mainHeight + "px";
    }
})
//-----------------------------------------------------------------------
