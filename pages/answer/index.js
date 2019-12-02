
var app = getApp()
Page({
  data: {
    show:0,
    totalTime:30,//时限
    nowTime:0,// 当前时间百分比
    n_time:0,//++的时间
    isClick:false,//是否点击
    query:'',
    mT:0,
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
    const that = this;
    let arr=[];
    let questions = app.data.answer.questions;

    for(let i in questions){
      const item = questions[i];
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
    this.mt = setInterval(()=>{
      let b = that.data.mT;
      b++;
      that.setData({
        mT:b
      })
    },1000)

  },
  timeHandle:function(){
    var that = this;
    var n = that.data.show;
    var totalTime = that.data.totalTime;
    this.st = setInterval(function(){
      if(that.data.show+2 > that.data.answer.length && that.data.n_time == totalTime){
        clearInterval(that.st);
        clearInterval(that.mt);
        clearInterval(that.time);
        app.data.answerMeg[0] = that.data.mT;
        app.data.answerMeg[that.data.show+1] = '0';
        wx.reLaunch({url: '../result/index'});
      } else {
        app.data.answerMeg[that.data.show+1] = '0';
        n++;
        
        if(that.data.n_time+1 == totalTime){
          that.setData({
            n_time:0,
          })
        }
        that.setData({
          show:n,
          nowTime:0
        })
      }

    },totalTime*1000);

    let nT = that.data.n_time;
    this.time = setInterval(()=>{
      nT = that.data.n_time;
      
      if(nT < totalTime){
        nT++;
        that.setData({
          n_time:nT,
          nowTime:parseInt(nT/totalTime*100)
        })
      }else{

        nT = totalTime;
        that.setData({
          n_time:nT,
          nowTime:parseInt(nT/totalTime*100)
        })
        
      }
        
    },1000)
  },
  listClick:function(e){
    var obj = e.currentTarget;
    var query = obj.dataset['num'];
    var aws = obj.dataset['aws'];
    var id = this.data.show;
    var that = this;
    this.setData({
      num:query,
      n_time:0,
      query:aws==query?'anR':'anW',
    })
    app.data.answerMeg[id+1]=aws==query?'1':'0';

    id++;
    setTimeout(()=>{
      if(id == that.data.answer.length){
        clearInterval(that.st);
        clearInterval(that.mt);
        clearInterval(that.time);
        app.data.answerMeg[0] = that.data.mT;
        wx.reLaunch({url: '../result/index'})
  
      } else {
        that.setData({
          num:'',
          show:id,
          nowTime:0,
          n_time:0,
        })
      }
    },500)
    

  }



})
