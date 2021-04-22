// pages/form/form.js
Page({

  data: {
    salary: {
      values: ["100-200","8,000 - 15,999", "16,000- 23,999", "24,000 - 29,999", "30,000 +", "Negotiable"],
      index: 0
    },
    type: {
      values: ["Non Teaching", "Teaching"],
      index: 0
    },
    loading: false,
    // logo: {file: ''}
  },

  changeSalary: function (e) {
    console.log(e)
  },

  changeType: function (e) {
    let index = e.detail.value
    this.setData({ 'type.index': index });
  },

  changeSalary: function (e) {
    let index = e.detail.value;
    this.setData({'salary.index': index})
  },

  uploadImage: function (e) {
    wx.chooseImage({
      success: (res) => {
        let MyFile = new wx.BaaS.File()
        let fileParams = {filePath: res.tempFilePaths[0]}
        let metaData = {categoryName: 'SDK'}
    
        let uploadTask = MyFile.upload(fileParams, metaData);

        uploadTask.onProgressUpdate(e => {
          this.setData({loading: true})
        });
        
        uploadTask.then(res => {
          let data = res.data;
          this.setData({
            logo: data,
            loading: false
          });
        })
      }
    })
  },

  formSubmit: function (e) {
    let Jobs = new wx.BaaS.TableObject('jobs')
    let job = Jobs.create()

    let type = this.data.type;
    let salary = this.data.salary;

    let data = {
      company: e.detail.value.company,
      title: e.detail.value.title,
      city: e.detail.value.city,
      contact_name: e.detail.value.contact_name,
      contact_number: e.detail.value.contact_number,
      contact_email: e.detail.value.contact_email,
      contact_wechat: e.detail.value.contact_wechat,
      job_type: type.values[type.index],
      description: e.detail.value.description,
      city: e.detail.value.city,
      salary_range: salary.values[salary.index],
      location: this.data.address,
      logo: this.data.logo.file
    }
    
    job.set(data).save().then(res => {
      wx.showModal({
        title: 'Submit Success!',
        content: "Your job posting will be reviewed shortly! Please check your posting status on your User profile page for updates.",
        showCancel: false,
        success: (res) => {
          if (res.confirm) wx.switchTab({ url: "/pages/user/user" })   
        }
      })
    })
  },

  chooseLocation: function () {
    wx.chooseLocation({
      success: (result) => {
        console.log(result)
        this.setData({ address: result.address })
      }
    })
  },

  onLoad: function (options) {

  }
})