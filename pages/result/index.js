//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        num: 4,
        avatarPic: app.data.avatarPic,

        bjList: [],
        resultData: app.data.resultData,
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
            success: function (res) {
                var userInfo = res.userInfo
                var avatarUrl = userInfo.avatarUrl

                that.setData({
                    avatarPic: avatarUrl,
                    gif:'https://xjl123.oss-cn-beijing.aliyuncs.com/xjl/bxkq.gif'
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
                console.log(res)
                app.data.recordID = res.data.recordID;
                const list = app.data.boxList;
                let arr = [];
                app.data.final = 0;

                list!==undefined&&list!==null&&Object.keys(list).map(item=>{
                    arr.push({
                        final:list[item].final,
                        times:list[item].times,
                    })
                    app.data.final += list[item].final;
                });
                console.log(arr)
                that.setData({
                    resultData: {
                        percentage: res.data.percentage,
                        wineScore: res.data.wineScore,
                        status: res.data.status,
                    },
                    bjList: arr

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

                if(typeof res.data == "string"){
                    wx.showModal({
                        content:res.data
                    });
                    return;
                }

                let brr = [];
                app.data.final = 0;
                Object.keys(res.data).map(item=>{
                    brr.push({
                        final:res.data[item].final,
                        times:res.data[item].times,
                    })
                    app.data.final+=res.data[item].final;
                });
                that.setData({
                    show: true,
                    bjList:brr,
                    times:brr[brr.length-1].times,
                });
                setTimeout(() => {
                    that.setData({
                        textShow: true
                    })
                }, 3000);
                setTimeout(() => {
                    that.setData({
                        textShow: false,
                        show: false,
                    })

                }, 5000);
            }
        })
    }
})
