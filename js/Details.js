$(document).ready(function() {
    //页眉解限
    var header = document.querySelector("mb-header");
    header.TopRelease();
    
    //侧边栏滑动
    SideBar.SetSlide(true);
    
    //设置项初始化
    Setting.Init();
})