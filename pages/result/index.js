//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        num: 4,
        avatarPic: app.data.avatarPic,
        percentage: '',
        wineScore: '',
        status: '',
        bjList: [
            {
                a: "X2",
                b: "¥30"
            },
            {
                a: "X3",
                b: "¥40"
            },
            {
                a: "X4",
                b: "¥50"
            },
            {
                a: "X5",
                b: "¥60"
            }
        ],
        boxList: [
            "0",
            "1",
            "6",
            "12"
        ],
        show: false,//宝箱动画是否显示
        textShow: false,
        times: 10//暴击多少倍
    },
    onLoad: function () {
        wx.showShareMenu();
        let that = this;
        console.log(app.data.avatarPic);
        wx.request({
            url: app.data.url + '/api/end',
            method: 'POST', //请求方式
            data: {
                topic: 1,
                cardID: app.data.cardId,
                openID: app.data.openid,
                location: '',
                results: '3,0,1'
            },//请求参数
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            success: function (res) {
                console.log(res)
                app.data.recordID = res.data.recordID
                that.setData({
                    avatarPic: app.data.avatarPic,
                    percentage: res.data.percentage,
                    wineScore: res.data.wineScore,
                    status: res.data.status
                })
            }
        })

    },
    boxTap: function (e) {
        var obj = e.currentTarget;
        var query = obj.dataset['num'];
        var that = this;
        wx.request({
            url: app.data.url + '/api/opencase',
            method: 'POST', //请求方式
            data: {

                //cardID:app.data.cardId,
                recordID: app.data.recordID,
                initMoney: query
            },//请求参数
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    show: true
                })
                setTimeout(() => {
                    that.setData({
                        textShow: true
                    })
                }, 3000);
                setTimeout(() => {
                    that.setData({
                        textShow: false,
                        show:false
                    })
                }, 5000);
            }
        })
    }
})
