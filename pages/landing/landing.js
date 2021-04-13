// pages/landing/landing.js
Page({
  data: {
  },
  onLoad: function () {
    this.getUserLocation()
  },
  userInfoHandler: function(data) {
    console.log(data)
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      console.log(user)
        // do something with the 'user' object
      }, err => {
        // might need to log the error message
    })
  },
  getUserLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res)
      }
    })
  }
})