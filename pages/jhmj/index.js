
var app = getApp()
Page({
  data: {
    top: app.data.topImg,
    img: '',
    font1: "388",
    font2: "啤酒名称",
    font4: "啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述啤酒描述",
    font5: "行酒令暴击返利将为您节约0元"
  },
  jhmjClick: function () {
    app.getData('POST','/api/activewine',{
      itemID: app.data.itemIDList,
      activeMoney: 212,
      recordID: app.data.recordID
    },(res)=>{
      wx.navigateTo({
        url: '../tqmj/index'
      })
    })

  },
  onLoad: function () {
    const that = this;
    if (app.data.answer !== undefined) {
      const data = app.data.answer.items[0];
      console.log(data)
      this.setData({
        top: app.data.topImg,
        img: data.picURL,
        font1: data.spec.split(',')[0],
        font2: data.itemName,
        font4: data.story,
        font5: "行酒令暴击返利将为您节约"+app.data.final+"元"
      })
    } else {
      app.getData('GET','/api/item',{
        itemID: app.data.itemIDList
      },res=>{
        console.log(app.data)
        that.setData({
          top: app.data.topImg,
          img: res.data.picURL,
          font1: res.data.spec.split(',')[0],
          font2: res.data.itemName,
          font4: res.data.story,
          font5: "行酒令暴击返利将为您节约"+app.data.final+"元"
        })
      })

    }
    var obj=wx.createSelectorQuery();
    obj.select('#text').boundingClientRect();
    obj.exec(res=>{
      console.log(res)
      that.h = res[0].height;

      this.animation = wx.createAnimation({
        duration:600,
        success:function(res) {

        }
      });
      let t = 0;

      console.log(this.h);
      this.st = setInterval(()=>{
        if(t < 120){
          t+=20;
        }else{
          t=0;
        }

        that.animation.translateY(-t).step();
        that.setData({

          animation: this.animation.export()
        })
      },2000)
    });



  },
  onReady:function () {


  }


})
