
var app = getApp()
Page({
  data: {
    img: '',
    name: '',
    price1: '',
    price2: '',
    userName: '',
    inputValue: '',
    userAdd: '',
    input:app.data.isFalse?app.data.keyID:''
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
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
      price2: app.data.activeMoney==undefined?data.spec.split(',')[0]-app.data.final:app.data.activeMoney,
      input:app.data.isFalse?app.data.keyID:''
    })

    app.getData('GET','/api/address',{
      openID: app.data.openid,
    },res=>{
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
    })

  },
  submitClick:function(){
    app.getData('POST','/api/order',{
      openID: app.data.openid,
      cardID:app.data.cardId,
      itemID:app.data.itemIDList,
      address:this.data.userName+','+this.data.userAdd,
      keyID:app.data.isFalse?app.data.keyID:this.data.inputValue
    },res=>{
      console.log(res);
      if(res.data != "订单提交成功!"){
        wx.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        })

      }else{
        app.data.recordID=undefined;
        wx.reLaunch({
          url: '../orderSeccuss/index'
        })
      }

    })
  }
})
