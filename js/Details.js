$(document).ready(function() {
    //引入页眉、侧边栏
    $(".Header").load("../../template/Header.html", HeaderRelease());
    $(".SideBar").load("../../template/SideBar.html", SideBar.SetSlide(true));
})