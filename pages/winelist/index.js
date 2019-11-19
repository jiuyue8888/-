
var app = getApp()
Page({
  data: {
    items: [
      {
        time:'2019/05/01 12:00:00',
        name:'[酒场攻防]',
        text:'4',
        num:'200酒力'
      },{
        time:'2019/05/01 12:00:00',
        name:'[酒场攻防]',
        text:'5',
        num:'200酒力'
      },{
        time:'2019/05/01 12:00:00',
        name:'[酒场攻防]',
        text:'6',
        num:'200酒力'
      }
    ]

  },

  onLoad: function () {
    const that = this;
    wx.request({
      url: app.data.url + '/api/recordlist',
      method: 'GET', //请求方式
      data: {
        openID: app.data.openid,
      },//请求参数
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        const obj = res.data;
        console.log(obj)
        that.setData({
          items:obj
        })
      }
    });
  },

})
