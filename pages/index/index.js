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


        wx.login({
            success: function (resa) {

                // 获取用户信息
                wx.getSetting({
                    success: res => {
                        if (res.authSetting['scope.userInfo']) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                            wx.getUserInfo({
                                success: res => {
                                    console.log(res)
                                    app.data.avatarPic = res.userInfo.avatarUrl;
                                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                    // 所以此处加入 callback 以防止这种情况
                                    if (this.userInfoReadyCallback) {
                                        this.userInfoReadyCallback(res)
                                    }

                                    //获取用户信息
                                    wx.request({
                                        url: app.data.url + '/api/user',
                                        method: 'POST', //请求方式
                                        data: {
                                            js_code: resa.code,
                                            headIcon:res.userInfo.avatarUrl
                                        },//请求参数
                                        header: {
                                            "Content-Type": "application/x-www-form-urlencoded",
                                        },
                                        success: function (data) {
                                            console.log(data)
                                            app.data.openid = data.data.openid;
                                        }
                                    });
                                }
                            })
                        }
                    }
                })

            }
        })
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
                if (typeof res.data == 'string') {
                    wx.showToast({
                        'title': res.data,
                        icon: 'none'
                    });
                    setTimeout(function () {
                        wx.navigateTo({
                            url: '../rank/index'
                        })
                    }, 1000)
                }

                app.data.topImg = data.picURL;
                that.setData({
                    startData: data
                })
                app.data.itemIDList = data.itemIDList;
                app.data.recordID = data.recordID;

                if (data.recordID == null) {
                    return false;
                }
                wx.request({
                    url: app.data.url + '/api/queryrecord',
                    method: 'GET', //请求方式
                    data: {
                        recordID: data.recordID
                    },//请求参数
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: (result)=> {
                        console.log(result)
                        if (result.statusCode !== 200) {
                            return false;
                        }
                        //console.log(JSON.parse(result.sercertKey));
                        app.data.cardId = result.data.cardID;
                        app.data.openid = result.data.openID;
                        app.data.answerMeg = result.data.result;
                        app.data.boxList = JSON.parse(result.data.sercertKey);

                        let right = 0;
                        result.data.result.split(',').map((item, index)=> {
                            if (index > 0 && item == 1) {
                                right++;
                            }
                        })
                        app.data.resultData = {
                            percentage: result.data.percentage,
                            wineScore: result.data.wineSocre,
                            status: result.data.status,
                            result: right
                        }
                        switch (status) {
                            case '0':
                                if (data.recordID !== null) {
                                    wx.navigateTo({
                                        url: '../result/index'
                                    })
                                }

                                break;
                            case '1':
                                wx.navigateTo({
                                    url: '../tqmj/index'
                                })
                                break;
                            case '2':
                                wx.navigateTo({
                                    url: '../orderSeccuss/index'
                                })
                                break;
                        }

                    }
                })


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
            //获取卡片列表
            wx.request({
                url: app.data.url + '/api/start',
                method: 'POST', //请求方式
                data: {
                    Topic: 1,
                    CardID: app.data.cardId,
                    itemIDList: that.data.startData.itemIDList
                },//请求参数
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",

                },

                success: function (res) {
                    console.log(res)
                    that.setData({
                        answer: {
                            questions: res.data.questions,
                            items: res.data.items
                        }
                    });
                    app.data.answer = {
                        questions: res.data.questions,
                        items: res.data.items
                    };
                    var arr = [];
                    res.data.items.map(item=> {
                        arr.push(item.picURL);
                        that.setData({
                            answer: {
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
    },
    onMyEvent: function (e) {
        this.setData({
            popShow: false
        })
    }
})
