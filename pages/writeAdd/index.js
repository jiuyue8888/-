
var app = getApp()
Page({
  data: {
    items: []

  },

  radioChange: function (e) {
    app.data.addressNumber = e.detail.value;
    if(app.data.recordID==undefined){
      return;
    }
    wx.navigateTo({
      url: '../submitOrder/index'
    })
  },
  
  gotoUrlAddress: function (e) {
    console.log(e);
    var obj = e.currentTarget;
    var name = obj.dataset['name'];
    var id = obj.dataset['id'];
    var address = obj.dataset['address'];
    if (name !== undefined) {
      app.data.addressEditor = {
        name,
        address,
        id
      };
    } else {
      app.data.addressEditor = '';
    }
    wx.navigateTo({
      url: '../addAddress/index'
    })
  },

  //导入微信
  getWxAdd: function () {
    const that = this;
    wx.getSetting({
      success: (res) => {
        console.log(res);
        if (res.authSetting['scope.address']) {
          wx.chooseAddress({
            success: (add) => {
              app.getData('POST','/api/address',{
                openID: app.data.openid,
                province: add.provinceName,
                zipCode: 210000,
                city: add.cityName,
                district: add.countyName,
                detail: add.detailInfo,
                name: add.userName,
                cellphone: add.telNumber
              },res=>{
                console.log(res)
                if(res.statusCode!==200){
                  wx.showModal({
                    content:res.data
                  })
                  return;
                }
                const name = add.userName + ',' + add.telNumber;
                const address = add.provinceName + ',' + add.cityName + ',' + add.countyName + ',' + add.detailInfo
                let items = that.data.items;
                items.unshift({
                  name,
                  address
                })

                that.setData({
                  items,
                })
              })



            }
          })
        } else {
          wx.openSetting({

          })
        }

      }
    })
  },
  onLoad: function () {
    const that = this;
    app.getData('GET','/api/address',{
      openID: app.data.openid,
    },res=>{
      const obj = res.data;
      let items=[];
      obj.map(data=>{
        const name = data.name + ',' + data.cellphone;
        const address = data.province + ',' + data.city + ',' + data.district + ',' + data.detail;
        items.push({
          name,
          address,
          id:data.addressID
        });
      })

      that.setData({
        items
      })
    })

  },

})
