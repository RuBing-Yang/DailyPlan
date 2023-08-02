// pages/edit/edit.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        plans:[],
        blank:'目前尚无计划，点击下方加号添加',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(getApp().globalData.openid==undefined){
            wx.showToast({
                title: '请先登录',
                icon:'loading',
                duration:1000
            })
        }
        else{
            const db = wx.cloud.database()
            const plans = db.collection('plan')
            plans.where({
                _openid: getApp().globalData.openid
            })
            .get().then(res=>{
                console.log(res)
                this.setData({
                    plans:res.data,
                    blank:res.data.length==0?'目前尚无计划，点击下方加号添加':''
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    deleteplan:function(e){
        const db = wx.cloud.database()
        const plans = db.collection('plan')
        plans.where({
            _openid: getApp().globalData.openid,
            planname:e.currentTarget.dataset.planname,
            content:e.currentTarget.dataset.content,
            dates:e.currentTarget.dataset.dates,
            times:e.currentTarget.dataset.times
        })
        .remove()
        .then(res=>{
            console.log(res)
            wx.showToast({
                title: '删除成功',
                icon:'success',
                duration:1000
            })
        })
        .catch(err=>{
            console.log(err)
        })
        wx.reLaunch({
            url: '/pages/edit/edit',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})