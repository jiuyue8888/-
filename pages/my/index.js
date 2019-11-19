
var app = getApp()
Page({
    data: {
        avatarPic:app.data.avatarPic
    },
    onLoad: function () {
        const that = this;
        this.compData = this.selectComponent("#comp");
        this.compData.show(2);
        this.setData({
            avatarPic:app.data.avatarPic
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
