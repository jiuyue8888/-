//app.js
App({
  data:{
    url:'https://wangtest.pinet.cn',
    cardId:'c73057baf7a211e989b398e0d9a0bf07',
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

  onLoad:function(){
    console.log(333)
  },
  globalData:{
    userInfo:null
  }
})