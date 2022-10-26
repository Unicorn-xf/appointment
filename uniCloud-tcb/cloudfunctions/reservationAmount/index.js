'use strict';
const db = uniCloud.database();
const tools = require('tools');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let method = ""
	let dataInfo = {}
	if(event.body){
		//event.body = JSON.stringify(event.body)
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
		case 'getExportReservationAmount':
			return getExportReservationAmount(dataInfo)
			break;
		case 'cleanDB':
			return cleanDB(dataInfo)
			break;
		case 'getInfoById':
			return getInfoById(dataInfo)
			break;
		case 'updateInfoById':
			return updateInfoById(dataInfo)
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
		
		let selectInfo = {}
		selectInfo.sorce = 0
		if(data.name){
			selectInfo.name = data.name
		}
		if(data.organization){
			selectInfo.organization = data.organization
		}
		
		if(data.manager){
			selectInfo.manager = data.manager
		}
		
		if(data.money){
			selectInfo.money = Number(data.money)
		}
		
		let list = await db.collection('reservationAmount').where(selectInfo).skip((pageInfo -1) * limitInfo ) // 跳过前20条
		.limit(limitInfo).orderBy("create_time","desc").get();
		
		let count = await db.collection('reservationAmount').where(selectInfo).count();
		
		let dataInfo = {
			totalCount:count.total,
			listInfo:list.data
		}
		return dataInfo
	} catch (err) {
		return err.message
	}
}


async function getExportReservationAmount(data) {
	try {
		// console.log("data: "+data)
		let pageInfo = Number(data.page)
		let limitInfo = Number(data.limit)
		
		let selectInfo = {}
		selectInfo.sorce = 0
		if(data.name){
			selectInfo.name = data.name
		}
		if(data.organization){
			selectInfo.organization = data.organization
		}
		if(data.manager){
			selectInfo.manager = data.manager
		}
		if(data.money){
			selectInfo.money = Number(data.money)
		}
		let count = await db.collection('reservationAmount').where(selectInfo).count();
		
		let number = count.total;
		
		//返回的数据
		let dataList = []
		if(number > 1000){
			//大于1000分页查询拼接
			let numInfo = 0;
			for(let i=0;i<number;i++){
				if(numInfo > number){
					break;
				}
				let list = await db.collection('reservationAmount').where(selectInfo).skip(numInfo) // 跳过前20条
				.limit(1000).orderBy("create_time","desc").get();
				
				numInfo = numInfo+1000
				dataList = dataList.concat(list.data)
			}
			// console.log("1111")
		}else{
			let list = await db.collection('reservationAmount').where(selectInfo).skip((pageInfo -1) * limitInfo ) // 跳过前20条
			.limit(limitInfo).orderBy("create_time","desc").get();
			
			dataList = list.data
			// console.log("22222")
		}
		
		// console.log("====数据："+JSON.stringify(dataList))
		// console.log("====长度："+dataList.length)
		// let list = await db.collection('reservationAmount').where(selectInfo).skip((pageInfo -1) * limitInfo ) // 跳过前20条
		// .limit(limitInfo).orderBy("create_time","desc").get();
		
		
		
		let dataInfo = {
			totalCount:count.total,
			listInfo:dataList
		}
		return dataInfo
	} catch (err) {
		return err.message
	}
}

async function cleanDB(data){
	const dbCmd = db.command
	await db.collection("assessment").where({
  _id: dbCmd.neq(null)
}).remove()
	await db.collection("equipmentInfo").where({
  _id: dbCmd.neq(null)
}).remove()
	await db.collection("reservationAmount").where({
  _id: dbCmd.neq(null)
}).remove()
}

async function getInfoById(data){
	try {
		let dataInfo = []
		if(data._id){
			let list = await db.collection('reservationAmount').where({
				_id:data._id
			}).get()
			
			dataInfo = list.data
		}
		
		return dataInfo
	} catch (err) {
		return err.message
	}
}

async function updateInfoById(data){
	try {
		if(data.data.id){
			let id = data.data.id
			delete(data.data["id"]);
			let name = data.data.updateName
			delete(data.data["updateName"])
			data.data.money = parseInt(data.data.money)
			data.data.update_time = tools.formatDateTime(new Date())
			data.data.update_name = name
			await db.collection('reservationAmount').where({
				_id:id
			}).update(data.data)
			return tools.serverSuccess("更新成功");
		}
	} catch (err) {
		return tools.serverFailure()
	}
}

