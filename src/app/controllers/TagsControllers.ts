import { TagsServices } from '../services/TagsServices'

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: '.env.development',
  })
} else {
  require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  })
}

interface CRUD {
  index(req, res): void
  create(req, res): void
  update(req, res): void
  delete(req, res): void
}

class TagsControllers implements CRUD {
  async index(req, res) {
    const { page } = req.query
    const tagsService = new TagsServices()

    try {
      const result = await tagsService.index(page)

      return res.json(result)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
  async create(req, res) {
    const { title } = req.body
    const tagsService = new TagsServices()

    try {
      const result = await tagsService.create(title)

      return res.json(result)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
  async update(req, res) {
    const { title } = req.body
    const { id_tag } = req.params

    const tagsService = new TagsServices()

    try {
      const result = await tagsService.update(id_tag, title)

      return res.json(result)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
  async delete(req, res) {
    const { id_tag } = req.params

    const tagsService = new TagsServices()

    try {
      const result = await tagsService.delete(id_tag)

      return res.json(result)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}

module.exports = new TagsControllers()
