'use strict';
// 1 1
const db = uniCloud.database();
const tools = require('tools');

exports.main = async (event, context) => {
	
	await  jineJob(event)
	return event
};

async function jineJob() {
	const dbCmd = db.command
	const $ = db.command.aggregate
	
	let list = {}
	list.creat_time = tools.formatDate(new Date())
	list.money = 30000000
	await db.collection('bookingInformation').add(list)
}
