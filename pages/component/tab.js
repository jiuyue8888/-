var app = getApp();
Component({
    data: {
        curr: 0,
        nameList: [
            {
                name: '首页',
                img:'../../images/icon1.png',
                imgHover:'../../images/icon1h.png',
                url: '../index/index'
            },
            {
                name: '排行榜',
                img:'../../images/icon2.png',
                imgHover:'../../images/icon2h.png',
                url: '../rank/index'
            },
            {
                name: '我的',
                img:'../../images/icon3.png',
                imgHover:'../../images/icon3h.png',
                url: '../my/index'
            }
        ]
    },
    methods: {
        show: function (curr) {
            this.setData({
                curr:curr
            })
        },
        onGotUserInfo:function(e){
            const url = e.currentTarget.dataset.url;


            wx.navigateTo({
                url: url
            })

        }
    }
})