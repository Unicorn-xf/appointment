<template>
	<view>
		<!-- <image class="bg-set" src="https://6661-faasspace-636c54-1302268565.tcb.qcloud.la/banner1.png"></image> -->

		<!-- <redpacketrain :redpackets="reds" @clickRedPacket="clickRedPacket"></redpacketrain> -->

		<view class="place">
		</view>

		<view class="hideView">
			<image mode="aspectFill" v-if="isopen" class="bg-set"
				src="https://6661-faasspace-636c54-1302268565.tcb.qcloud.la/bannerTop1.png"></image>
		</view>
		<view style="width: 100%;padding-top: 26rpx;">
			<image class="bg-sets" src="https://6661-faasspace-636c54-1302268565.tcb.qcloud.la/bottomImg1.png"></image>
			<view class="bannerStyle">
				<image v-if="issubmit" style="width: 100%;"
					src="https://6661-faasspace-636c54-1302268565.tcb.qcloud.la/111.png"></image>
				<banner v-if="isopen" :list="bannerList" :themeColor="themeColor" @toDetailPage="toDetailPage"></banner>
			</view>
			<view class="gundongStyle" v-if="isopen">
				<view class="scroll_box">
					<swiper class="swiper" circular="true" vertical="true" display-multiple-items="3"
						:autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in goUpNoticeList" :key="index">
							<view class="swiper-item" style="position: relative;">
								<text class="iconfont icon-tubiaozhizuo-"
									style="font-size: 14rpx;vertical-align: middle;"></text>
								{{item.directOne1}}<span style="position: absolute;right: 0;">{{item.directOne2}}</span>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>

			<!-- <view class="uni-margin-wrap" style="padding: 0upx 20upx;border-radius: 22upx;">
				<swiper class="swiper" style="background-color: #f2f2f2;border-radius: 22upx;" circular  :autoplay="autoplay" vertical="true" interval="500" duration="20000">
					<swiper-item v-for="(item, index) in goUpNoticeList"  :key="index">
						<view class="swiper-item">{{item.directOne1}}{{item.directOne2}}</view>
						
					</swiper-item>
					
				</swiper>
			</view> -->
			<!-- <view class="notificationBar">
				<goUpNotice :list="goUpNoticeList" :themeColor="themeColor" :haveMore="false"></goUpNotice>
			</view> -->
			<view class="yuyueStyle" v-if="isopen">
				<view class="content" style="color: #fff;">
					<view style="text-align: center;font-weight: 600;font-size: 40rpx;">今日预约额度仅剩</view>
					<view style="text-align: center;font-weight: 600;font-size: 40rpx;">{{remainingMoney}}万元</view>
				</view>

				<view class="static">
					<view class="static-item" style="border-radius: 20upx 0 0 20upx;">
						<view class="static-item-type" style="color: #fff;">预约客户</view>
						<view class="static-item-number">{{onTheDaynum}}<span style="font-size: 24upx;">人</span></view>
					</view>
					<view class="static-item" style="border-radius:0 20upx 20upx 0;">
						<view class="static-item-type" style="color: #fff;">预约额度</view>
						<view class="static-item-number">{{onTheDayJinE}}<span style="font-size: 24upx;">万元</span>
						</view>
					</view>
				</view>
				<view class="static">
					<view class="static-item" style="border-radius: 20upx 0 0 20upx;">
						<view class="static-item-type" style="color: #fff;">累计客户</view>
						<view class="static-item-number">{{clientnumleiji}}<span style="font-size: 24upx;">人</span>
						</view>
					</view>
					<view class="static-item" style="border-radius:0 20upx 20upx 0;">
						<view class="static-item-type" style="color: #fff;">累计额度</view>
						<view class="static-item-number">{{leijijine}}<span style="font-size: 24upx;">万元</span></view>
					</view>
				</view>
			</view>
			<view class="btnStyle">
				<view v-if="isopen">
					<button v-if="isgray" @click="tipDaoqi(1)" class="bnts">我要预约</button>
					<button v-else @click="toAppointmentPage()" class="bnt">我要预约</button>
				</view>
				<button v-if="issubmit" @click="tipDaoqi(2)" class="bnts">查询信息</button>
			</view>

		</view>
		<!-- <view class="btnStyle">
			<text @click="toAppointmentPage()" class="bnt">我要预约</text>
		</view> -->



	</view>
