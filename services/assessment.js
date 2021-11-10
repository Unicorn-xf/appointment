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
	},
	
	//查询预约信息
	selectAmountNowDay(data){
		data.method = 'selectAmountNowDay'
		return callit(data)
	},
	//添加评价
	addAssessment(data){
		data.method = 'addAssessment'
		return callit(data)
	},
	//查询累计的客户和金额
	selectAllNoticeList(data){
		data.method = 'selectAllNoticeList'
		return callit(data)
	}
	
}

const callit = (data) => {
	return call('assessment', data)
}