// pages/list/passage2/passage2.js

Page({
    data: {
        like:'/images/icon/like.png',
        islike:false,
        passage2:[{
            num:'1',
            words:'公司新来的程序员找bug'
        },
        {
            num:'2',
            words:'第一次用 CSS的时候'
        },
        {
            num:'3',
            words:'双核CPU的真相'
        },
        {
            num:'4',
            words:'实习生改bug'
        },
        {
            num:'5',
            words:'最牛叉的代码'
        },
        {
            num:'6',
            words:'当年学C语言的过程'
        },
        {
            num:'7',
            words:'千万别乱动老项目'
        },
        {
            num:'8',
            words:'刚修复了Bug，我给老板演示的时候:'
        },
        {
            num:'9',
            words:'调试bug'
        },
        {
            num:'10',
            words:'正在调试，突然内存溢出了'
        },
        {
            num:'11',
            words:'程序员的最高荣誉'
        },
        {
            num:'12',
            words:'程序员面试'
        },
    ]
    },
    onLoad: function (options) {
        wx.cloud.database().collection('likelist')
        .where({
            _openid: getApp().globalData.openid,
            num:'2',
            name: "轻松一刻",
            desc: "公司实习生是这样找bug的"
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
                num:'2',
                name: "轻松一刻",
                desc: "公司实习生是这样找bug的"
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
                    num:'2',
                    name: "轻松一刻",
                    desc: "公司实习生是这样找bug的"
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
