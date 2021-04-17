const app = getApp()
Page({
  data: {
    jobType: false // non-teaching
  },
  onLoad() {
    this.getJobs()
    this.userInfoHandler()
  },
  getJobs: function() {
    let Jobs = new wx.BaaS.TableObject('jobs'); 
    Jobs.find().then((res) => {
      this.getUniqFields(res.data.objects) 
      this.setData({ jobs: res.data.objects, originalJobs: res.data.objects })
    })
  },
  getUniqFields: function(jobs){
    let cities = jobs.map( job => job.city)
    let ranges = jobs.map( job => job.salary_range)
    let cityObj = {}
    let rangeObj = {}
    cities.forEach(city => cityObj[city] = city)
    ranges.forEach(range => rangeObj[range] = range)
    let uniqCities = Object.keys(cityObj)
    let uniqRanges = Object.keys(rangeObj)
    this.setData({jobsLocation: uniqCities, salaryRanges: uniqRanges})
  },
  jobTypeChange: function (e) {
    console.log(e)
    let chosenJobType = e.detail.value
    let fliteredJobs = this.data.originalJobs.filter(job => job.job_type == chosenJobType)
    this.setData({chosenJobType: chosenJobType, jobs: fliteredJobs}) 
  },
  filterJobsLocally: function() {
  },
  navigateToShow: function(e) {
    wx.navigateTo({
      url: `/pages/show/show?id=${e.currentTarget.dataset.id}`,
    })
  },

  navigateToPost: function () {
    wx.navigateTo({
      url: '/pages/form/form',
    })
  },
  userInfoHandler(data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
        wx.setStorageSync('user', user)
        this.setData({user})
        // this.getMyJobs()
        console.log(user.avatar)
      }, err => {
        console.log(err)
    })
  },
  bindCityChange: function (e) {
    console.log(e)
    let cityIndex = e.detail.value
    let fliteredJobs = this.data.originalJobs.filter(job => job.city == this.data.jobsLocation[cityIndex])
    this.setData({cityIndex: cityIndex, jobs: fliteredJobs})
  },
  bindSalaryChange: function (e) {
    console.log(e)
    let salaryIndex = e.detail.value
    this.setData({salaryIndex: salaryIndex})
  },
})
