//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    num: 4,
    bjList:[
      {
        a:"X2",
        b:"¥30"
      },
      {
        a:"X3",
        b:"¥40"
      },
      {
        a:"X4",
        b:"¥50"
      },
      {
        a:"X5",
        b:"¥60"
      }
    ],
    boxList: [
        "本次免费",
        "支付1元",
        "支付6元",
        "支付12元"
    ]
  },
  onLoad:function(){
    wx.showShareMenu();
    wx.request({
      url: app.data.url + '/api/end',
      method: 'POST', //请求方式
      data: {
          Topic:1,
          openID: app.data.cardId,
          location:that.data.startData.itemIDList,
          results:'3s,0,1'
      },//请求参数
      header: {
          "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
          console.log(res)
          
      }
  })

  }
})
