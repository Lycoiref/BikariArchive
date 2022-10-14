var Volume = new Array();
Volume = {
    "Bikari": {
        "VolList": [
            "第一卷 回廊波动",
            "第二卷 复数现实",
            "第三卷 浮海之恋"
        ],
        "VolPath": [
            "Volume.1",
            "Volume.2",
            "Volume.3"
        ],
        "Index": [
            "100", "101", "102", "103", "104",
            "1001", "105", "106", "107",
            "1002", "108", "109", "110", "111",
            "1003", "112", "113", "114",
            "1004", "115", "116", "117",
            "1005", "118", "119", "120",
        
            "200", "201", "202", "203", "204", "205", "206", 
            "2001", "207", 
            "2002", "208", "209", "210", "211", "212", "213",
            "2003", "214",
            "2004", "215", "216", "217", "218", "219", "220",
            "2005",
        
            "300", "301", "302", "303"
        ],
        "Chapter": [
            "幕前　Limit Code: 047", "Chapter.1", "Chapter.2", "Chapter.3", "Chapter.4",
            "幕间（一）", "Chapter.5", "Chapter.6", "Chapter.7",
            "幕间（二）", "Chapter.8", "Chapter.9", "Chapter.10", "Chapter.11",
            "幕间（三）", "Chapter.12", "Chapter.13", "Chapter.14",
            "幕间（四）", "Chapter.15", "Chapter.16", "Chapter.17",
            "幕间（五）", "Chapter.18", "Chapter.19", "Chapter.20",
        
            "序章", "第一章", "第二章", "第三章", "第四章", "第五章", "第六章", 
            "间章（一）", "第七章", 
            "间章（二）", "第八章", "第九章", "第十章", "第十一章", "第十二章", "第十三章",
            "间章（三）", "第十四章",
            "间章（四）", "第十五章", "第十六章", "第十七章", "第十八章", "第十九章", "第二十章",
            "终章",
        
            "序曲", "Movement.1", "Movement.2", "Movement.3"
        ]
    },

    "Lingko": {
        "VolList": [
            "第一卷"
        ],
        "VolPath": [
            "LINGKO"
        ],
        "Index": [
            "101", "102"
        ]
    }
};

var novel = "";//小说名
var vol = 0;//卷序号
var order = 0;//章序号
var index = 0;//章文件名

$(document).ready(function() {
    //获取小说名与章文件名
    var inf = document.getElementsByTagName("inf")[0];
    novel = inf.getAttribute("novel");
    index = inf.getAttribute("index");

    //计算卷序号与章序号
    vol = index;
    while (vol >= 10) vol = Math.trunc(vol / 10);
    order = Volume[novel]["Index"].indexOf(index);

    //引入页眉、侧边栏、正文
    $(".Header").load("../../template/Header.html", ()=>{HeaderRelease()});
    $(".SideBar").load("../../template/SideBar.html", ()=>{SideBarShokika()});
    $(".MainContent").load("../../template/Chapter.html", ()=>{
        let title = Volume[novel]["Chapter"][order];
        //网页标题
        document.title = title + "- 微光茶馆";
        //正文标题
        document.getElementById("Title").innerHTML = title;
        //所属卷
        document.getElementById("Volume").innerHTML = "<" + Volume[novel]["VolList"][vol - 1] + ">";
        //引入正文
        $(".Novel-Text").load(index + ".txt", function(){
            //字数统计
            document.getElementById("WordCount").innerHTML = "字数：" + WordCount();
            //设置项初始化
            Setting.Init();
        });
        
        //按钮可用与否
        if (order <= 0) {
            document.getElementsByClassName("Novel-WrapBox-Left")[0].style.visibility = "hidden";
            document.getElementsByClassName("LastChapter-Bottom")[0].style.display = "none";
        }
        if (order >= Volume[novel]["Index"].length - 1) {
            document.getElementsByClassName("Novel-WrapBox-Right")[0].style.visibility = "hidden";
            document.getElementsByClassName("NextChapter-Bottom")[0].style.display = "none";
        }
    });

    //键盘监听
    document.addEventListener("keydown", (event)=>{
        switch (event.key) {
            case localStorage.getItem("shortcut-LastChapter"):
                ChapterWrap(0);
                break;
            case localStorage.getItem("shortcut-NextChapter"):
                ChapterWrap(1);
                break;
        }
    });
});

function SideBarShokika()
{
    //侧边栏滑动
    SideBar.SetSlide(true);

    var header = document.querySelector(".Header");
    var sideBar = document.querySelector(".SideBar");
    var Index = document.querySelector("#Index");

    let height = 0;
    let blocks = sideBar.children;
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].id != "Index") {
            height += PxToNumber(getComputedStyle(blocks[i]).height) + 24;
        }
    }

    //高度初始化
    Index.style.height = window.innerHeight - height - PxToNumber(getComputedStyle(header).height) - 32 * 2 + "px";

    //根据浏览器滚动动态调整
    window.addEventListener("scroll", (event)=>{
        let offset = window.pageYOffset - PxToNumber(getComputedStyle(header).height);
        if (offset > 0) offset = 0;
        Index.style.height = window.innerHeight - height + offset - 32 * 2 + "px";
    })

    $(".Index-Volume")[0].innerHTML = Volume[novel]["VolList"][vol - 1];


    //目录显示
    Index.style.setProperty("display", "block", "important");

}

function ChapterWrap(type)//章节跳转
{
    //获取下一章节的序号与卷号
    var gekka = order + (type == 0 ? -1 : 1);
    var nextvol = Volume[novel]["Index"][gekka];

    //判断下一章节是否存在
    if (typeof(nextvol) != "undefined") {
        while (nextvol >= 10) nextvol = Math.trunc(nextvol / 10);
        window.location.href = "../" + Volume[novel]["VolPath"][nextvol - 1] + "/novel_" + Volume[novel]["Index"][gekka] + ".html";
    }
}

function WordCount()//字数统计
{
    var article = document.getElementsByClassName("Novel-Text")[0];

    var lines = article.getElementsByTagName("p");
    var ruby = article.getElementsByTagName("ruby");
    var br = article.getElementsByTagName("br");

    var count = 0;
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].innerHTML.length;
    }

    count -= ruby.length * 42;
    count -= br.length * 6;
    return count;
}