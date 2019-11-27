
var app = getApp()
Page({
  data: {
    items: [
      {
        time:'2019/05/01 12:00:00',
        name:'[酒场攻防]',
        text:'4',
        num:'200酒力'
      },{
        time:'2019/05/01 12:00:00',
        name:'[酒场攻防]',
        text:'5',
        num:'200酒力'
      },{
        time:'2019/05/01 12:00:00',
        name:'[酒场攻防]',
        text:'6',
        num:'200酒力'
      }
    ]

  },

  onLoad: function () {
    const that = this;
    this.compData = this.selectComponent("#comp");
    this.compData.show(2);
    app.getData('GET','/api/recordlist',{
      openID: app.data.openid,
    },res=>{
      const obj = res.data;
      console.log(obj)
      that.setData({
        items:obj
      })
    })

  },

})
