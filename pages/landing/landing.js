// pages/landing/landing.js
Page({
  data: {
  },
  onLoad: function () {
    this.getUserLocation()
    this.checklogin()
  },
  userInfoHandler: function(data) {
    console.log(data)
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        console.log(res)
        wx.BaaS.auth.updateUserInfo(res).then(user => {
          console.log(user)
          this.navigateToIndex()
          wx.setStorageSync('user', user)
          }, err => {
            console.log(err)
        })
      }
    })
  },
  checklogin: function () {
    let user = wx.getStorageSync('user')
    if (user) {
      this.setData({
        currentUser: user
      })
    }
    console.log(user)
  },
  getUserLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res)
      }
    })
  },
  navigateToIndex: function(e) {
    wx.switchTab({
      url: `/pages/index/index`,
    })
  }
})