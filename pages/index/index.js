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
    let types = jobs.map( job => job.job_type)
    let cityObj = {}
    let rangeObj = {}
    let typeObj = {}
    cities.forEach(city => cityObj[city] = city)
    ranges.forEach(range => rangeObj[range] = range)
    types.forEach(type => typeObj[type] = type)
    let uniqCities = Object.keys(cityObj)
    let uniqRanges = Object.keys(rangeObj)
    let uniqTypes = Object.keys(typeObj)
    this.setData({jobsLocation: uniqCities, salaryRanges: uniqRanges, jobTypes: uniqTypes})
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
    let filteredJobs = this.data.originalJobs.filter(job => job.city == this.data.jobsLocation[cityIndex])
    this.setData({cityIndex: cityIndex, jobs: filteredJobs})
  },
  bindTypeChange: function (e) {
    console.log(e)
    let typeIndex = e.detail.value
    let filteredJobs = this.data.originalJobs.filter(job => job.job_type == this.data.jobTypes[typeIndex])
    this.setData({typeIndex: typeIndex, jobs: filteredJobs})
  },
  bindSalaryChange: function (e) {
    console.log(e)
    let salaryIndex = e.detail.value
    let filteredJobs = this.data.originalJobs.filter(job => job.salary_range == this.data.salaryRanges[salaryIndex])
    this.setData({salaryIndex: salaryIndex, jobs: filteredJobs})
  },
})
