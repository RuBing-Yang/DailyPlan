// pages/list/passage0/passage0.js
Page({
    data: {
        like:'/images/icon/like.png',
        islike:false
    },
    onLoad: function (options) {
        wx.cloud.database().collection('likelist')
        .where({
            _openid: getApp().globalData.openid,
            num:'0',
            name: "商务英语", 
            desc:"清华学霸教你快速提升商务英语"
        })
        .get().then(res=>{
            console.log(res)
            this.setData({
                like:res.data.length==0?'/images/icon/like.png':'/images/icon/like_filled.png',
                islike:res.data.length!=0
            })
        })
        .catch(err=>{
            console.log(err)
        })
    },
    liketap: function(e){
        if(this.data.islike){
            this.setData({
                like:'/images/icon/like.png',
                islike:false
            })
            const db=wx.cloud.database()
            const likelist=db.collection('likelist')
            likelist.where({
                _openid: getApp().globalData.openid,
                num:'0',
                name: "商务英语", 
                desc:"清华学霸教你快速提升商务英语"
            })
            .remove()
            .then(res=>{
                console.log(res.data)
                wx.showToast({
                    title: '取消收藏',
                    icon:'none',
                    duration:1000
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            this.setData({
                like:'/images/icon/like_filled.png',
                islike:true
            })
            const db=wx.cloud.database()
            const likelist=db.collection('likelist')
            likelist.add({
                data:{
                    num:'0',
                    name: "商务英语", 
                    desc:"清华学霸教你快速提升商务英语"
                }
            })
            .then(res=>{
                console.log(res.data)
                wx.showToast({
                    title: '收藏成功',
                    duration:1000
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
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
})