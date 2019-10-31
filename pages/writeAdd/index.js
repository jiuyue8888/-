
var app = getApp()
Page({
  data: {
    items: [
      { name: 'USA', value: '张小明,182****6219,地址：江苏省 南京市 建邺区 云锦路 汉中门大街151号XX层XX室' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'FRA', value: '法国' },
    ]

  },
  
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
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
