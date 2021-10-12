/**
 * 云函数调用封装
 * hideLoading：是否隐藏弹窗 true:无弹窗 ,false or 不传:有弹窗
 */

module.exports = {
	call(service, data, hideLoading) {
		return new Promise((resolve, reject) => {
			if (hideLoading) {
				uniCloud.callFunction({
					name: service,
					data: data
				}).then(res => {
					// // console.log("开始(成功)-----------------------" + data.method);
					// // console.log("-->请求参数：" + JSON.stringify(data))
					// // console.log("-->返回参数：" + JSON.stringify(res))
					// // console.log("结束-----------------------------")
					resolve(res)
				}).catch(err => {
					// // console.log("开始(错误)-----------------------" + data.method);
					// // console.log("-->请求参数：" + JSON.stringify(data))
					// // console.log("-->返回参数：" + JSON.stringify(err))
					// // console.log("结束-----------------------------")
					if(err.errMsg == "request:fail abort statusCode:-1" || err.errMsg == "request:fail timeout"){
						err.errMsg = "网络异常，请检查您的网络设置"
					}
					reject(err)
				}).finally(() => {})
			} else {
				uni.showLoading({
					title: '处理中......',
					success: () => {
						setTimeout(function(){
							uni.hideLoading();
						},6000);
						uniCloud.callFunction({
							name: service,
							data: data
						}).then(res => {
							// // console.log("开始(成功)-----------------------" + data.method)
							// // console.log("-->请求参数：" + JSON.stringify(data))
							// // console.log("-->返回参数：" + JSON.stringify(res))
							// // console.log("结束-----------------------------")
							resolve(res)
						}).catch(err => {
							// // console.log("开始(错误)-----------------------" + data.method)
							// // console.log("-->请求参数：" + JSON.stringify(data))
							// // console.log("-->返回参数：" + JSON.stringify(res))
							// // console.log("结束-----------------------------")
							if(err.errMsg == "request:fail abort statusCode:-1" || err.errMsg == "request:fail timeout"){
								err.errMsg = "网络异常，请检查您的网络设置"
							}
							reject(err)
						}).finally(() => {
							uni.hideLoading();
						})
					}
				})
			}
		})
	}
}