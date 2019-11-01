
var app = getApp()
Page({
  data: {
    region: ['北京', '北京市', '朝阳区'],
    name: '',
    phone: '',
    address: ''
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    const value = e.detail.value;
    const region = this.data.region;
    if(value.name == ''){
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
      })
      return;
    }
    if(value.cellphone == ''){
      wx.showModal({
        title: '提示',
        content: '请输入电话',
      })
      return;
    }
    if(value.detail == ''){
      wx.showModal({
        title: '提示',
        content: '请输入详细地址',
      })
      return;
    }
    const newData = {
      openID: app.data.openid,
      province: region[0],
      zipCode: 210000,
      city: region[1],
      district: region[2],
      detail: value.detail,
      name: value.name,
      cellphone: value.cellphone
    }
    const dataNode = this.data.id !== undefined ? Object.assign(newData,{addressID:this.data.id}):newData;
    wx.request({
      url: app.data.url + '/api/address',
      method: 'POST', //请求方式
      data: dataNode,//请求参数
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        wx.navigateTo({
          url: '../writeAdd/index'
        })
      }
    });
  },
  onLoad: function () {

    if (app.data.addressEditor !== '' && app.data.addressEditor !== undefined) {
      const A = app.data.addressEditor;
      const P = A.address.split(',');
      this.setData({
        name: A.name.split(',')[0],
        phone: A.name.split(',')[1],
        region: [P[0], P[1], P[2]],
        address: P[3],
        id:A.id
      })
    }
  },

})
