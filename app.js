//app.js
App({
  data:{
    url:'https://wangtest.pinet.cn',
    cardId:'b97be014ff1311e9805e0242ac110003',
    answerMeg:[],
    addressNumber:0,
    resultData:{
      percentage: '',
      wineScore: '',
      status: ''
    }
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },


  globalData:{
    userInfo:null
  }
})