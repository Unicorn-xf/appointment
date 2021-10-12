/**
 * 安卓app服务模块
 */
let {call} = require('../utils/call.js')

module.exports = {
	addUserGpsInfos(data,isNoTc) {
		data.method = 'addUserGpsInfos'
		return callit(data,isNoTc)
	}
	
}

const callit = (data,isNoTc) => {
	return call('assessment', data, isNoTc)
}