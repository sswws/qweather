// app.js
App({
  onLaunch() {
    console.log("onLaunch - 小程序加载")
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
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
        // 可以将 res 发送给后台解码出 unionId
        console.log(res)
        this.globalData.userInfo = res.userInfo

        // 由于 getuserInfo 是网络请求，可能会在 page.onload 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  onShow: function() {
    console.log("onShow - 小程序显示")
  },
  onHide: function() {
    console.log("onHide - 小程序隐藏")
  },
  globalData: {
    userInfo: null
  },
})
