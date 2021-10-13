'use strict';
//云数据库
const db = uniCloud.database();
exports.main = async (event, context) => {
	//访问云函数
	switch (event.method) {
		//根据父id查询部门
		case 'addFormInfo':
			return addFormInfo(event.data)
			break;
		default:
			break;
	}
};


async function addFormInfo(data) {
	try {
		await db.collection('reservationAmount').add(data)
		return tools.serverSuccess("添加成功");
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
		
		for(let i=0;i<list.length;i++){
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
		for(let i=0;i<deptInfo.length;i++){
			let count = await db.collection('dept').where({
				dept_pid: deptInfo[i]._id,
			}).count();
			count = count.total;
			if(count > 0){
				deptInfo[i].is_parent = "1"
			}else{
				deptInfo[i].is_parent = "0"
			}
			
			let list = await db.collection('dept').where({
				_id: deptInfo[i].dept_pid,
			}).get();
			list = list.data;
			if(list.length > 0){
				deptInfo[i].parent_name = list[0].dept_name
			}else{
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
