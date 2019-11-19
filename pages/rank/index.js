
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
        wx.request({
            url: app.data.url + '/api/rank',
            method: 'GET', //请求方式
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: (result)=> {
                console.log(result)
                if (result.statusCode !== 200) {
                    return false;
                }
                that.setData({
                    list:result.data
                })

            }
        })
        wx.request({
            url: app.data.url + '/api/user',
            method: 'GET', //请求方式
            data: {
                openID: app.data.openid,
            },//请求参数
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            success: function (res) {
                const obj = res.data;
                console.log(res)
                if (res.statusCode !== 200) {
                    return false;
                }
                that.setData({
                    my:obj
                })
            }
        });
    }


})
