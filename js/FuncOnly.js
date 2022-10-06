function BackToTop() {
    $("html,body").animate({scrollTop:0},200);
}

//侧边栏滑动
function SideBarSlide() {
    document.addEventListener("scroll", function () {
        //侧边栏
        let header = document.querySelector(".Header");
        let sidebar = document.querySelector(".SideBar");

        let mainHeight = header.scrollHeight;
        if (window.pageYOffset > mainHeight) {
            sidebar.style.position = "fixed";
            sidebar.style.top = "0px";
            sidebar.style.left = -window.pageXOffset + "px";
        } else {
            sidebar.style.position = "absolute";
            sidebar.style.top = mainHeight + "px";
            sidebar.style.left = "0px";
        }
    })
}

function Gitalk() {
    const gitalk = new Gitalk({
        clientID: '3d9c012ca5497fa45f6d', //GitHub Application Client ID
        clientSecret: '05478b229256c3f656858775c367a48b6fc5021b', //GitHub Application Client Secret
    
        repo: 'BikariComment', //仓库名称(GitHub repo)
        owner: 'MysteryBao37', //仓库拥有者(GitHub repo owner)
        admin: ['MysteryBao37'],
        id: "Demo",      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
    })
    
    var comment = document.createElement("div");
    comment.id = "gitalk-container";
    
    var MainContent = document.getElementsByClassName("MainContent")[0];
    MainContent.appendChild(comment);
    
    gitalk.render('gitalk-container');
}