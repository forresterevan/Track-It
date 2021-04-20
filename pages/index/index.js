const app = getApp()
Page({
  data: {
    city: {
      options: ['All'],
      index: 0
    },
    salary: {
      options: ['All'],
      index: 0
    },
    type: {
      options: ['All'],
      index: 0
    }
  },

  onLoad() {
    this.getJobs()
    this.userInfoHandler()
  },

  getJobs: function() {
    let city = this.data.city.options[this.data.city.index];
    let salary = this.data.salary.options[this.data.salary.index];
    let type = this.data.type.options[this.data.type.index];

    let Jobs = new wx.BaaS.TableObject('jobs'); 
    let query = new wx.BaaS.Query();

    if (city != 'All') query.compare('city', '=', city);
    if (salary != 'All') query.compare('salary_range', '=', salary);
    if (type != 'All') query.compare('job_type', '=', type);
    query.compare('status', '=', 'Approved');

    Jobs.setQuery(query).find().then((res) => {
      let jobs = res.data.objects;
      this.setData({ jobs });
      this.setFilters(jobs);
    })
  },

  changeFilter: function (e) {
    let value = e.detail.value;
    let type = e.currentTarget.dataset.type

    this.setData({ [`${type}.index`]: value });
    this.getJobs();
  },

  setFilters: function (jobs) {
    let cities = this.data.city.options;
    let salaries = this.data.salary.options
    let types = this.data.type.options

    jobs.forEach(job => {
      if (!cities.includes(job.city)) cities.push(job.city);
      if (!salaries.includes(job.salary_range)) salaries.push(job.salary_range);
      if (!types.includes(job.job_type)) types.push(job.job_type);
    })

    this.setData({
      'city.options': cities,
      'salary.options': salaries,
      'type.options': types
    })
  },

  navigateToShow: function(e) {
    wx.navigateTo({
      url: `/pages/show/show?id=${e.currentTarget.dataset.id}`,
    })
  }
})
