// pages/list/passage2/passage2.js

Page({

    data: {
        like:'/images/icon/like.png',
        islike:false,
        passage3:[{
            num:'1',
            words:'第一个月，我们一起来品读著作，推荐这几本书：《平凡的世界》、《万历十五年》、《三体》、《如何阅读一本书》、《人类简史》。'
        },
        {
            num:'2',
            words:'到了二月份，趁着过年的空闲时间，我们不妨来阅读这几本书：《白鹿原》、《叫魂》、《国富论》、《解忧杂货铺》。'
        },
        {
            num:'3',
            words:'三月份，春暖花开，万物复苏，这几本小说不容错过哦：《挪威的森林》、《我们仨》、《瓦尔登湖》、《月亮与六便士》、《海边的卡夫卡》。'
        },
        {
            num:'4',
            words:'四月份，静下心来，一起感受文学世界的乐趣，可以阅读这四本书：《白夜行》、《天龙八部》、《乡土中国》、《追风筝的人》。'
        },
        {
            num:'5',
            words:'五月份，天气逐渐回暖，带你阅读一些较为烧脑的书籍：《资本论》、《菊与刀》、《时间简史》、《围城》、《大数据时代》。'
        },
        {
            num:'6',
            words:'六月份，为你推荐这四本书籍，在炎热的夏季也能清凉一下。分别是：《霍乱时期的爱情》、《东方快车谋杀案》、《雪国》、《数学之美》。'
        },
        {
            num:'7',
            words:'时间来到七月份，吹着空调，吃着西瓜，捧着经典书籍读一读：《中国哲学简史》、《国史大纲》、《西方哲学史》、《百年孤独》、《乌合之众》。'
        },
        {
            num:'8',
            words:'抓住八月份的尾巴，重走一边江湖和心灵深处的世界。一起来品读：《射雕英雄传》、《理想国》、《心理学与生活》、《不能承受的生命之轻》。'
        },
        {
            num:'9',
            words:'九月份，时光步入秋季，《偷影子的人》、《明朝那些事儿》、《无人生还》、《春秋左传注》这四本书籍推荐给你！'
        },
        {
            num:'10',
            words:'十月份，在欣赏初秋美景之时，不忘翻开手中的书籍：《长恨歌》、《呼兰河传》、《高效能人士的七个习惯》、《了不起的盖茨比》。'
        },
        {
            num:'11',
            words:'十一月份，在温暖的被窝里，读一本有温度的书，不乏是一种享受。欢迎阅读：《思考，快与慢》、《小王子》、《苏菲的世界》、《这里》。'
        },
        {
            num:'12',
            words:'十二月份，今年的最后一个月份，坚持阅读，坚持这份热爱，完成最后四本书：《鲍勃·迪伦诗歌集》、《一个广告人的自白》、《BBC科普三部曲》、《人类的群星闪耀时》。'
        },
    ]
    },
    onLoad: function (options) {
        wx.cloud.database().collection('likelist')
        .where({
            _openid: getApp().globalData.openid,
            num:'3',
            name: "书单",
            desc: "人生必读的52本书"
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
                num:'3',
                name: "书单",
                desc: "人生必读的52本书"
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
                    num:'3',
                    name: "书单",
                    desc: "人生必读的52本书"
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