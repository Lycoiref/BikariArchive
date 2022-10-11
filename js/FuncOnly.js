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
//设置
var Setting = new Object;

//打开设置
Setting.Open = function() {
    //添加阴影层
    var mask = document.createElement("div");
    mask.className = "modal-mask";
    mask.onclick = function() {
        Setting.Close();
    };
    document.body.appendChild(mask);

    //添加主体
    var setting = document.createElement("div");
    setting.className = "modal-setting modal-box";
    document.body.appendChild(setting);

    //加载设置页面
    $(".modal-setting").load(document.location.origin.toString() + "/template/Setting.html", function(){
        Setting.Init();
    });

    //不知道为什么但要加载一下
    getComputedStyle(setting).transition;

    //触发css动画
    setting.style.top = "50%";
    setting.style.opacity = 1;
    mask.style.opacity = 0.5;
}

//初始化
Setting.Init = function() {
    //关闭按钮
    $(".setting-close").on("click", function() {
        Setting.Close();
    });

    //侧边栏位置
    SideBar.SetSide(localStorage.getItem("SideBarSide"));

    //快捷键
    ShortCut.Init();

    //字体选择
    Reader.SetFontFamily(localStorage.getItem("FontFamilyType"));

    //字体大小
    Reader.SetFontSize(localStorage.getItem("FontSizeType"));
}

//关闭设置
Setting.Close = function() {
    let setting = $(".modal-setting")[0];
    let mask = $(".modal-mask")[0];

    //触发css动画
    setting.style.top = "20%";
    setting.style.opacity = 0;
    mask.style.opacity = 0;

    let duration = getComputedStyle(setting).transitionDuration;
    duration = duration.slice(0, duration.length - 1);
    setTimeout(function() {
        setting.remove();
        mask.remove();
    }, duration * 1000);
}

/* ---------------------------------------------------------------- */
//侧边栏
var SideBar = new Object;

SideBar.SetSide = function(index) {
    if (index === null) index = "0";
    localStorage.setItem("SideBarSide", index);
    
    //改变设置栏样式
    let BarSideBox = document.getElementsByClassName("input-barside")[0];
    if (typeof BarSideBox !== "undefined") {
        let BarSideList = BarSideBox.getElementsByTagName("li");

        let item = BarSideList.length;
        for (let i = 0; i < item; i++) {
            BarSideList[i].className = "";
        }
        BarSideList[Number(index)].className = "active";
    }

    //获取侧边栏、主要内容
    let nakami = document.querySelector(".Nakami");
    let sideBar = document.querySelector(".SideBar");
    let mainContent = document.querySelector(".MainContent");
    if (typeof sideBar !== "undefined") {
        //根据index选择样式
        switch(index.toString()) {
            case "0":
                nakami.removeChild(mainContent);
                nakami.appendChild(mainContent);
                break;
            case "1":
                nakami.removeChild(sideBar);
                nakami.appendChild(sideBar);
                break;
        }
    }
}

/* ---------------------------------------------------------------- */
//快捷键
var ShortCut = new Object;

ShortCut.Init = function() {
    let shortcut = $(".input-shortcut");
    if (typeof shortcut !== "undefined") {
        let count = shortcut.length;
        for (let i = 0; i < count; i++) {
            //获取id
            let id = shortcut[i].getAttribute("id");
    
            //读取本地变量，若不存在则进行初始化
            let keyStr = localStorage.getItem(id);
            if (keyStr === null) {
                localStorage.setItem(id, this.strToKey(shortcut[i].value));
            }
            else {
                shortcut[i].value = this.keyToStr(keyStr);
            }
    
            //输入逻辑
            shortcut[i].addEventListener("keypress", (event) => {
                shortcut[i].value = "";
            });
            shortcut[i].addEventListener("keyup", (event) => {
                shortcut[i].value = this.keyToStr(event.key);
                localStorage.setItem(id, event.key);
            });
        }
    }
}

ShortCut.keyToStr = function(key) {
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

ShortCut.strToKey = function(str) {
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
    if (index === null) index = "0";
    localStorage.setItem("FontFamilyType", index);
    
    //改变设置栏样式
    let FontFamilyBox = document.getElementsByClassName("input-fontfamily")[0];
    if (typeof FontFamilyBox !== "undefined") {
        let FontFamilyList = FontFamilyBox.getElementsByTagName("li");

        let item = FontFamilyList.length;
        for (let i = 0; i < item; i++) {
            FontFamilyList[i].className = "";
        }
        FontFamilyList[Number(index)].className = "active";
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
    if (index === null) index = "0";
    localStorage.setItem("FontSizeType", index);

    //改变设置栏样式
    let FontSizeBox = document.getElementsByClassName("input-fontsize")[0];
    if (typeof FontSizeBox !== "undefined") {
        let FontSizeList = FontSizeBox.getElementsByTagName("li");

        let item = FontSizeList.length;
        for (let i = 0; i < item; i++) {
            FontSizeList[i].className = "";
        }
        FontSizeList[Number(index)].className = "active";
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
//应付用表单页
var Form = new Object;

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
//Cookie
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