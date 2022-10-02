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
            "101"
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

    //引入页眉、侧边栏
    $("#Header").load("../../template/Header.html", SideBarSlide());
    //引入正文
    $(".MainContent").load("../../template/Chapter.html");
})

function ChapterWrap(type) {
    //获取下一章节的序号与卷号
    var gekka = order + (type == 0 ? -1 : 1);
    var nextvol = Volume[novel]["Index"][gekka];
    while (nextvol >= 10) nextvol = Math.trunc(nextvol / 10);

    //章节跳转
    window.location.href = "../" + Volume[novel]["VolPath"][nextvol - 1] + "/novel_" + Volume[novel]["Index"][gekka] + ".html";
}

function WordCount() {
    var lines = document.getElementsByTagName("p");
    var rubys = document.getElementsByTagName("ruby");
    var brs = document.getElementsByTagName("br");

    var count = 0;
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].innerHTML.length;
    }

    count -= rubys.length * 42;
    count -= brs.length * 6;
    return count;
}