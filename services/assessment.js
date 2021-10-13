/**
 * 安卓app服务模块
 */
let {call} = require('../utils/call.js')

module.exports = {
	addFormInfo(data,isNoTc) {
		data.method = 'addFormInfo'
		return callit(data)
	},
	//查询预约信息
	selectGoUpNoticeList(data){
		data.method = 'selectGoUpNoticeList'
		return callit(data)
	}
	
}

const callit = (data) => {
	return call('assessment', data)
}