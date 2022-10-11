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
    $(".Header").load("../../template/Header.html", HeaderRelease());
    $(".SideBar").load("../../template/SideBar.html", SideBar.SetSlide(true));
    $(".MainContent").load("../../template/Chapter.html", function(){
        //标题
        document.getElementById("Title").innerHTML = document.title.match("(.*) - 微光茶馆")[1];
        //所属卷
        document.getElementById("Volume").innerHTML = "<" + Volume[novel]["VolList"][vol - 1] + ">";
        //引入正文
        $(".NovelText").load(index + ".txt", function(){
            //字数统计
            document.getElementById("WordCount").innerHTML = "字数：" + WordCount();
            //设置项初始化
            Setting.Init();
        });
        
        //按钮可用与否
        if (order <= 0) {
            document.getElementsByClassName("LastChapter")[0].disabled = true;
            document.getElementsByClassName("LastChapter")[1].style.display = "none";
        }
        if (order >= Volume[novel]["Index"].length - 1) {
            document.getElementsByClassName("NextChapter")[0].disabled = true;
            document.getElementsByClassName("NextChapter")[1].style.display = "none";
        }
    });

    //键盘监听
    document.addEventListener("keydown", function(event) {
        switch (event.key) {
            case localStorage.getItem("shortcut-LastChapter"):
                ChapterWrap(0);
                break;
            case localStorage.getItem("shortcut-NextChapter"):
                ChapterWrap(1);
                break;
        }
    });
})

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
    var article = document.getElementsByClassName("NovelText")[0];

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