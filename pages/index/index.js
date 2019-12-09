//index.js
//获取应用实例
var app = getApp()

Page({
    data: {
        popShow: false,
        popShow1: false,
        op:'213'
    },
    onShareAppMessage(){
        const that = this;
        return {
            title: '',
            path: '/pages/index/index',
            success: function (res) {
                // 转发成功

                that.shareClick();
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    onLoad: function (options) {
        this.compData = this.selectComponent("#comp");
        this.popData = this.selectComponent("#pop");
        this.compData.show(0);
        const that = this;
        this.popData.btnClick(function () {
            that.setData({
                popShow: false,
            })
        });
        that.setData({
            op: options,
        })
        console.log(options)

        if (options.c) {
            app.data.cardId = options.c?decodeURIComponent(options.c):'';
        } else {
            if (app.data.cardId == '') {
                let times = wx.getStorageSync('times');


                if (times > 2) {
                    wx.showModal({
                        content: '少侠需要扫描酒卡二维码才能玩行酒令，跳转至客服了解酒卡^ _ ^',
                        success (res) {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '../my/index'
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    });
                    return;
                }


                wx.showModal({
                    content: '行酒令免费三次，是否需要确认使用次数？用完后请联系客服获得酒卡。',
                    success (res) {
                        if (res.confirm) {
                            wx.setStorage({
                                key: 'times',
                                data: times < 1 ? 1 : times + 1,
                            })
                            //获取虚拟卡
                            app.getData('GET', '/api/getcardid', {}, res=> {
                                console.log(res)
                                app.data.cardId = res.data.cardID;
                                app.data.topImg = res.data.picURL;
                                app.data.itemIDList = res.data.itemIDList;
                                app.data.isFalse = true;
                                app.data.keyID = res.data.keyID;
                                that.setData({
                                    popShow1: true
                                })
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                });



                return;
            }

        }


        // 获取酒令信息
        app.getData('GET', '/api/querycard', {
            cardID: app.data.cardId
        }, (res)=> {
            var data = res.data;
            var status = res.data.status;
            if (typeof res.data == 'string') {
                return;

            }
            console.log(data)
            app.data.topImg = data.picURL;
            that.setData({
                startData: data
            })
            app.data.itemIDList = data.itemIDList;
            app.data.recordID = data.recordID;

            if (data.recordID == null) {
                that.setData({
                    popShow1: true
                })
                return false;
            }

            //获取行酒令记录
            app.getData('GET', '/api/queryrecord', {
                recordID: data.recordID
            }, result=> {
                console.log(result)

                if (result.statusCode !== 200) {
                    return false;
                }
                //console.log(JSON.parse(result.sercertKey));
                app.data.cardId = result.data.cardID;
                app.data.openid = result.data.openID;
                app.data.answerMeg = result.data.result;
                app.data.activeMoney = result.data.activeMoney;
                app.data.boxList = JSON.parse(result.data.sercertKey);

                let right = 0;
                result.data.result.split(',').map((item, index)=> {
                    if (index > 0 && item == 1) {
                        right++;
                    }
                });

                app.data.resultData = {
                    percentage: result.data.percentage,
                    wineScore: result.data.wineSocre,
                    status: result.data.status,
                    result: right
                };
                switch (status) {
                    case '0':
                        if (data.recordID !== null) {
                            wx.reLaunch({
                                url: '../result/index'
                            })
                        }

                        break;
                    case '1':
                        wx.reLaunch({
                            url: '../tqmj/index'
                        })
                        break;
                    case '2':
                        wx.reLaunch({
                            url: '../orderSeccuss/index'
                        })
                        break;
                }
                that.setData({
                    popShow1: true
                })
            })


        })

    },


    //开始按钮
    bindGetUserInfo: function (resq) {
        var info = resq;
        var that = this;
        console.log(resq)
        if (app.data.cardId == '') {
            return;
        }
        wx.login({

            success: function (resa) {

                // 获取用户信息
                wx.getSetting({
                    success: res => {
                        if (res.authSetting['scope.userInfo']) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                            wx.getUserInfo({
                                success: res => {
                                    console.log(resa.code);

                                    app.data.avatarPic = res.userInfo.avatarUrl;
                                    app.data.nickName = res.userInfo.nickName;

                                    //获取openid
                                    app.getData('POST', '/api/user', {
                                        js_code: resa.code,
                                        headIcon: res.userInfo.avatarUrl
                                    }, data=> {
                                        console.log(data);

                                        wx.setStorageSync("token", data.header["Set-Cookie"]);
                                        console.log(wx.getStorageSync("token"));
                                        app.data.openid = data.data.openid;

                                        //设置用户信息
                                        app.getData('PUT', '/api/user', {
                                            openID: data.data.openid,
                                            userNick: res.userInfo.nickName,
                                            gender: res.userInfo.gender,
                                            province: res.userInfo.province,
                                            headIcon: res.userInfo.avatarUrl
                                        }, ()=> {
                                        })


                                        //获取卡片列表
                                        app.getData('POST', '/api/start', {
                                            Topic: 1,
                                            CardID: app.data.cardId,
                                            itemIDList: app.data.itemIDList
                                        }, res=> {
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
                                            setTimeout(function () {
                                                that.setData({
                                                    popShow: false
                                                })
                                                wx.reLaunch({
                                                    url: '../answer/index'
                                                })
                                            }, 3000)
                                        })

                                    })


                                }
                            })
                        }
                    }
                })

            }
        })

    },
    onMyEvent: function (e) {
        this.setData({
            popShow: false
        })
    }
})
