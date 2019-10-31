
var app = getApp()
Page({
  data: {
    top: '../../images/topimg.png',
    img: '../../images/pj.png',
    font1: "388",
    font2: "啤酒名称",
    font4: "啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述",
    font5: "行酒令将为您节省2000元"
  },
  onLoad: function () {
    const that = this;
    if(app.data.answer !== undefined){
      const data = app.data.answer.items[0];
      this.setData({
        top: '../../images/topimg.png',
        img: data.picURL,
        font1: data.spec.split(',')[0],
        font2: data.itemName,
        font4: data.story,
        font5: "行酒令将为您节省2000元"
      })
    }else{
      wx.request({
        url: app.data.url + '/api/item',
        method: 'GET', //请求方式
        data: {
          itemID:app.data.itemIDList
        },//请求参数
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        success: function (res) {
          that.setData({
            top: '../../images/topimg.png',
            img: res.data.picURL,
            font1: res.data.spec.split(',')[0],
            font2: res.data.itemName,
            font4: res.data.story,
            font5: "行酒令将为您节省2000元"
          })
        }
      });
    }




  }


})
