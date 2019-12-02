
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
    this.compData = this.selectComponent("#comp");
    this.compData.show(2);
    let arr = [];
    app.getData('GET','/api/orderlist',{
      openID: app.data.openid,
    },res=>{
      const obj = res.data;

      console.log(res)
      if(res.statusCode!=200){
        return false;
      }
      obj.map(item=>{
        let newD = {};
        app.getData('GET','/api/item',{
          itemID: item.itemID,
        },it=>{
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
        })

      })
    })

  },

})