</template>
<script>
	import gbroMarquee from '@/components/gbro-marquee/marquee.vue';
	import goUpNotice from '@/components/notice-goUp/notice-goUp.vue';
	import banner from '@/components/ay-banner/banner.vue';
	let tools = require('../../utils/tools.js')
	let assessment = require('../../services/assessment.js')
	let bookingInformation = require('../../services/bookingInformation.js')
	import redpacketrain from '@/components/ylt-redpacketrain/redpacketrain.vue';
	export default {
		components: {
			gbroMarquee,
			goUpNotice,
			banner,
			redpacketrain
		},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 1000,
				duration: 2000,
				themeColor: '#f2f2f2',
				goUpNoticeList: [],
				bannerList: [],
				headerPosition: "fixed",
				onTheDaynum: 0, //当日累计客户数
				onTheDayJinE: 0, //当日累计金额
				remainingMoney: 0, //剩余金额
				clientnumleiji: 0, //累计客户数
				leijijine: 0, //累计金额
				isopen: false,
				reds: [],
				isgray: false,
				issubmit: false,
			}
		},
		onLoad() {
			this.selectyuyuejine();
			this.selectleijiNow();
			this.selectgoUpNoticeList();
			this.selectAllNoticeList();
		},
		onPullDownRefresh() {
			this.selectleijiNow();
			this.selectyuyuejine();
			this.selectAllNoticeList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		mounted() {
			const tempArr = [];
			for (let i = 0; i < 100; i++) {
				const redsItem = {
					id: Math.random() * 100,
					value: parseInt(Math.random() * 100)
				};
				tempArr.push(redsItem);
			}
			this.reds = tempArr;
		},
		methods: {
			tipDaoqi(type) {
				let t = this
				if (t.isopen) {
					uni.showModal({
						title: "提示",
						content: "今日额度已满剩余额度次日0:00投放，感谢您的参与与关注",
						showCancel: false
					})
				} else {
					if (type == 1) {
						uni.showModal({
							title: "提示",
							content: "今日预约数额已满",
							showCancel: false
						})
					} else {
						uni.showModal({
							title: "提示",
							content: "今日已过查询时间",
							showCancel: false
						})
					}

				}

			},
			//查询当日累计
			selectleijiNow() {
				let self = this
				assessment.selectAmountNowDay({
					data: {}
				}).then(res => {
					if (res.result.retcode == "0000") {
						var data = res.result.data;
						this.onTheDaynum = data.length
						var info = [];
						var moneys = 0
						data.forEach((item, index) => {
							moneys = moneys + parseInt(item.money)
						})
						this.onTheDayJinE = this.moneyFormat(parseInt(moneys))
					}
				}).catch(err => {
					console.info("错误：" + err.message)
				})
			},
			//查询预约金额
			selectyuyuejine() {
				let self = this
				bookingInformation.selectAmount({
					data: {}
				}).then(res => {
					if (res.result.retcode == "0000") {
						var num = res.result.data[0].money;
						this.isopen = res.result.data[0].isopen;
						this.issubmit = res.result.data[0].issubmit;
						if (res.result.data[0].isopen) {
							if (self.bannerList.length == 0) {
								self.bannerList.push({
									id: 2,
									img: 'https://6661-faasspace-636c54-1302268565.tcb.qcloud.la/微信图片_20211014111300.jpg',
									url: 'www.baidu.com/',
								})
							}

						}
						if (num <= 0) {
							if (res.result.data[0].isopen) {
								uni.showModal({
									title: "提示",
									content: "今日额度已满剩余额度次日0:00投放，感谢您的参与与关注",
									showCancel: false
								})
							}

							this.isgray = true
						}

						const moneys = num / 10000
						const realVal = parseFloat(moneys).toFixed(2);
						this.remainingMoney = realVal
					}
				}).catch(err => {
					console.info("错误：" + err.message)
				})
			},
			selectgoUpNoticeList() {
				let self = this
				assessment.selectGoUpNoticeList({
					data: {}
				}).then(res => {
					if (res.result.retcode == "0000") {
						var data = res.result.data;
						var info = [];
						data.forEach((item, index) => {
							var newStr;
							if (item.name.length === 2) {
								newStr = item.name.substr(0, 1) + '*';
							} else if (item.name.length > 2) {
								var char = '';
								for (var i = 0, len = item.name.length - 1; i < len; i++) {
									char += '*';
								}
								newStr = item.name.substr(0, 1) + char;
							} else {
								newStr = item.name;
							}
							var money = this.moneyFormat(parseInt(item.money))
							info.push({
								"directOne1": newStr,
								"directOne2": "成功预约" + money + "万元"
							});
						})
						self.goUpNoticeList = info;
					}
				}).catch(err => {
					console.info("错误：" + err.message)
				})
			},
			//查询累计的金额
			selectAllNoticeList() {
				let self = this
				assessment.selectAllNoticeList({
					data: {}
				}).then(res => {
					if (res.result.retcode == "0000") {
						//console.info("数据:"+JOSN.stringify(res))
						var data = res.result.data;
						self.clientnumleiji = data.pepolenum
						
						this.leijijine = this.moneyFormat(parseInt(data.pepoleMoney))
					}
				}).catch(err => {
					console.info("错误：" + err.message)
				})
			},
			
			moneyFormat: function(arg) {
				// if (arg.toString().length >= 13) {
				// 	// return arg/1000000000000+"万亿"
				// 	const moneys = arg / 1000000000000
				// 	const realVal = parseFloat(moneys).toFixed(2);
				// 	return realVal + "万亿"

				// } else if (arg.toString().length >= 9) {
				// 	const moneys = arg / 100000000
				// 	const realVal = parseFloat(moneys).toFixed(2);
				// 	return realVal + "亿"
				// } else if (arg.toString().length >= 4) {
				const moneys = arg / 10000
				const realVal = parseFloat(moneys).toFixed(2);
				return realVal
				//}

			},
			toAppointmentPage() {
				var time = tools.getCurrentData(new Date()).replace(/-/g,"/")
				var checktime = tools.getCurrentDataInfo(new Date()).replace(/-/g,"/")
				
				var oDate1 = new Date(time);//当前时间
				var oDate2 = new Date(checktime);//当天九点半
				if (oDate1.getTime() > oDate2.getTime()) {
					uni.navigateTo({
						url: '../feature/appointment?isopen='+this.isopen
					}) 
				} else {
					uni.showModal({
						title: "提示",
						content: "今日0：00后才可进行预约",
						showCancel: false
					})
				}
				
				// uni.navigateTo({
				// 	url: './home'
				// })
			},
			toDetailPage(e) {
				let list = e.list;
				let idx = e.curIndex;
				let list_img = [];
				list.forEach(item => {
					list_img.push(item.img)
				})
				if (list_img && list_img.length > 0) {
					uni.previewImage({
						current: list_img[idx],
						// 传 Number H5端出现不兼容 
						urls: list_img,
						indicator: "number",
						loop: true,
					});
				}
			},

		}
	}
