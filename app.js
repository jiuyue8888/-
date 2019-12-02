//app.js
App({
  data:{
    url:'https://api.dingtiger.com/',
    cardId:'',
    answerMeg:[],
    addressNumber:0,
    resultData:{
      percentage: '',
      wineScore: '',
      status: ''
	}
  },
  getData:function(method,url,data,call=()=>{}){
    const that = this;
    wx.request({
      url: that.data.url + url,
      method: method, //请求方式
      data: data,//请求参数
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cookie":wx.getStorageSync("token")
      },
      success: function (res) {
        call(res)
      }
    });
  }

})
