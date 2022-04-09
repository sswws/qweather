//app.js
App({
  onLaunch: function () {
    console.log('小程序 onLaunch 启动')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 首先获取地理位置信息
    // https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html
    wx.getLocation({
      type: "gcj02",
      success: res => {
        wx.setStorageSync('latitude', res.latitude)
        wx.setStorageSync('longitude', res.longitude)
      }
    })

    // 设置当前城市名称
    wx.setStorageSync('city', "洛阳市")
  },

  onShow: function() {
    console.log('小程序 onShow 显示')
  },
  onHide: function() {
    console.log('小程序 onHide 隐藏')
  },
  globalData: {
    userInfo: null
  }
})