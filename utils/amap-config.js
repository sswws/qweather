const amapfile = require('amap-wx.js');

// 实例化高德地图
const map = new amapfile.AMapWX({
  key: "1b92746a0f5edf263a160f8c164241b5"
})

// 导出
module.exports = {
  map
}