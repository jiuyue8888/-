
var app = getApp()
Page({
  data: {
    img: '',
    name: '',
    price1: '',
    price2: '',
    userName: '',
    userAdd: ''
  },
  onLoad: function () {
    const that = this;
    // 获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        this.setData({ latitude: latitude, longitude: longitude })

        app.data.location = [res.longitude, res.latitude]

      }
    })

    let data = app.data.answer.items[0];
    this.setData({
      img: data.picURL,
      name: data.spec.split(',')[0] + data.itemName,
      price1: data.spec.split(',')[0],
      price2: '',
    })

    wx.request({
      url: app.data.url + '/api/address',
      method: 'GET', //请求方式
      data: {
        openID: app.data.openid,
      },//请求参数
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        const obj = res.data;
        if (obj.length > 0) {
          console.log(obj[app.data.addressNumber])
          const newObj = obj[app.data.addressNumber];
          that.setData({
            have: true,
            userName: newObj.name + ',' + newObj.cellphone,
            userAdd: newObj.province + ',' + newObj.city + ',' + newObj.detail
          })
        }

      }
    });
  },
  submitClick:function(){
    wx.request({
      url: app.data.url + '/api/order',
      method: 'POST', //请求方式
      data: {
        openID: app.data.openid,
        cardID:app.data.cardId,
        itemID:app.data.itemIDList,
        address:this.data.userName+','+this.data.userAdd
      },//请求参数
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        wx.navigateTo({
          url: '../orderSeccuss/index'
        })
      }
    });
  }
})
