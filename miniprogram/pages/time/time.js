// pages/time/time.js
var importantDates=new Array();
Page({
    data: {
      year: 0,
      month: 0,
      date: ['日', '一', '二', '三', '四', '五', '六'],
      dateArr: [],
      isToday: 0,
      isTodayWeek: false,
      todayIndex: 0,
      importantDates:[],
      label: ""
    },

    //生命周期函数：页面加载初始化
    onLoad: function () {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        this.setData({
          year: year,
          month: month,
          isToday: '' + year + month + now.getDate()
        })
        const db = wx.cloud.database()
        const importantDays = db.collection('importantDays')
        importantDays.where({
            _openid: getApp().globalData.openid
        })
        .get().then(res=>{
            console.log(res.data)
            res.data.forEach(function (item) {
              importantDates.push(item.day)
            });
            console.log(importantDates)
            this.dateInit();
        })
        .catch(err=>{
            console.log(err)
        })
    },

    remove: function(array,val){
        for (var i = 0; i < array.length; i++) {
            if (array[i] == val){
              array.splice(i, 1);
              return i;
            }
        }
        return -1; 
    },

    //点击日期更新数据
    bindImportant: function(e){
        const db = wx.cloud.database()
        const importantDays = db.collection('importantDays')
        importantDays.where({
          // _openid: getApp().globalData.openid,
          day:this.data.year.toString()+(this.data.month<10?'0':'')+this.data.month.toString()+(e.currentTarget.dataset.datenum<10?'0':'')+e.currentTarget.dataset.datenum.toString()
        })
        .get().then(res=> {
            if(res.data.length==0){
                importantDays.add({
                  data:{
                      // _openid: getApp().globalData.openid,
                      day:this.data.year.toString()+(this.data.month<10?'0':'')+this.data.month.toString()+(e.currentTarget.dataset.datenum<10?'0':'')+e.currentTarget.dataset.datenum.toString()
                  }
                })
                importantDates.push(this.data.year.toString()+(this.data.month<10?'0':'')+this.data.month.toString()+(e.currentTarget.dataset.datenum<10?'0':'')+e.currentTarget.dataset.datenum.toString())
                this.dateInit(this.data.year, this.data.month-1);
            }
            else{
                importantDays.where({
                  // _openid: getApp().globalData.openid,
                  day:this.data.year.toString()+(this.data.month<10?'0':'')+this.data.month.toString()+(e.currentTarget.dataset.datenum<10?'0':'')+e.currentTarget.dataset.datenum.toString()
                })
                .remove()
                importantDates.splice(importantDates.indexOf(this.data.year.toString()+(this.data.month<10?'0':'')+this.data.month.toString()+(e.currentTarget.dataset.datenum<10?'0':'')+e.currentTarget.dataset.datenum.toString()),1)
                this.dateInit(this.data.year, this.data.month-1);
            }
        })
    },

    //更新日历显示
    dateInit: function (setYear, setMonth) {
        console.log(setYear, setMonth)
        console.log(importantDates)
        //全部时间的月份都是按0~11基准，显示月份才+1
        let dateArr = [];                        //需要遍历的日历数组数据
        let arrLen = 0;                            //dateArr的数组长度
        let now = setYear ? new Date(setYear, setMonth) : new Date();
        let year = setYear || now.getFullYear();
        let nextYear = 0;
        let month = setMonth || now.getMonth();                    //没有+1方便后面计算当月总天数
        let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
        let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay();               //目标月1号对应的星期
        let dayNums = new Date(year, nextMonth, 0).getDate();                //获取目标月有多少天
        let obj = {};
        let num = 0;
    
        if (month + 1 > 11) {
            nextYear = year + 1;
            dayNums = new Date(nextYear, nextMonth, 0).getDate();
        }
        arrLen = startWeek + dayNums;
        for (let i = 0; i < arrLen; i++) {
            if (i >= startWeek) {
            num = i - startWeek + 1;
            obj = {
                isToday: '' + year + (month + 1) + num,
                dateyear:year,
                datemonth:month,
                datenum: num,
                weight: 5,
                //查找是否在重要日期数组中
                isimportant:importantDates.indexOf(year.toString()+(month<9?'0':'')+(month+1).toString()+(num<10?'0':'')+num.toString())!=-1
            }
            } else {
            obj = {};
            }
            dateArr[i] = obj;
        }
        this.setData({
            dateArr: dateArr
        })
    
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear();
        let nowMonth = nowDate.getMonth() + 1;
        let nowWeek = nowDate.getDay();
        let getYear = setYear || nowYear;
        let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    
        if (nowYear == getYear && nowMonth == getMonth) {
            this.setData({
            isTodayWeek: true,
            todayIndex: nowWeek
            })
        } else {
            this.setData({
            isTodayWeek: false,
            todayIndex: -1
            })
        }
    },

    //按下向左箭头
    lastMonth: function () {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
      let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
      this.setData({
        year: year,
        month: (month + 1)
      })
      this.dateInit(year, month);
    },
    //按下向右箭头
    nextMonth: function () {
      let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
      let month = this.data.month > 11 ? 0 : this.data.month;
      this.setData({
        year: year,
        month: (month + 1)
      })
      this.dateInit(year, month);
    }
  })