var Volume = new Array();
Volume = [
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
];

var VolumeName = new Array();
VolumeName = [
    "第一卷 回廊波动",
    "第二卷 复数现实",
    "第三卷 浮海之恋"
];

//章节序号
var index = 0;
var vol = 0;

$(document).ready(function() {
    //获取章节序号与卷号
    var path = window.location.pathname;
    var page = path.split("/").pop();
    let reg = page.match("novel_(.*).html");
    index = Volume.indexOf(reg[1]);

    vol = Volume[index];
    while (vol >= 10) vol = Math.trunc(vol / 10);

    //引入页眉、侧边栏
    $("#Header").load("../../template/Header.html");
    //引入正文
    $(".MainContent").load("../../template/Chapter.html");
})

function ChapterWrap(type) {
    //获取下一章节的序号与卷号
    var gekka = index + (type == 0 ? -1 : 1);
    var nextvol  = Volume[gekka];
    while (nextvol >= 10) nextvol = Math.trunc(nextvol / 10);

    //章节跳转
    window.location.href = "../Volume." + nextvol + "/novel_" + Volume[gekka] + ".html";
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