</script>
<style scoped lang="scss">
	.scroll_box {
		background: #730100;
		margin: 20rpx;
		border-radius: 22rpx;
		height: 187rpx;
		padding: 20rpx 30rpx;
		width: 83%;
		margin-left: 40rpx;
		// position: absolute;
		// top:679rpx;
		// left:42rpx;

		.swiper {
			height: 187rpx;
			font-size: 28rpx;
			color: #CD7F32;
		}
	}

	.header {
		padding: 0 3%;
		line-height: 80upx;
		overflow: hidden;
		height: 515upx;
		color: #fff;
		position: relative;
	}

	.place {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		// background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, .3), rgba(255, 255, 255, .5), #ffffff);
	}

	.bg-set {
		// position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.bg-sets {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
<style lang="scss">
	// page {
	// 	background-image: '../../static/banner.png';
	// }

	/* 轮播 */
	.notificationBanner {
		padding: 0 30rpx;
		margin-top: 10rpx;
	}

	/* 通知 */
	.notificationBar {
		padding: 0 30rpx;
		margin-top: 30rpx;
		color: #e54059;
	}

	.yuyue {
		display: inline-block;
		width: 200rpx;
		text-align: center;
		background-color: red;
		color: yellow;
		margin-left: 30rpx;
		border-radius: 5px;
	}

	.kehu,
	.edu {
		display: inline-block;
		margin-left: 20rpx;
		width: 195rpx;
		position: relative;
	}

	.numbers {
		position: absolute;
		right: 0;
	}

	.top {
		text-align: center;
		font-size: 60rpx;
		font-weight: 600;
	}

	//累计
	.static {
		/* height: 200upx; */
		width: calc(100% - 60upx);
		margin: 0upx 30upx 0;
		// background: white;
		// -webkit-box-shadow: 0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
		// box-shadow: 0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
		-webkit-border-radius: 20upx;
		border-radius: 20upx;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
		height: 92rpx;
		margin-top: 45rpx;
	}

	.static-item {
		flex: 1;
		text-align: center;
		// background-color: rgb(255, 255, 255);
	}

	.static-item-type {
		padding-top: 20upx;
		font-size: 32upx;
		color: #222222;
	}

	.static-item-number {
		margin-top: 4upx;
		font-size: 40upx;
		color: #31b977;
		padding-bottom: 20upx;
	}

	.bnt {
		width: 240rpx;
		text-align: center;
		background-color: #ED1C24;
		color: #fff;
	}

	.bnts {
		width: 240rpx;
		text-align: center;
		background-color: #999999;
		color: #fff;
	}

	.hideView {
		width: 100%;
		height: 300rpx;
		//border: 1px solid #000;
	}

	.bannerStyle {
		width: 100%;
		margin-top: 28rpx;
		// height: 300rpx;
		//border: 1px solid #000;
	}

	.gundongStyle {
		width: 100%;
		margin-top: 50rpx;
		//height: 260rpx;
		//border: 1px solid #000;
	}

	.yuyueStyle {
		width: 100%;
		margin-top: 45rpx;
		//height: 370rpx;
		//border: 1px solid #000;
	}

	.btnStyle {
		width: 100%;
		margin-top: 50rpx;
		// position: fixed;
		// bottom: 100rpx;
		// left: 275rpx;
		// border: 1px solid red;
		// width: 220rpx;
		// height: 60rpx;
		// text-align: center;
		// line-height: 60rpx;
		// border-radius: 26rpx;
		// color: #FFF;
		// background-color: red;
	}
</style>
