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
		default:
			break;
	}
};


async function addFormInfo(data) {
	const dbCmd = db.command;
	try {
		// var beginDate = tools.formatDateLine(new Date()) +" 00:00:00";
		// var endDate = tools.formatDateLine(new Date()) +" 23:59:59"
		//查询当日身份证和姓名有无预约
		let amountCode =await db.collection('reservationAmount').where({
			name:data.name,
			idcard:data.idcard
		}).count();
		
		if(amountCode.total >= 1){
			return tools.serverFailure("-2");
		}
		//查询当时金额
		let num =await db.collection('bookingInformation').where({
			creat_time: tools.formatDate(new Date())
		}).get();
		
		num = num.data;
		var money = num[0].money
		var moneyForm = parseInt(data.money)
		var shengyumoney = parseInt((money-moneyForm))  
		
		if(money < moneyForm){
			return tools.serverFailure("-1");
		}
		//查询总条数
		let amount =await db.collection('reservationAmount').count();
		
		data._id = (parseInt(amount.total)+1).toString()
		data.money = parseInt(data.money)
		data.create_time = tools.formatDateTime(new Date())
		await db.collection('reservationAmount').add(data)
		
		await db.collection('bookingInformation').where({
			creat_time: tools.formatDate(new Date())
		}).update({
			money: shengyumoney
		});

		return tools.serverSuccess((parseInt(amount.total)+1));
	} catch (err) {
		return err.message
	}
}
/**
 * @param {Object} data
 * 添加评价
 */
async function addAssessment(data) {
	try {
		data.evaluate = data.evaluate == 1?'满意':(data.evaluate == 2?'一般':'不满意')
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
	try {
		// var date = new Date()
		// var afterDate = new Date().getTime()+60*60*1000
		// var beginDate = tools.formatDateTime(date);
		// var endDate = tools.formatDateTime(new Date(afterDate))
		
		let list = await db.collection('reservationAmount').orderBy('create_time', 'desc').get()
		
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
		var beginDate = tools.formatDateLine(new Date()) +" 00:00:00";
		var endDate = tools.formatDateLine(new Date()) +" 23:59:59"
		
		let list = await db.collection('reservationAmount').where({
			create_time:dbCmd.gte(beginDate).and(dbCmd.lte(endDate))
		}).get();
		return tools.serverSuccess(list.data)
	} catch (err) {
		return err.message
	}
}


/**
 * 添加部门
 */
async function addDepartment(data) {
	const $ = db.command.aggregate;
	const _ = db.command
	try {
		let info = data.info;
		let list = tools.humpTurnUnderLine(info)
		list.is_delete = "0"
		list.gmt_create = tools.formatDateTime(new Date())
		await db.collection('dept').add(list)
		return tools.serverSuccess("添加成功");
	} catch (err) {
		return err.message
	}
}

/**
 * 编辑部门
 */
async function editDepartment(data) {
	const $ = db.command.aggregate;
	const _ = db.command
	try {
		let info = data.info;
		let id = info.id
		delete(info["id"]);
		let list = tools.humpTurnUnderLine(info)
		list.gmt_modified = tools.formatDateTime(new Date())
		await db.collection('dept').where({
			_id: id
		}).update(list)
		return tools.serverSuccess("编辑成功");
	} catch (err) {
		return err.message
	}
}

/**
 * 删除部门
 */
async function deleteDepartment(data) {
	const $ = db.command.aggregate;
	const _ = db.command
	try {
		let info = data.info.ids;
		let list = info.split(",")

		for (let i = 0; i < list.length; i++) {
			await db.collection('dept').where({
				_id: list[i]
			}).remove();
		}
		return tools.serverSuccess("删除成功");
	} catch (err) {
		return err.message
	}
}

/**
 * 搜索部门
 */
async function searchDepartment(data) {
	const $ = db.command.aggregate;
	const _ = db.command
	try {
		let info = data.info.title;
		let deptInfo = await db.collection('dept').where({
			dept_name: new RegExp("^.*" + info + ".*$"),
			is_enable: "0",
			is_delete: "0"
		}).get();
		deptInfo = deptInfo.data
		for (let i = 0; i < deptInfo.length; i++) {
			let count = await db.collection('dept').where({
				dept_pid: deptInfo[i]._id,
			}).count();
			count = count.total;
			if (count > 0) {
				deptInfo[i].is_parent = "1"
			} else {
				deptInfo[i].is_parent = "0"
			}

			let list = await db.collection('dept').where({
				_id: deptInfo[i].dept_pid,
			}).get();
			list = list.data;
			if (list.length > 0) {
				deptInfo[i].parent_name = list[0].dept_name
			} else {
				deptInfo[i].parent_name = ""
			}
		}

		return tools.serverSuccess(tools.underLineTurnHump(deptInfo));
	} catch (err) {
		return err.message
	}
}

/**
 * 查询部门
 */
async function getDeptList(data) {
	const $ = db.command.aggregate;
	const _ = db.command
	try {
		let info = data.info.title;
		let deptInfo = await db.collection('dept').where({
			is_enable: "0",
			is_delete: "0"
		}).get();
		deptInfo = deptInfo.data

		return tools.serverSuccess(tools.underLineTurnHump(deptInfo));
	} catch (err) {
		return err.message
	}
}
