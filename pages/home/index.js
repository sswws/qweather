// pages/home/index.js

// 引入高德地图
const amap = require('../../utils/amap-config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    inputShowed: false
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      tips: []
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      tips: []
    });
  },
  // 输入事件
  inputTyping: function (e) {
    console.log(e)
    if (e.detail.value == "") {
      this.setData({
        inputVal: "",
        tips: []
      });
    } else {
      this.setData({
        inputVal: e.detail.value
      });
  
      // 触发调用高德地图
      this.keyword(e.detail.value)
    }
  },

  // 根据输入的关键字，调用高德地图 API
  keyword: function(keyword) {
    var that = this
    amap.map.getInputtips({
      keywords: keyword,
      location: that.data.longitude+','+that.data.latitude,
      success: function(res) {
        console.log('tips', res)
        if (res && res.tips) {
          that.setData({
            tips: res.tips
          })
        }
      }
    })
  },

  // 跳转到路径导航页面
  goRoute: function(e) {
    if (e.currentTarget.dataset.poilocation != "") {
      wx.navigateTo({
        url: '/pages/route/walking?poilocation='+e.currentTarget.dataset.poilocation,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    // 获取经纬度信息
    that.setData({
      'latitude': wx.getStorageSync('latitude'),
      'longitude': wx.getStorageSync('longitude'),
    })

    // 逆地址解析
    amap.map.getRegeo({
      success: function(res) {
        console.log(res)
        res[0].iconPath = '/static/images/location.png'
        that.setData({
          'markers': res,
          city: wx.getStorageSync('city')
        })
      },
      fail: function(info) {
        console.log(info)
      }
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