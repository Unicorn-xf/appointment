'use strict';
//云数据库
const db = uniCloud.database();
const tools = require('tools');
exports.main = async (event, context) => {
	//访问云函数
	switch (event.method) {
		case 'addFormInfo':
			return addFormInfo(event.data)
			break;
		case 'selectGoUpNoticeList':
			return selectGoUpNoticeList(event)
			break;
		case 'selectAmountNowDay':
			return selectAmountNowDay(event)
			break;
		case 'addAssessment':
			return addAssessment(event.data)
			break;
		case 'selectAllNoticeList':
			return selectAllNoticeList(event.data)
			break;
		default:
			break;
	}
};


async function addFormInfo(data) {
	const dbCmd = db.command;
	try {
		// var beginDate = tools.formatDateLine(new Date()) +" 00:00:00";
		// var endDate = tools.formatDateLine(new Date()) +" 23:59:59"
		let equipmentCode = await db.collection('equipmentInfo').where({
			equipment: data.equipment
		}).count();
		if (equipmentCode.total >= 1) {
			return tools.serverFailure("-3");
		}

		//查询当日身份证和姓名有无预约
		let amountCode = await db.collection('reservationAmount').where({
			name: data.name,
			idcard: data.idcard
		}).count();

		if (amountCode.total >= 1) {
			return tools.serverFailure("-2");
		}
		//查询当时金额
		let num = await db.collection('bookingInformation').where({
			creat_time: '20211018'
		}).get();

		num = num.data;
		var money = num[0].money
		var moneyForm = data.money
		var shengyumoney = (money - moneyForm)

		if (money < moneyForm) {
			return tools.serverFailure("-1");
		}
		//查询总条数
		let amount = await db.collection('reservationAmount').count();
		
		data._id = (parseInt(amount.total) + 1).toString()
		data.money = parseInt(data.money)
		data.create_time = tools.formatDateTime(new Date())
		//0:来自手机，1：来自外部造的假数据
		data.sorce = 0 
		await db.collection('reservationAmount').add(data)

		await db.collection('bookingInformation').where({
			creat_time: '20211018'
		}).update({
			money: shengyumoney
		});


		let list = {}
		list.equipment = data.equipment
		list.name = data.name
		list.create_time = tools.formatDateTime(new Date())
		await db.collection('equipmentInfo').add(list)


		return tools.serverSuccess((parseInt(amount.total) + 1));
	} catch (err) {
		console.info("错误："+err.message)
		return err.message
	}
}
/**
 * @param {Object} data
 * 添加评价
 */
async function addAssessment(data) {
	try {
		data.evaluate = data.evaluate == 1 ? '满意' : (data.evaluate == 2 ? '一般' : '不满意')
		data.create_time = tools.formatDateTime(new Date())
		await db.collection('assessment').add(data)

		return tools.serverSuccess("添加成功");
	} catch (err) {
		return err.message
	}
}
/**
 * 查询预约信息
 */
async function selectGoUpNoticeList() {
	const dbCmd = db.command;
	try {
		// let count = await db.collection('reservationAmount').count();

		// let yei = Math.ceil(count.total / 1000);
		// let companyInfos = [];

		// for (var i = 0; i < yei; i++) {
		// 	let cis = await db.collection('reservationAmount')
		// 		.skip(1000 * i)
		// 		.limit(1000)
		// 		.get();
		// 	companyInfos.push.apply(companyInfos, cis.data);
		// }

		let list = await db.collection('reservationAmount').where({
			money: dbCmd.gte(300000)
		}).limit(50)
		.orderBy('create_time', 'desc')
		.get()
		
		
		return tools.serverSuccess(list.data)
	} catch (err) {
		return err.message
	}
}

/**
 * 查询当天的预约信息
 */
async function selectAmountNowDay() {
	const dbCmd = db.command;
	try {
		var beginDate = tools.formatDateLine(new Date()) + " 00:00:00";
		var endDate = tools.formatDateLine(new Date()) + " 23:59:59"

		let list = await db.collection('reservationAmount').where({
			create_time: dbCmd.gte(beginDate).and(dbCmd.lte(endDate))
		}).limit(1000).get();
		return tools.serverSuccess(list.data)
	} catch (err) {
		return err.message
	}
}


/**
 * 查询累计预约信息
 */
async function selectAllNoticeList() {
	const dbCmd = db.command;
	try {
		 // await db.collection('equipmentInfo').where({
			//  create_time: dbCmd.gte("2021-10-22 00:00:00").and(dbCmd.lte("2021-10-23 23:59:59"))
		 // }).remove();
		let count = await db.collection('reservationAmount').count();

		let yei = Math.ceil(count.total / 1000);
		let companyInfos = [];

		for (var i = 0; i < yei; i++) {
			let cis = await db.collection('reservationAmount').field({ 'money': true })
				.skip(1000 * i)
				.limit(1000)
				.get();
			companyInfos.push.apply(companyInfos, cis.data);
		}
		//console.info("长度："+companyInfos.length)
		//console.info("数据："+JSON.stringify(companyInfos))
		var pepolenum = companyInfos.length
		var pepoleMoney = 0;
		for(var j=0;j<companyInfos.length;j++){
			pepoleMoney = pepoleMoney + companyInfos[j].money
		}
		//console.info("金额："+pepoleMoney)
		
		var list ={}
		list.pepolenum = pepolenum;
		list.pepoleMoney = pepoleMoney;
		return tools.serverSuccess(list)
	} catch (err) {
		return err.message
	}
}