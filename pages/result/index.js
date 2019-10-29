//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        num: 4,
        avatarUrl: app.data.avatarUrl,
        percentage:'',
        wineScore:'',
        status:'',
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
            "本次免费",
            "支付1元",
            "支付6元",
            "支付12元"
        ]
    },
    onLoad: function () {
        wx.showShareMenu();
        let that = this;
        wx.request({
            url: app.data.url + '/api/end',
            method: 'POST', //请求方式
            data: {
                topic: 1,
                cardID:app.data.cardId,
                openID: app.data.openid,
                location: '',
                results: '3,0,1'
            },//请求参数
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    percentage:res.data.percentage,
                    wineScore:res.data.wineScore,
                    status:res.data.status
                })
            }
        })

    }
})
