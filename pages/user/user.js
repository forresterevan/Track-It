// pages/user/user.js
Page({
  data: {
    toggle: 'favorite'
  },

  toggleTab: function (e) {
    let type = e.currentTarget.dataset.type;
    this.setData({toggle: type})
  },


  userInfoHandler: function () {
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        console.log(res)
        wx.BaaS.auth.updateUserInfo(res).then(user => {
          console.log(user)
          wx.setStorageSync('user', user)
          this.setData({currentUser: user})
          this.getMyJobs()
          }, err => {
            console.log(err)
        })
      }
    })
  },
  navigateToShow: function (e) {
    wx.navigateTo({
      url: `/pages/show/show?id=${e.currentTarget.dataset.id}`,
    })
  },
  onLoad: function (options) {
    let currentUser = wx.getStorageSync('user')
    if (currentUser) {
      this.setData({ currentUser: currentUser })
      this.getMyJobs()
      this.getPostedJobs()
    }
  },
  onShow: function () {
    this.getMyJobs()
    this.getPostedJobs()
  },
  getMyJobs: function () {
    let favoriteJobs= new wx.BaaS.TableObject('favorite_jobs')
      let query = new wx.BaaS.Query()
      let currentUserId = this.data.currentUser.id.toString()
      query.compare('user_id', '=', currentUserId)
      favoriteJobs.setQuery(query).expand(['job_id']).find().then(res => {
        console.log(res)
        this.setData({favoriteJobs: res.data.objects})
      })
  },
  getPostedJobs: function () {
    let postedJob = new wx.BaaS.TableObject('jobs')
    let query = new wx.BaaS.Query()
    let currentUserId = this.data.currentUser.id
    query.compare('created_by', '=', currentUserId)
    postedJob.setQuery(query).expand(['job_id']).find().then(res => {
      console.log(res)
      this.setData({postedJobs: res.data.objects})
    })
  },

})