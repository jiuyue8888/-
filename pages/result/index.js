//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        num: 4,
        avatarPic: app.data.avatarPic,

        bjList: [],
        resultData:app.data.resultData,
        boxList: [
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
        wx.getUserInfo({
            success: function(res) {
                var userInfo = res.userInfo
                var avatarUrl = userInfo.avatarUrl

                that.setData({
                    avatarPic: avatarUrl,
                })
            }
        })

        wx.request({
            url: app.data.url + '/api/end',
            method: 'POST', //请求方式
            data: {
                topic: 1,
                cardID: app.data.cardId,
                openID: app.data.openid,
                location: '',
                results: app.data.answerMeg
            },//请求参数
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            success: function (res) {
                app.data.recordID = res.data.recordID
                that.setData({
                    resultData:{
                        percentage: res.data.percentage,
                        wineScore: res.data.wineScore,
                        status: res.data.status
                    }

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
