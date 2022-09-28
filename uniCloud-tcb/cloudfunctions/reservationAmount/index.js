'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let method = ""
	let dataInfo = {}
	if(event.body){
		let aaa = JSON.parse(event.body)
		dataInfo = aaa
		method = aaa.method
	}else{
		method = event.method
		dataInfo = event.data
	}
	switch (method) {
		case 'getReservationAmount':
			return getReservationAmount(dataInfo)
			break;
		default:
			break;
	}
};


async function getReservationAmount(data) {
	try {
		console.log("data: "+data)
		let pageInfo = Number(data.page)
		let limitInfo = Number(data.limit)
		let list = await db.collection('reservationAmount').skip((pageInfo -1) * limitInfo ) // 跳过前20条
		.limit(limitInfo).orderBy("create_time","desc").get();
		
		let count = await db.collection('reservationAmount').count();
		
		let dataInfo = {
			totalCount:count.total,
			listInfo:list.data
		}
		return dataInfo
	} catch (err) {
		return err.message
	}
}
