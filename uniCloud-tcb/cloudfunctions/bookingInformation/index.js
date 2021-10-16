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
		
		let num =await db.collection('bookingInformation').where({
			creat_time: tools.formatDate(new Date())
		}).get();
		return tools.serverSuccess(num.data)
	} catch (err) {
		return err.message
	}
}