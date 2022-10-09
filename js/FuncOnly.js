function BackToTop() {
    $("html,body").animate(
        { scrollTop: 0 },
        { duration: 200, easing: "swing"});
}

//页眉解限
function HeaderRelease() {
    let header = document.querySelector(".Header");
    header.style.position = "relative";
}

//侧边栏滑动
function SideBarSlide() {
    document.addEventListener("scroll", function () {
        let header = document.querySelector(".Header");
        let sidebar = document.querySelector(".SideBar");

        let mainHeight = header.scrollHeight;
        if (window.pageYOffset > mainHeight) {
            sidebar.style.position = "relative";
            sidebar.style.top = window.pageYOffset - mainHeight + "px";
        } else {
            sidebar.style.position = "sticky";
            sidebar.style.top = "0px";
        }
    })
}

function ToRecentUpdate() {
    $("html,body").animate({scrollTop:$("#UpdateLog").offset().top},200);
}