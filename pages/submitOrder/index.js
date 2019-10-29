
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

    console.log(app.answer.items[0])
    let data = app.answer.items[0];
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
