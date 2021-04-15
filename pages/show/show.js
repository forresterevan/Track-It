// pages/show/show.js
Page({
  data: {
    currentUser: null,
    fav: false
  },
  getJobs: function (id) {
    let Jobs = new wx.BaaS.TableObject('jobs')
    Jobs.get(id).then(res => {
      console.log(res)
      this.setData({
        job: res.data
      })
    }, (err) => {
      console.log(err)
    })
  },
 
  onLoad: function (options) {
    let id = options.id
    this.checklogin();
    this.setData({job_id: id})
    this.getJobs(id);
  },
  saveToDatabase: function() {
    let favoriteJobs = new wx.BaaS.TableObject("favorite_jobs")
    let fJ = favoriteJobs.create()
    fJ.set({user_id: this.data.currentUser.id, job_id: this.data.job.id}).save().then(res => {
      console.log(res)
      this.setData({fav: true})
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
          self.checkLikedJob();
          }, err => {
        })
      }
    })
},
copyID: function() {
  wx.setClipboardData({
    data: this.data.job.employer_wechat_id,
    success (res) {
      console.log(res)
      wx.showToast({
        title: 'Copied',
        icon: 'success',
        duration: 1500
      })
      
    }
  })
},
onShow: function() {
  this.checkLikedJob();
},
checklogin: function () {
  let user = wx.getStorageSync('user')
  if (user) {
    this.setData({
      currentUser: user
    })
    this.checkLikedJob()
  }
  console.log(user)
},
//check Job
checkLikedJob: function() {
  let user_id = this.data.currentUser.id
  let job_id = this.data.job_id
  let favoriteJob = new wx.BaaS.TableObject("favorite_jobs")
  let query = new wx.BaaS.Query()
  query.compare('user_id', '=', user_id)
  query.compare('job_id', '=', job_id)
  favoriteJob.setQuery(query).find().then(res => {
    console.log(res)
    let fav = res.data.objects.length > 0 
    this.setData({favoriteJob: res.data.objects, fav: fav})
  })
}
})