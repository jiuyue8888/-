
var app = getApp()
Page({
  data: {
    items: [
      { value: '张小明,182****6219,地址：江苏省 南京市 建邺区 云锦路 汉中门大街151号XX层XX室' },
      { value: '张小明,182****6219,地址：江苏省 南京市 建邺区 云锦路 汉中门大街151号XX层XX室' },
      { value: '张小明,182****6219,地址：' },
      { value: '张小明,182****6219,地址：江苏省 南京市 建邺区 云锦路 汉中门大街151号XX层XX室' },
      { value: '张小明,182****6219,地址：江苏省 南京市 建邺区 云锦路 汉中门大街151号XX层XX室' },
      { value: '张小明,182****6219,地址：江苏省 南京市 建邺区 云锦路 汉中门大街151号XX层XX室' },
      { value: '张小明,182****6219,地址：江苏省 南京市 建邺区 云锦路 汉中门大街151号XX层XX室' }
    ]

  },
  
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  gotoUrlAddress:function(e){
    var obj = e.currentTarget;
    var type = obj.dataset['type'];
    if(type !== undefined){
      app.data.addressEditor = type;
    }else{
      app.data.addressEditor = '';
    }
    wx.navigateTo({
      url: '../addAddress/index'
    })
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
    
  },

})
