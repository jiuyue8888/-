//app.js
App({
  data:{
    url:'https://wangtest.pinet.cn',
    cardId:'42fbd891f54811e98b180c5b8f279a64',
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