//返回顶部
function BackToTop() {
    $("html,body").animate(
        { scrollTop: 0 },
        { duration: 200, easing: "swing"});
}

//打开设置
function OpenSetting() {
    //添加阴影层
    var shadow = document.createElement("div");
    shadow.className = "layer-shadow";
    shadow.onclick = function() {
        CloseSetting();
    };
    document.body.appendChild(shadow);

    //添加主体
    var setting = document.createElement("div");
    setting.className = "Setting";
    document.body.appendChild(setting);

    //加载设置页面
    $(".Setting").load(document.location.origin.toString() + "/template/Setting.html");
}

//关闭设置
function CloseSetting() {
    $(".Setting").remove();
    $(".layer-shadow").remove();
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