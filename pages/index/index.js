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
    let query = new wx.BaaS.Query()
    query.compare('status', '=', 'Approved')
    Jobs.setQuery(query).find().then((res) => {
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
    let uniqCities = ['All'].concat(Object.keys(cityObj)) 
    let uniqRanges = ['All'].concat(Object.keys(rangeObj)) 
    let uniqTypes = ['All'].concat(Object.keys(typeObj)) 
    this.setData({jobsLocation: uniqCities, salaryRanges: uniqRanges, jobTypes: uniqTypes})
  },
  navigateToShow: function(e) {
    wx.navigateTo({
      url: `/pages/show/show?id=${e.currentTarget.dataset.id}`,
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
    let filteredJobs = this.data.originalJobs.filter(job => {
      if (cityIndex == 0) {
        return true
      } else {
        return job.city == this.data.jobsLocation[cityIndex]
      }
    })
    this.setData({cityIndex: cityIndex, jobs: filteredJobs})
  },
  bindTypeChange: function (e) {
    console.log(e)
    let typeIndex = e.detail.value
    let filteredJobs = this.data.originalJobs.filter(job => {
      if (typeIndex == 0) {
        return true
      } else {
        return job.job_type == this.data.jobTypes[typeIndex]
      }
    })
    this.setData({typeIndex: typeIndex, jobs: filteredJobs})
  },
  bindSalaryChange: function (e) {
    console.log(e)
    let salaryIndex = e.detail.value
    let filteredJobs = this.data.originalJobs.filter(job => {
      if (salaryIndex == 0) {
        return true
      } else {
        // console.log(job.salary_range == this.data.salaryRanges[salaryIndex])
        return job.salary_range == this.data.salaryRanges[salaryIndex]
      }
    })
    this.setData({salaryIndex: salaryIndex, jobs: filteredJobs})
  },
})
