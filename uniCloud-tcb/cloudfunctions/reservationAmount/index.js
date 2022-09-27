'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	
	let list = await db.collection('reservationAmount').limit(10000).get();
	
	let data = {
		totalCount:
	}
	return list.data;
};


// async function getReservationAmount(data) {
// 	try {
		
// 		let list = await db.collection('reservationAmount').limit(10000).get();
// 		console.log("=====:"+list.data);
// 		return tools.serverSuccess(list.data);
// 	} catch (err) {
// 		return err.message
// 	}
// }
