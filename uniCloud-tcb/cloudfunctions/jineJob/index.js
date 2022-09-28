'use strict';
// 1 1
const db = uniCloud.database();
const tools = require('tools');

exports.main = async (event, context) => {
	
	// switch (event.method) {
	// 	case 'jineJob':
	// 		return jineJob()
	// 		break;
	// 	default:
	// 		break;
	// }
	await  jineJob(event)
	return event
};

async function jineJob() {
	const dbCmd = db.command
	const $ = db.command.aggregate
	
	//let list = {}
	//list.creat_time = tools.formatDate(new Date())
	//list.money = 30000000
	// list.isopen = true
	// list.issubmit = false
	await db.collection('bookingInformation').where({
		_id: 'fa24ce1a616cb9030093c59328dd1d3a'
	}).update({
		money: 30000000
	})
}
