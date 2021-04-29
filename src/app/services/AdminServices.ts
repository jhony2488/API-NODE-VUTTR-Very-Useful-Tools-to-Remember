const { User } = require('../models')

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: '.env.development',
  })
} else {
  require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  })
}

class AdminServices {
  async index(pagGet = 1) {
    let page
    if (pagGet == 1 || !pagGet || pagGet == null || pagGet == undefined) {
      page = 1
    } else {
      page = pagGet
    }
    let offset = 0
    let limit = 5
    if (isNaN(page) || page == 1) {
      offset = 0
    } else {
      offset = (parseInt(page) - 1) * limit
    }
    const users = await User.findAndCountAll({
      order: [['id', 'DESC']],
    })
    let next
    if (offset + limit >= users.count) {
      next = false
    } else {
      next = true
    }
    let result = {
      page,
      next,
      users,
    }
    return {
      next: result.next,
      page: parseInt(result.page),
      users: result.users.rows,
    }
  }
  async indexOne(id_users: number) {
    const user = await User.findOne({
      where: {
        id: id_users,
      },
    })

    return user
  }
}

export { AdminServices }
