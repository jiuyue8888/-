//app.js
App({
  data:{
    url:'https://wangtest.pinet.cn',
    cardId:'42fbd0f3f54811e99f8b0c5b8f279a64',
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
  /*getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },*/
  onLoad:function(){
    console.log(333)
  },
  globalData:{
    userInfo:null
  }
})