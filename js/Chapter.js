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

//章节序号
var index = 0;

function ChapterWrap(type) {
    var gekka = index + (type == 0 ? -1 : 1);
    window.location.href = "novel_" + Volume[gekka] + ".html";
}

$(document).ready(function() {
    //获取章节序号
    var path = window.location.pathname;
    var page = path.split("/").pop();
    let reg = page.match("novel_(.*).html");
    index = Volume.indexOf(reg[1]);

    //引入页眉、侧边栏
    $("#Header").load("../../template/Header.html");
    //引入正文
    $(".MainContent").load("../../template/Chapter.html");
})