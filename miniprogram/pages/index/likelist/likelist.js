// pages/index/likelist/likelist.js
Page({

    data: {
        lists:[]
    },


    //生命周期函数--监听页面加载
    onLoad: function (options) {
        const db = wx.cloud.database()
        const lists = db.collection('likelist')
        lists.where({
            _openid: getApp().globalData.openid
        })
        .get().then(res=>{
            this.setData({
                lists:res.data
            })
        })
        .catch(err=>{
            console.log(err)
        })
    },

    //生命周期函数--监听页面初次渲染完成
    onReady: function () {
    },
    //生命周期函数--监听页面显示
    onShow: function () {
    },
    //生命周期函数--监听页面隐藏
    onHide: function () {
    },
     //用户点击右上角分享
    onShareAppMessage: function () {
    }
})