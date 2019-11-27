
var app = getApp()
Page({
    data: {
        avatarPic:app.data.avatarPic,
        nickName:app.data.nickName,
        n1:0,
        n2:0
    },
    onLoad: function () {
        const that = this;
        this.compData = this.selectComponent("#comp");
        this.compData.show(2);

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
                                    app.data.nickName = res.userInfo.nickName;
                                    that.setData({
                                        avatarPic:app.data.avatarPic,
                                        nickName:app.data.nickName
                                    })

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
                                            console.log(data);
                                            app.data.openid = data.data.openid;

                                            app.getData('GET','/api/orderlist',{
                                                openID: app.data.openid,
                                            },res=>{
                                                that.setData({
                                                    n2:res.data.length
                                                })
                                            })

                                            app.getData('GET','/api/recordlist',{
                                                openID: app.data.openid,
                                            },res=>{
                                                that.setData({
                                                    n1:res.data.length
                                                })
                                            })


                                        }
                                    });
                                }
                            })
                        }
                    }
                })

            }
        })


    },

    kfClick:function(){
        wx.navigateTo({
            url: '../kf/index'
        })
    },
    addClick:function(){
        wx.navigateTo({
            url: '../writeAdd/index'
        })
    },
    wineClick:function(){
        wx.navigateTo({
            url: '../winelist/index'
        })
    },
    orderClick:function(){
        wx.navigateTo({
            url: '../orderlist/index'
        })
    }

})
