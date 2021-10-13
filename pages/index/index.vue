<template>
	<view>
		<view class="top">
			财富预约
		</view>
		<view class="notificationBanner">
			<banner :list="bannerList" :themeColor="themeColor" @toDetailPage="toDetailPage"></banner>
		</view>
		<view class="notificationBar">
			<goUpNotice :list="goUpNoticeList" :themeColor="themeColor" :haveMore="false"></goUpNotice>
		</view>

		<view class="content" style="margin-top: 50rpx;margin-bottom: 50rpx;">
			<view style="text-align: center;font-weight: 600;font-size: 40rpx;">今日预约额度仅剩</view>
			<view style="text-align: center;font-weight: 600;font-size: 40rpx;">145万元</view>
		</view>

		<view style="width: 100%;margin-bottom: 40rpx;">
			<view style="width: 100%;margin-bottom: 30rpx;">
				<text class="yuyue">今日预约</text>
				<view class="kehu">客户 <span class="numbers">25人</span></view>
				<view class="edu">额度 <span class="numbers">355万元</span></view>
			</view>
			<view style="width: 100%;">
				<text class="yuyue">累计预约</text>
				<view class="kehu">客户 <span class="numbers">25人</span></view>
				<view class="edu">额度 <span class="numbers">355万元</span></view>
			</view>
		</view>
		<button type="primary" @click="toAppointmentPage()"
			style="width: 120px;background-color: #ED1C24;position: fixed;bottom: 80rpx;left: 35%;">我要预约</button>
	</view>
</template>
<script>
	import gbroMarquee from '@/components/gbro-marquee/marquee.vue';
	import goUpNotice from '@/components/notice-goUp/notice-goUp.vue';
	import banner from '@/components/ay-banner/banner.vue';
	let assessment = require('../../services/assessment.js')
	export default {
		components: {
			gbroMarquee,
			goUpNotice,
			banner
		},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 1000,
				duration: 1000,
				themeColor: '#f2f2f2',
				goUpNoticeList: [],
				bannerList: [{
					id: 0,
					img: '../../static/images/banner.jpg',
					url: 'www.baidu.com/',

				}],
			}
		},
		onLoad() {
			this.selectgoUpNoticeList();
		},
		methods: {
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
							//var money = this.moneyFormat(parseInt(item.money))
							info.push({
								"directOne1": newStr,
								"directOne2": "成功预约" + item.money + "元"
							});
						})
						self.goUpNoticeList = info;
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
					const realVal = parseFloat(moneys).toFixed(1);
					return realVal + "万"
				//}

			},
			toAppointmentPage() {
				uni.navigateTo({
					url: '../feature/appointment'
				})
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

<style>
	/* page {
		background-color: #f2f2f2;
	} */
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
		width: 220rpx;
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
</style>
