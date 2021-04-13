// pages/show/show.js
Page({
  data: {
    currentUser: null,
    captured: false
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
    this.checkLikedJob();

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
  console.log(data)
  wx.BaaS.auth.loginWithWechat(data).then(user => {
      wx.setStorageSync('user', user)
      this.setData({
        currentUser: user
      })
      this.checkLikedJob()
    }, err => {
      console.log(err)
  })
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