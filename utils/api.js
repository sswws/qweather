// 接口地址
const BASE_URL = "https://devapi.qweather.com/v7"

// 应用 key
const KEY = "801cc01c22be4bf9992da6141d1f5928"

/**
 * API 请求函数
 */
const request = (url, method, data) => {
    // 设置请求 key
    data.key = KEY
    return new Promise((resolve, reject) => {
        wx.request({
            method: method,
            url: url,
            data: data,
            header: {
                // 严格：application/json(MIME类型)
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                // 停止
                console.log("index页面请求数据失败")
                reject(err)
            }
        })
    })
}

/**
 * 导出接口
 */
module.exports = {
    // 未来三天天气预报
    threedays: (data) => {
        return request(BASE_URL + '/weather/3d', 'get', data)
    }
}