
var app = getApp()
Page({
  data: {

  },
  onLoad: function () {
    const that = this;
    this.compData = this.selectComponent("#comp");
    this.compData.show(0);

  },
  gomy:function(){
    wx.navigateTo({
      url: '../my/index'
    })
  }


})
