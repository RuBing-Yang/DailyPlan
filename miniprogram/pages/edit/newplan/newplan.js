// pages/edit/newplan/newplan.js
let now = new Date();
var app = getApp();

Page({
    data: {
        index: 0,
        list: [     //WeUI的INDEX页面
            {
                id: '国家',
                name: '表单'
            },
            {
                id: 'layout',
                name: '基础组件'
            }
        ],
        now:now.toString(),
        new_planname:'',
        new_content:'',
        new_dates:now.getFullYear().toString()+'-'+(now.getMonth()<9?'0'+(now.getMonth()+1).toString():(now.getMonth()+1).toString())+'-'+(now.getDate()<10?'0'+now.getDate().toString():now.getDate().toString()),
        new_times:(now.getHours()<10?'0'+now.getHours().toString():now.getHours().toString())+':'+(now.getMinutes()<10?'0'+now.getMinutes().toString():now.getMinutes().toString()),
    },
    //  更改文本内容确定事件
    input_name:function(e){
        console.log(e.detail.value)
        this.setData({
            new_planname: e.detail.value
        })
    },
    input_content:function(e){
        console.log(e.detail.value)
        this.setData({
            new_content: e.detail.value
        })
    },

    //  点击时间组件确定事件  
    bindTimeChange: function (e) {
        console.log(e.detail.value)
        this.setData({
            new_times: e.detail.value
        })
    },
    //  点击日期组件确定事件  
    bindDateChange: function (e) {
        console.log(e.detail.value)
        this.setData({
            new_dates: e.detail.value
        })
    },

    //提交表单传值跳转事件
    inputSubmit:function(e){
        var warn="";
        if(this.data.new_planname==''){
            wx.showToast({
                title: '未填写计划名称',
                icon: 'none',
                duration: 500
            })
        }
        else if(this.data.new_content==''){
            wx.showToast({
                title: '未填写计划内容',
                icon: 'none',
                duration: 500
            })
        }
        else{
            console.log('提交的数据信息:',e.detail.value)
            //调用环境数据的引用
            const db=wx.cloud.database()
            const plan=db.collection('plan')
            plan.add({
                data:{
                    planname:this.data.new_planname,
                    content:this.data.new_content,
                    dates:this.data.new_dates,
                    times:this.data.new_times
                }
            })
            .then(res=>{
                console.log(res)
                wx.showToast({
                title: '提交成功',
                duration:2000
                })
            })
            .catch(err=>{
                console.log(err)
            })
            wx.reLaunch({
              url: '/pages/edit/edit',
            })
        }
    },
    //定时器提示框3秒消失
    ohShitfadeOut() {
        var fadeOutTimeout = setTimeout(() => {
        this.setData({ popErrorMsg: '' });
        clearTimeout(fadeOutTimeout);
        }, 3000);
    },

    //WeUI的INDEX页面
    kindToggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
    },
    changeTheme: function() {
        console.log(this.data);
        getApp().themeChanged(this.data.theme === 'light' ? 'dark' : 'light');
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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