const gitalk = new Gitalk({
    clientID: '3d9c012ca5497fa45f6d', //GitHub Application Client ID

    clientSecret: '05478b229256c3f656858775c367a48b6fc5021b', //GitHub Application Client Secret

    repo: 'BikariComment', //仓库名称(GitHub repo)
    owner: 'MysteryBao37', //仓库拥有者(GitHub repo owner)
    admin: ['MysteryBao37'],
    id: location.href,      // Ensure uniqueness and length less than 50
    distractionFreeMode: false  // Facebook-like distraction free mode
})

gitalk.render('gitalk-container');