// pages/qweather/index.js
const API = require('../../utils/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wd: {}, // 未来三天天气情况
    citylist: [], // 城市列表
    aircond: {}, // 空气质量
    indices: [], // 生活指数
    longitude: "", // 经度
    latitude: "", // 纬度
    markers: [],  //地图参数
    icon: '../../static/images/marker.png'
  },

  // 跳转到地图，然后根据关键字，查找周围的兴趣点
  doSearch: function(e) {
    if (e.currentTarget.dataset.keyword != "") {
      wx.navigateTo({
        url: '/pages/qweather/map?keyword=' + e.currentTarget.dataset.keyword,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    // 首先获取地理位置信息
    wx.getLocation({
      type: "wgs84",
      success: res => {
        // console.log('dddddttttt', res)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: [{
            id: "0",
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: "/static/images/location.png",
            width: 40,
            height: 40,
            callout: {
              'display': 'ALWAYS', 
              'fontSize': '30rpx', 
              'content': '我在这',
              'padding': '8rpx', 
              'boxShadow': '0 0 5rpx #333',
              'borderRadius':'4rpx'
            }
          }],
        })
        let data = {
          location: res.longitude+","+res.latitude
        }
    
        // 根据地理位置，获取城市信息
        API.citylist(data).then((res) => {
          if (res.code == 200) {
            that.setData({
              citylist: res.location
            })
          } else {
            wx.showToast({
              title: '正在获取城市信息',
              icon: 'loading',
              duration: 2000
            })
          }
        })
    
        // 根据地理位置，获取未来三天的天气预报
        API.threedays(data).then((res) => {
          if (res.code == 200) {
            that.setData({
              wd: res
            })
          } else {
            wx.showToast({
              title: '正在获取天气预报',
              icon: 'loading',
              duration: 2000
            })
          }
        })

        // 获取生活指数
        API.indices(data).then((res) => {
          if (res.code == 200) {
            // console.log('生活指数', res)
            that.setData({
              indices: res.daily
            })
          } else {
            wx.showToast({
              title: '正在获取生活指数',
              icon: 'loading',
              duration: 2000
            })
          }
        })

        // 获取空气质量
        API.aircond(data).then((res) => {
          if (res.code == 200) {
            // console.log('5555', res.now)
            that.setData({
              aircond: res.now
            })
          } else {
            wx.showToast({
              title: '正在获取空气质量',
              icon: 'loading',
              duration: 2000
            })
          }
        })
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