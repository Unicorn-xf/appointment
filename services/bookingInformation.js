/**
 * 安卓app服务模块
 */
let {call} = require('../utils/call.js')

module.exports = {
	selectAmount(data,isNoTc) {
		data.method = 'selectAmount'
		return callit(data)
	},
}

const callit = (data) => {
	return call('bookingInformation', data)
}