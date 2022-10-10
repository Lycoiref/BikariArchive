//返回顶部
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

/* ---------------------------------------------------------------- */
var Setting = new Object;

//打开设置
Setting.Open = function() {
    //添加阴影层
    var shadow = document.createElement("div");
    shadow.className = "modal-mask";
    shadow.onclick = function() {
        Setting.Close();
    };
    document.body.appendChild(shadow);

    //添加主体
    var setting = document.createElement("div");
    setting.className = "modal-setting modal-box";
    document.body.appendChild(setting);

    //加载设置页面
    $(".modal-setting").load(document.location.origin.toString() + "/template/Setting.html", function(){
        Setting.Init();
    });
}

//初始化
Setting.Init = function() {
    //用于处理快捷键
    var Gekka = new Object;
    Gekka.keyCodeToStr = function(code) {
        this.value = String.fromCharCode(code);
        switch (code) {
            case 17: this.value = "Ctrl"; break;
            case 32: this.value = "Spacebar"; break;
            case 37: this.value = "←"; break;
            case 38: this.value = "↑"; break;
            case 39: this.value = "→"; break;
            case 40: this.value = "↓"; break;
            default:
                if (code >= 65 && code <= 90) {
                    this.value = this.value.toUpperCase();
                }
        }
        return this.value;
    }

    //快捷键设置
    let shortcut = $(".input-shortcut");
    let count = shortcut.length;
    for (let i = 0; i < count; i++) {
        //获取id
        let id = shortcut[i].getAttribute("id");

        //读取cookie
        shortcut[i].value = Gekka.keyCodeToStr(Cookie.Get(id));

        //输入逻辑
        shortcut[i].addEventListener("keypress", (event) => {
            shortcut[i].value = "";
        });
        shortcut[i].addEventListener("keyup", (event) => {
            shortcut[i].value = Gekka.keyCodeToStr(event.keyCode);
            Cookie.Set(id, event.keyCode, 365);
        });
    }
}

//关闭设置
Setting.Close = function() {
    $(".modal-setting").remove();
    $(".modal-mask").remove();
}

/* ---------------------------------------------------------------- */
var Cookie = new Object;

//设置cookie
Cookie.Set = function(name, value, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(value);
    if(typeof daysToLive === "number")
    cookie += "; max-age=" + (daysToLive*60*60*24);
    document.cookie = cookie ;
}

//读取cookie
Cookie.Get = function(name) {
    var cookies = document.cookie;
    var list = cookies.split("; "); // 解析出名/值对列表
    for(var i = 0; i < list.length; i++) {
        var arr = list[i].split("="); // 解析出名和值
        if(arr[0] == name)
        return decodeURIComponent(arr[1]); // 对cookie值解码
    }
    return "";
}