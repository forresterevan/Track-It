// pages/user/user.js
Page({
  data: {
    toggle: 'favorite'
  },

  // Lifecycle Functions
  onShow: function () {
    let user = wx.getStorageSync('user');
    if (user) {
      this.setData({ user })
      this.getFavorites()
      this.getPosts()
    }
  },

  // Custom Functions
  toggleTab: function (e) {
    let type = e.currentTarget.dataset.type;
    this.setData({toggle: type})
  },

  userInfoHandler: function () {
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        wx.BaaS.auth.updateUserInfo(res).then(user => {
          wx.setStorageSync('user', user)
          this.setData({ user })
          this.getFavorites();
          this.getPosts();
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

  getFavorites: function () {
    let favoriteJobs= new wx.BaaS.TableObject('favorite_jobs')
      let query = new wx.BaaS.Query()
      let userId = this.data.user.id.toString()
      query.compare('user_id', '=', userId)
      favoriteJobs.setQuery(query).expand(['job_id']).find().then(res => {
        console.log(res)
        this.setData({favoriteJobs: res.data.objects})
      })
  },

  getPosts: function () {
    let postedJob = new wx.BaaS.TableObject('jobs')
    let query = new wx.BaaS.Query()
    let userId = this.data.user.id
    query.compare('created_by', '=', userId)
    postedJob.setQuery(query).expand(['job_id']).find().then(res => {
      console.log(res)
      this.setData({postedJobs: res.data.objects})
    })
  }

})