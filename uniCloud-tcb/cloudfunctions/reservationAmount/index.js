'use strict';
const db = uniCloud.database();
const tools = require('tools');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	switch (event.method) {
		case 'getReservationAmount':
			return getReservationAmount(event.data)
			break;
		default:
			break;
	}
};


async function getReservationAmount(data) {
	try {
		
		let list = await db.collection('reservationAmount').limit(10000).get();
		console.log("=====:"+list.data);
		//return tools.serverSuccess(list.data);
	} catch (err) {
		return err.message
	}
}
