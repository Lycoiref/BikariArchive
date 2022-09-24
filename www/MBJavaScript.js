function Shokika()
{
    var c = document.getElementById("Circle_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(60,60,50,0 * Math.PI, 2 * Math.PI);
    ctx.stroke();
}

function Mimori()
{
    document.getElementById("Mimori").innerHTML = "测试成功";
}