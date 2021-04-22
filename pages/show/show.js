// pages/show/show.js
Page({
  data: {
    currentUser: null,
    fav: false
  },
  // Lifecycle Functions
  onLoad: function (options) {
    let id = options.id
    // this.setData({job_id: id})
    this.checklogin();
    this.getJob(id);
  },

  // Custom Functions
  getJob: function (id) {
    let Jobs = new wx.BaaS.TableObject('jobs')
    Jobs.expand(['created_by']).get(id).then(res => {
      console.log(res.data);
      this.formatDate(res.data);
      this.getFavorites(res.data.id);
    })
  },

  formatDate: function (job) {
    let date = job.created_at * 1000;
    let options = { day: 'numeric', month: 'short', year: 'numeric' }
    date = new Date(date).toLocaleDateString('en-US', options);
    job.created_at = date
    
    this.setData({ job });
  },

  saveFavorite: function() {
    let Favorites = new wx.BaaS.TableObject("favorite_jobs")
    let favorite = Favorites.create();
    let data = {
      user_id: this.data.currentUser.id, 
      job_id: this.data.job.id
    }

    favorite.set(data).save().then(res => {
      this.setData({ favorite: res.data });
    })
  },

  removeFavorite: function () {
    let Favorites = new wx.BaaS.TableObject("favorite_jobs");
    Favorites.delete(this.data.favorite.id).then(res => {
      this.setData({favorite: null})
    })
  },

 //log-in
  onGotUserInfo: function(data) {
    let self = this
    console.log(data)
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        console.log(res)
        wx.BaaS.auth.updateUserInfo(res).then(user => {
          console.log(user)
          self.setData({currentUser: user})
          wx.setStorageSync('user', user)
          self.getFavorites();
          }, err => {
        })
      }
    })
  },

  copyID: function(e) {
    let data = e.currentTarget.dataset.text
    let type = e.currentTarget.dataset.type
    wx.setClipboardData({
      data: data,
      success (res) {
        console.log(res)
        wx.showToast({
          title: `${type} Copied`,
          icon: 'success',
          duration: 1500
        }) 
      }
    })
  },

  checklogin: function () {
    let user = wx.getStorageSync('user')
    if (user) {
      this.setData({ currentUser: user })
    };
  },

  //check Job
  getFavorites: function() {
    let user_id = this.data.currentUser.id
    let job_id = this.data.job.id
    let Favorites = new wx.BaaS.TableObject("favorite_jobs")
    let query = new wx.BaaS.Query()
    query.compare('user_id', '=', user_id)
    query.compare('job_id', '=', job_id)
    Favorites.setQuery(query).find().then(res => {
      this.setData({favorite: res.data.objects[0]})
    })
  },
  onShareAppMessage: function() {
    let job = this.data.job
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return {
      title: 'Track-It',
      path: `/pages/show/show?id=${job.id}`,
      imageUrl: job.logo.path || 'https://cloud-minapp-39669.cloud.ifanrusercontent.com/1lYpfMSFFVk42U1L.png'
    }
  },
})