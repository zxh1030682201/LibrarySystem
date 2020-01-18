var models = {};
(async function () {
  const fs = require('fs')
  const path = require('path')
  const files = await fs.readdirSync(path.join(__dirname, '../models'))
  files.forEach(file => {
    if (file.includes('Entity')) {
      const model = require(path.join(__dirname, `../models/${file}`))
      const [modelName] = file.split(/Entity/)
      models[modelName] = model
    }
  })
})();

// 简单的增删改查，复杂的操作单独写model的helper
exports.find = async (model, query, projection, populate = '') => {
  return models[model].find(query, projection).populate(populate).sort({createTime: '-1'})
}

exports.findOne = async (model, query, populate = '') => {
  return models[model].findOne(query).populate(populate)
}

exports.add = async (model, body) => {
  return models[model].create(body)
}

exports.insertMany = async (model, documents) => {
  return models[model].insertMany(documents)
}

exports.update = async (model, filter, body) => {
  return models[model].update(filter, body)
}

exports.findOneAndUpdate = async (model, filter, body, options = {new: true}) => {
	return models[model].findOneAndUpdate(filter, body, options)
}

exports.delete = async (model, filter) => {
  return models[model].remove(filter)
}

/**
 *
 * @param {*} model
 * @param {*} query {
 *   params: {},
 *   projection: {} 指定返回的键，不返回其他键, 1返回，0不返回
 *   page: {},
 *   populate: []
 * }
 */
exports.query = async (model, query) => {
	if (query.page) {
		return exports.pageQuery(model, query.params, query.page, query.populate)
	} else {
		return exports.find(model, query.params, query.projection)
	}
}

/**
 * 
 * @param {*} Model
 * @param {*} params
 * @param {*} page {
 *   @param {*} pageIndex: 1
 *   @param {*} pageSize: 10 
 *   @param {*} sort
 * }
 * @param {*} populate
 */
exports.pageQuery = async (model, params, page = {pageSize: 10, pageIndex: 1, sort: '_id'}, populate = '') => {
  page=JSON.parse(page)
  const Model = models[model]
  var start = (page.pageIndex - 1) * page.pageSize
  const [count, records] = await Promise.all([
    // 查询数量
    Model.countDocuments(params),
    // 查询一页的记录
    Model.find(params)
    .skip(start)
    .limit(page.pageSize)
    .populate(populate)
    .sort(page.sort)
  ])
  return {
    pageNumber: page.pageIndex,
    pageCount: Math.ceil(count / page.pageSize),
    totalCount: count,
    results: records
  }
}
