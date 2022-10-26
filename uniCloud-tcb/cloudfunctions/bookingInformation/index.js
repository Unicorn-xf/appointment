'use strict';
//云数据库
const db = uniCloud.database();
const tools = require('tools');
exports.main = async (event, context) => {
	//访问云函数
	switch (event.method) {
		case 'selectAmount':
			return selectAmount()
			break;
		default:
			break;
	}
};


async function selectAmount() {
	try {
		var list ={}
		let num =await db.collection('bookingInformation').where({
			_id: 'fa24ce1a616cb9030093c59328dd1d3a'//tools.formatDate(new Date())
		}).get();
		// list.isopen = true
		// list.issubmit = false
		return tools.serverSuccess(num.data)
	} catch (err) {
		return err.message
	}
}