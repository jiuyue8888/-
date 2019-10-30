//index.js
//获取应用实例
var app = getApp()

Page({
    data: {
        popShow: false,
    },
    onLoad: function () {
        this.compData = this.selectComponent("#comp");
        this.popData = this.selectComponent("#pop");
        this.compData.show(0);
        const that = this;
        this.popData.btnClick(function () {
            that.setData({
                popShow: false
            })
        });

        
        // 获取酒令信息
        wx.request({
            url: app.data.url + '/api/querycard',
            method: 'GET', //请求方式
            data: {
                cardID: app.data.cardId
            },//请求参数
            header: {
                'content-type': 'application/json' // 默认值
            },

            success: function (res) {
                var data = res.data;
                var status = res.data.status;

                that.setData({
                    startData: data
                })

                switch (status){
                    case '0':
                        if(data.recordID == null){
                            wx.navigateTo({
                                url: '../result/index'
                            })
                        }

                        break;
                    case '1':
                        wx.navigateTo({
                            url: '../jhmj/index'
                        })
                        break;
                    case '2':
                        wx.navigateTo({
                            url: 'pages/tqmj/index'
                        })
                        break;
                }

            }
        })
    },
    getScancode: function () {
        var _this = this;
        // 允许从相机和相册扫码
        wx.scanCode({
            success: function (res) {
                wx.navigateTo({
                    url: '../bind/bind?title=' + res.result

                })
                var result = res.result;

                _this.setData({
                    result: result,

                })
            }
        })

    },

    //开始按钮
    bindGetUserInfo: function (res) {
        var info = res;
        var that = this;
        console.log(res)
        if (info.detail.userInfo) {
            app.data.avatarPic = info.detail.userInfo.avatarUrl;
            wx.login({
                success: function (res) {

                    //获取用户信息
                    wx.request({
                        url: app.data.url + '/api/user',
                        method: 'POST', //请求方式
                        data: {
                            js_code:res.code
                        },//请求参数
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        success: function (data) {
                            app.data.openid =data.data.openid;
                        }
                    });

                    //获取卡片列表
                    wx.request({
                        url: app.data.url + '/api/start',
                        method: 'POST', //请求方式
                        data: {
                            Topic:1,
                            CardID: app.data.cardId,
                            itemIDList:that.data.startData.itemIDList
                        },//请求参数
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        
                        },

                        success: function (res) {
                            console.log(res)
                            that.setData({
                                answer:{
                                    questions:res.data.questions,
                                    items:res.data.items
                                }
                            });
                            app.data.answer={
                                questions:res.data.questions,
                                items:res.data.items
                            };
                            var arr=[];
                            res.data.items.map(item=>{
                                arr.push(item.picURL);
                                that.setData({
                                    answer:{
                                        arr,
                                    }
                                });
                            });
                            that.setData({
                                popShow: true
                            })

                        }
                    })

                }
            })
        }
    },
    onMyEvent: function (e) {
        this.setData({
            popShow: false
        })
    }
})
