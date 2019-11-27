//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        num: 4,
        avatarPic: app.data.avatarPic,

        bjList: [],
        resultData: app.data.resultData,
        boxList: [
            1,
            2,
            6,
            12
        ],
        clickList:[],
        show: false,//宝箱动画是否显示
        textShow: false,
        times: 10//暴击多少倍
    },
    onLoad: function () {

        wx.showShareMenu();
        let that = this;
        wx.getUserInfo({
            success: function (res) {
                var userInfo = res.userInfo
                var avatarUrl = userInfo.avatarUrl

                that.setData({
                    avatarPic: avatarUrl,
                    gif:'https://wangtest.pinet.cn/Pic/cartoon/bxkq.gif'
                })
            }
        })

        app.getData('POST','/api/end',{
            topic: 1,
            cardID: app.data.cardId,
            openID: app.data.openid,
            location: '',
            results: app.data.answerMeg
        },res=>{
            console.log(res)
            app.data.recordID = res.data.recordID;
            const list = app.data.boxList;
            let arr = [];
            let brr = [0,0,0,0];
            app.data.final = 0;

            list!==undefined&&list!==null&&Object.keys(list).map(item=>{
                arr.push({
                    final:list[item].final,
                    times:list[item].times,
                    initMoney:list[item].initMoney,
                });

                list[item].initMoney == 1?brr[0]=list[item].initMoney:'';
                list[item].initMoney == 2?brr[1]=list[item].initMoney:'';
                list[item].initMoney == 6?brr[2]=list[item].initMoney:'';
                list[item].initMoney == 12?brr[3]=list[item].initMoney:'';
                app.data.final += list[item].final;
            });

            that.setData({
                resultData: {
                    percentage: res.data.percentage,
                    wineScore: res.data.wineScore,
                    status: res.data.status,
                },
                bjList: arr,
                clickList: brr

            });
            console.log(this.data.clickList);
            console.log(this.data.clickList.indexOf(6));
            console.log(this.data.clickList.indexOf(6)<0);
            app.getData('POST','/api/addwine',{
                openID: app.data.openid,
                addWine: res.data.wineScore,
            },()=>{

            })

        })


    },
    boxTap: function (e) {
        var obj = e.currentTarget;
        var query = obj.dataset['num'];

        var that = this;
        if(that.data.show){
            return;
        }
        var clickList = that.data.clickList;
        if(clickList.indexOf(query)>=0){
            return;
        }
        query == 1?clickList[0]=query:'';
        query == 2?clickList[1]=query:'';
        query == 6?clickList[2]=query:'';
        query == 12?clickList[3]=query:'';
        that.setData({
            clickList,
        })
        app.getData('POST','/api/opencase',{
            recordID: app.data.recordID,
            initMoney: query
        },res=>{
            if(typeof res.data == "string"){
                wx.showModal({
                    content:res.data
                });
                return;
            }

            let brr = [];
            app.data.final = 0;
            Object.keys(res.data).map(item=>{
                brr.push({
                    final:res.data[item].final,
                    times:res.data[item].times,
                })
                app.data.final+=res.data[item].final;
            });
            that.setData({
                show: true,
                bjList:brr,
                times:brr[brr.length-1].times,
            });
            setTimeout(() => {
                that.setData({
                    textShow: true
                })
            }, 500);
            setTimeout(() => {
                that.setData({
                    textShow: false
                })
            }, 2800);
            setTimeout(() => {
                that.setData({
                    show: false,
                })

            }, 3000);
        })

    }
})
