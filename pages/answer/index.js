
var app = getApp()
Page({
  data: {
    show:0,
    isClick:false,//是否点击
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
    console.log(app.answer.questions)
    app.answer.questions.map(item=>{
      const obj = {};
      obj.question = item.question;
      obj.answers = JSON.parse(item.answers);
      obj.qId = item.questionID;
      arr.push(obj);
      console.log(arr)
    })
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
    var id = this.data.show;
    var rid = this.data.answer[id].r;

    if(query == rid){
      obj.classList += ' anR';

    }else{
      obj.class = ' anW';
    }
    if(id > this.data.answer.length - 2){
      clearInterval(this.st);
      return;
    }
    id++;
    this.setData({
      isClick:true,
      show:id
    })
  }



})
