function BackToTop() {
    $("html,body").animate(
        { scrollTop: 0 },
        { duration: 200, easing: "swing"});
}

//侧边栏滑动
function SideBarSlide() {
    document.addEventListener("scroll", function () {
        //侧边栏
        let header = document.querySelector(".Header");
        let sidebar = document.querySelector(".SideBar");

        let mainHeight = header.scrollHeight;
        if (window.pageYOffset > mainHeight) {
            sidebar.style.position = "fixed";
            sidebar.style.top = "0px";
            sidebar.style.left = -window.pageXOffset + "px";
        } else {
            sidebar.style.position = "absolute";
            sidebar.style.top = mainHeight + "px";
            sidebar.style.left = "0px";
        }
    })
}

function ToRecentUpdate() {
    $("html,body").animate({scrollTop:$("#UpdateLog").offset().top},200);
}