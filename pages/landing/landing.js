// pages/landing/landing.js
Page({
  data: {
  },
  onLoad: function () {
    //setTimeout(this.navigateToIndex, 2000);
  },

  navigateToIndex: function () {
    wx.switchTab({ url: '/pages/index/index' })
  }

})
