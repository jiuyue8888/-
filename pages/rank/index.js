
var app = getApp()
Page({
    data: {
        my:{
            text:'200酒力',
            name:'xixijashj',
            url:'../../images/mjbg.jpg',
            no:1
        }
    },
    onLoad: function () {
        const that = this;
        this.compData = this.selectComponent("#comp");
        this.compData.show(1);
        app.getData('GET','/api/rank',{},(result)=> {
            console.log(result)
            if (result.statusCode !== 200) {
                return false;
            }
            that.setData({
                list:result.data
            })

        })


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

                                            app.getData('GET','/api/user',{
                                                openID: app.data.openid,
                                            },(res)=>{
                                                const obj = res.data;
                                                console.log(res)
                                                if (res.statusCode !== 200) {
                                                    return false;
                                                }
                                                that.setData({
                                                    my:obj
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

    }


})
