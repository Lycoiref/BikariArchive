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
    //快捷键设置
    let shortcut = $(".input-shortcut");
    let count = shortcut.length;
    for (let i = 0; i < count; i++) {
        //获取id
        let id = shortcut[i].getAttribute("id");

        //读取本地变量，若不存在则进行初始化
        let keyStr = localStorage.getItem(id);
        if (keyStr === null) {
            localStorage.setItem(id, Gekka.strToKey(shortcut[i].value));
        }
        else {
            shortcut[i].value = Gekka.keyToStr(keyStr);
        }

        //输入逻辑
        shortcut[i].addEventListener("keypress", (event) => {
            shortcut[i].value = "";
        });
        shortcut[i].addEventListener("keyup", (event) => {
            shortcut[i].value = Gekka.keyToStr(event.key);
            localStorage.setItem(id, event.key);
        });
    }

    //字体大小
    let FontFamilyList = document.getElementsByClassName("input-fontfamily")[0].getElementsByTagName("li");
    FontFamilyList[localStorage.getItem("FontFamilyType")].className = "active";

    //字体大小
    let FontSizeList = document.getElementsByClassName("input-fontsize")[0].getElementsByTagName("li");
    FontSizeList[localStorage.getItem("FontSizeType")].className = "active";
}

//关闭设置
Setting.Close = function() {
    $(".modal-setting").remove();
    $(".modal-mask").remove();
}

//用于处理快捷键
var Gekka = new Object;

Gekka.keyToStr = function(key) {
    let str = key;
    switch (str) {
        case "Control": str = "Ctrl"; break;
        case " ": str = "SpaceBar"; break;
        case "ArrowLeft": str = "←"; break;
        case "ArrowUp": str = "↑"; break;
        case "ArrowRight": str = "→"; break;
        case "ArrowDown": str = "↓"; break;
        default:
            if (str >= "a" && str <= "z") {
                str = str.toUpperCase();
            }
    }
    return str;
}

Gekka.strToKey = function(str) {
    let key = str;
    switch (key) {
        case "Ctrl": key = "Control"; break;
        case "←": key = "ArrowLeft"; break;
        case "↑": key = "ArrowUp"; break;
        case "→": key = "ArrowRight"; break;
        case "↓": key = "ArrowDown"; break;
        default:
            if (key >= "A" && key <= "Z") {
                key = key.toLowerCase();
            }
    }
    return key;
}

/* ---------------------------------------------------------------- */
//阅读器
var Reader = new Object;

//字体选择
Reader.SetFontFamily = function(index) {
    localStorage.setItem("FontFamilyType", index);

    //改变设置栏样式
    let FontFamilyBox = document.getElementsByClassName("input-fontfamily")[0];
    if (typeof FontFamilyBox !== "undefined") {
        let FontFamilyList = FontFamilyBox.getElementsByTagName("li");

        let item = FontFamilyList.length;
        for (let i = 0; i < item; i++) {
            FontFamilyList[i].className = "";
        }
        FontFamilyList[index].className = "active";
    }

    //寻找正文
    let novel = document.getElementsByClassName("NovelText")[0];
    if (typeof novel !== "undefined") {
        //根据index选择样式
        let family;
        switch(index.toString()) {
            case "0": family = "inherit"; break;
            case "1": family = "宋体"; break;
            case "2": family = "楷体"; break;
        }

        //修改字体
        let lines = novel.getElementsByTagName("p");

        let count = lines.length;
        for (let i = 0; i < count; i++) {
            lines[i].style.fontFamily = family;
        }
    }
}

//字体大小
Reader.SetFontSize = function(index) {
    localStorage.setItem("FontSizeType", index);

    //改变设置栏样式
    let FontSizeBox = document.getElementsByClassName("input-fontsize")[0];
    if (typeof FontSizeBox !== "undefined") {
        let FontSizeList = FontSizeBox.getElementsByTagName("li");

        let item = FontSizeList.length;
        for (let i = 0; i < item; i++) {
            FontSizeList[i].className = "";
        }
        FontSizeList[index].className = "active";
    }

    //寻找正文
    let novel = document.getElementsByClassName("NovelText")[0];
    if (typeof novel !== "undefined") {
        //根据index选择样式
        let size, indent;
        switch(index.toString()) {
            case "0":
                size = 16;
                indent = 32;
                break;
            case "1":
                size = 18;
                indent = 36;
                break;
            case "2":
                size = 22;
                indent = 44;
                break;
        }

        //修改字体
        let lines = novel.getElementsByTagName("p");

        let count = lines.length;
        for (let i = 0; i < count; i++) {
            lines[i].style.fontSize = size + "px";
            lines[i].style.textIndent = indent + "px";
        }
    }
}

/* ---------------------------------------------------------------- */
var Form = new Object;
//应付用表单页

Form.Open = function() {
    //添加阴影层
    var shadow = document.createElement("div");
    shadow.className = "modal-mask";
    shadow.onclick = function() {
        Form.Close();
    };
    document.body.appendChild(shadow);

    //添加主体
    var setting = document.createElement("div");
    setting.className = "modal-form modal-box";
    document.body.appendChild(setting);

    //加载设置页面
    $(".modal-form").load(document.location.origin.toString() + "/template/Form.html", function(){
        Form.Init();
    });
}

Form.Init = function() {

}

Form.Close = function() {
    $(".modal-form").remove();
    $(".modal-mask").remove();
}

/* ---------------------------------------------------------------- */
var Cookie = new Object;

//设置cookie
Cookie.Set = function(name, value, daysToLive) {
    var cookie;
    cookie = name + "=" + encodeURIComponent(value);
    cookie += "; max-age=" + (daysToLive*60*60*24);
    cookie += "; path=/";
    document.cookie = cookie;
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