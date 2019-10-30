
var app = getApp()
Page({
  data: {
    img: '',
    name: '',
    price1: '',
    price2: '',
    userName: '',
    userTellphone: '',
    userAdd: ''
  },
  onLoad: function () {

    // 获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        this.setData({ latitude: latitude, longitude: longitude })
        wx.showModal({
          title: '当前位置',
          content: '经度' + res.longitude + '纬度' + res.latitude,
        })
      }

    })
    let data = app.data.answer.items[0];
    this.setData({
      img: data.picURL,
      name: data.spec.split(',')[0] + data.itemName,
      price1: data.spec.split(',')[0],
      price2: '',
      userName: '',
      userTellphone: '',
      userAdd: ''
    })
  },

})
