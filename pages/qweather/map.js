// pages/qweather/map.js

// 引入高德地图
const amap = require('../../utils/amap-config')

var markersData = []

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 展示当前点的文本信息
  showMarkerInfo: function(markers, i) {
    this.setData({
      textData: {
        name: markers[i].name,
        address: markers[i].address,
        location: markers[i].longitude+','+markers[i].latitude
      }
    })
  },

  // 更改当前点的图标
  changeMarkerIcon: function(markers, i) {
    var that = this
    var tmp = []
    for (let j = 0; j < markers.length; j++) {
      if (j == i) {
        markers[j].iconPath = '../../static/images/marker_checked.png'
      } else {
        markers[j].iconPath = '../../static/images/marker.png'
      }

      tmp.push({
        id: markers[j].id,
        latitude: markers[j].latitude,
        longitude: markers[j].longitude,
        iconPath: markers[j].iconPath,
        width: markers[j].width,
        height: markers[j].height,
      })
    }
    // 赋值
    that.setData({
      markers: tmp
    })
  },

  // 点击地图上的标记点
  markertap: function(e) {
    const id = e.detail.markerId
    // 展示当前点的文本信息
    this.showMarkerInfo(markersData, id)

    // 高亮当前选中的点
    this.changeMarkerIcon(markersData, id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    var that = this

    // 将关键字设置为标题
    wx.setNavigationBarTitle({
      title: '周边' + options.keyword,
    })

    // 使用高德地图 API - 查找周围的兴趣点
    amap.map.getPoiAround({
      querykeywords: options.keyword,
      success: function(data) {
        console.log('poi', data)
        // 将获取的数据，赋值给全局变量
        markersData = data.markers;
        if (markersData.length > 0) {
          that.setData({
            markers: markersData,
            latitude: wx.getStorageSync('latitude'),
            longitude: wx.getStorageSync('longitude')
          })

          // 高亮第一个点
          that.showMarkerInfo(markersData, 0)
          that.changeMarkerIcon(markersData, 0)
        }
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