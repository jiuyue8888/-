
var app = getApp()
Page({
  data: {
    show:0,
    isClick:false,//是否点击
    query:'',
    answer:[
      {
        question:"这里是问题1",
        answers:[
            "a",
            "b",
            "c",
            "d"
        ],
        questionID:""
      }
    ]
  },
  onLoad: function () {
    this.timeHandle();
    let arr=[];
    let questions = app.data.answer.questions;

    for(let i in questions){
      const item = questions[0];
      const obj = {};
      obj.question = item.question;
      obj.answers = JSON.parse(item.answers);
      obj.qId = item.questionID;
      obj.key = Object.keys(obj.answers);
      arr.push(obj);
    }

    this.setData({
      answer:arr
    })

  },
  timeHandle:function(){
    var that = this;
    var n = that.data.show;
    this.st = setInterval(function(){
      if(that.data.show > that.data.answer.length - 2){
        clearInterval(that.st)
      } else {
        n++;
        that.setData({
          show:n
        })
      }

    },200000);

  },
  listClick:function(e){
    var obj = e.currentTarget;
    var query = obj.dataset['num'];
    var aws = obj.dataset['aws'];
    var id = this.data.show;
    var that = this;
    this.setData({
      num:query,
      query:aws==query?'anR':'anW',
    })

    id++;
    setTimeout(()=>{
      if(id == that.data.answer.length){
        clearInterval(this.st);
        wx.navigateTo({
          url: '../result/index'
        })

      } else {
        that.setData({
          show:id
        })
      }

    },300)


  }



})
