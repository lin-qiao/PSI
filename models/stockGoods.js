const {
	Op,
	DataTypes,
	Sequelize,
} = require("sequelize");
const sequelize = require('../config/db.js'); // 引入todolist的表结构
const goodsSchema = '../schema/goods.js';
const stockSchema = '../schema/stock.js';
const brandSchema = '../schema/brand.js';
const goodsModel = require(goodsSchema)(sequelize, DataTypes)
const stockModel = require(stockSchema)(sequelize, DataTypes)
const brandModel = require(brandSchema)(sequelize, DataTypes)

goodsModel.belongsTo(brandModel, {
	foreignKey: 'brand_id',
	as: 'brand'
});



goodsModel.hasMany(stockModel, {
	foreignKey: 'goods_id',
	as: 'stock'
})
/**
 * @description 根据商品检索库存
 * @param 
 * @return 
 */
const findAndCountAllByGoods = async (page, size, goodSn, brandId, uid, order) => {
	const where = {
		'user_id': uid,
	}

	if (goodSn) {
		where['good_sn'] = goodSn
	}
	if (brandId) {
		where['brand_id'] = brandId
	}
	return goodsModel.findAll({
		where: where,
		attributes: [
			['name', 'goodsName'],
			['id', 'goodsId'],
			['brand_id', 'brandId'],
			['good_sn', 'goodsSn'],
			['img_url', 'imgUrl'],
			['name', 'goodsName'],
			['size_ids', 'sizeIds'],
			[Sequelize.fn('SUM', Sequelize.col('stock.number')), 'totalNumber'],
			[Sequelize.fn('SUM', Sequelize.col('stock.total_price')), 'totalCostPrice'],
			[Sequelize.col('brand.brand_name'), 'brandName'],

		],
		include: [
			{
				model: brandModel,
				as: 'brand',
				attributes: []
			},
			{

				model: stockModel,
				as: 'stock',
				attributes: [],
				duplicating:false,
			},

		],
		group:'id',
		order: order ? Sequelize.literal(order) : null,
		limit: size,
		offset: size * (page - 1)
	})
}


/**
  * @description获取商品总数
  * @param 
  * @return 
  */

const findCount = async(goodSn, brandId, uid) => {
	const where = {
		'user_id': uid,
	}
	
	if (goodSn) {
		where['good_sn'] = goodSn
	}
	if (brandId) {
		where['brand_id'] = brandId
	}
	
	return goodsModel.count({
		where: where
	})
} 
module.exports = {
	findAndCountAllByGoods,
	findCount
}
