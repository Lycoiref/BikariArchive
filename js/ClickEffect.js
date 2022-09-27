!function ClickEffect () {
    /* 鼠标点击文字特效 */
    var font = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善");
    var color = new Array('#ff0000', '#eb4310', '#f6941d', '#fbb417', '#ffff00', '#cdd541', '#99cc33', '#3f9337', '#219167', '#239676', '#24998d', '#1f9baa', '#0080ff', '#3366cc', '#333399', '#003366', '#800080', '#a1488e', '#c71585', '#bd2158', '#eec142', '#FEEE6D');
    var f_idx = 0;
    var c_idx = 0;
    jQuery(document).ready(function ($) {
        $("body").click(function (e) {
            var $i = $("<span />").text('❤' + font[f_idx] + '❤');
            f_idx++;
            f_idx %= font.length;
            c_idx = Math.floor(Math.random() * 40) % color.length;
            var x = e.pageX,
                y = e.pageY;
            $i.css({
                "z-index": 9999999999999999999999999,
                "top": y - 20,
                "left": x,
                "position": "absolute",
                "font-size": 13,
                "font-weight": "bold",
                "color": color[c_idx]
            });
            $("body").append($i);
            $i.animate({
                "top": y - 180,
                "opacity": 0
            },
                1500,
                function () {
                    $i.remove();
            });
        });
    });
} ();