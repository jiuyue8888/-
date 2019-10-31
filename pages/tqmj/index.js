
var app = getApp()
Page({
  data: {
    top:'../../images/topimg.png',
    img:'../../images/pj.png',
    font1:"388",
    font2:"啤酒名称",
    font4:"啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述",
    font5:"行酒令将为您节省2000元",
    movies: []
  },
  onLoad: function () {
    const data = app.data.answer.items[0];
    this.setData({
      top: '../../images/topimg.png',
      img: data.picURL,
      font1: data.spec.split(',')[0],
      font2: data.itemName,
      font4: data.story,
      font5: "行酒令将为您节省2000元",
      movies:data.videoURL.split(',')
    })
  }


})
