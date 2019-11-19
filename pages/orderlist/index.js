
var app = getApp()
Page({
  data: {
    items: [
      {
        time:'2019/05/01 12:00:00',
        name:'[郎牌·总理府] 嘉宾',
        text:'52度 500ML 浓香型 白酒 礼盒装',
        num:'待收货'
      },{
        time:'2019/05/01 12:00:00',
        name:'[郎牌·总理府] 嘉宾',
        text:'52度 500ML 浓香型 白酒 礼盒装',
        num:'待收货'
      },{
        time:'2019/05/01 12:00:00',
        name:'[郎牌·总理府] 嘉宾',
        text:'52度 500ML 浓香型 白酒 礼盒装',
        num:'待收货'
      }
    ]

  },

  onLoad: function () {
    const that = this;
    let arr = [];
    wx.request({
      url: app.data.url + '/api/orderlist',
      method: 'GET', //请求方式
      data: {
        openID: app.data.openid,
      },//请求参数
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        const obj = res.data;

        console.log(res)
        if(res.statusCode!=200){
          return false;
        }
        obj.map(item=>{
          let newD = {};
          wx.request({
            url: app.data.url + '/api/item',
            method: 'GET', //请求方式
            data: {
              itemID: item.itemID,
            },//请求参数
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            success: function (it) {
              const data = it.data;
              if(it.statusCode!=200){
                return false;
              }
              newD.time = item.createTime;
              newD.num = item.status == 1?'待收货':'已收货';
              newD.name = data.itemName;
              newD.text = data.spec.split(',')[0]+'型，'+data.spec.split(',')[1]+'，'+data.spec.split(',')[2]+'度'
              arr.push(newD);
              that.setData({
                items:arr
              })
            }
          });
        })

      }
    });
  },

})
