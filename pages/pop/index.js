Component({
    properties: {
        answer:Object
    },
    data: {
        answer:{}
    },
    attached: function () {
        this.setData({
            answer:this.properties.answer
        })
    },

    methods: {
        btnClick:function(){
            this.triggerEvent('myevent', '');
        },
        answerStart:()=>{
            wx.navigateTo({
                url: '../answer/index'
            })
        }
    }
})
