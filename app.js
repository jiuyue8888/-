//app.js
App({
  data:{
    url:'https://wangtest.pinet.cn',
    cardId:'',
    answerMeg:[],
    addressNumber:0,
    resultData:{
      percentage: '',
      wineScore: '',
      status: ''
	},
    aaa:[
      "f7fa60aa0f8911ea869e0242ac110003",
      "f7fbf5b40f8911ea869e0242ac110003",
      "f7fbfd020f8911ea869e0242ac110003",
      "f7fc02480f8911ea869e0242ac110003",
      "f7fc06c60f8911ea869e0242ac110003",
      "f7fc0b800f8911ea869e0242ac110003",
      "f7fc0fcc0f8911ea869e0242ac110003",
      "f7fc13b40f8911ea869e0242ac110003",
      "f7fc17920f8911ea869e0242ac110003",
      "f7fc1b7a0f8911ea869e0242ac110003",
      "f7fc1f440f8911ea869e0242ac110003",
      "f7fc230e0f8911ea869e0242ac110003",
      "f7fc26d80f8911ea869e0242ac110003",
      "f7fc2aa20f8911ea869e0242ac110003",
      "f7fc2f520f8911ea869e0242ac110003"

    ]
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
