<template>
	<view>
		<view class="notificationBanner">
			<banner :list="bannerList" :themeColor="themeColor" @toDetailPage="toDetailPage"></banner>
		</view>
		<view class="notificationBar">
			<goUpNotice :list="goUpNoticeList" :themeColor="themeColor" :haveMore="false"></goUpNotice>
		</view>

		<view class="content">
			<view style="text-align: center;font-weight: 600;font-size: 40rpx;">今日预约额度仅剩</view>
			<view style="text-align: center;font-weight: 600;font-size: 40rpx;">145万元</view>
		</view>






		<button type="primary" @click="toAppointmentPage()"
			style="width: 120px;background-color: #ED1C24;">开始预约</button>
	</view>
</template>
<script>
	import gbroMarquee from '@/components/gbro-marquee/marquee.vue';
	import goUpNotice from '@/components/notice-goUp/notice-goUp.vue';
	import banner from '@/components/ay-banner/banner.vue';
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
				goUpNoticeList: [{
						directOne1: '路遥知马力，日久见人心',
						directOne2: '《元曲选·争报恩》',
					}, {
						directOne1: '天生我材必有用',
						directOne2: '李白',
					},
					{
						directOne1: '穷则独善其身，达则兼济天下',
						directOne2: '孟子',
					}, {
						directOne1: '业精于勤，荒于嬉；行成于思，毁于随',
						directOne2: '韩愈',
					}, {
						directOne1: '一年之计在于春，一日之计在于晨',
						directOne2: '萧绎',
					},
				],
				bannerList: [{
						id: 0,
						img: '../../static/images/banner.jpg',
						url: 'www.baidu.com/',

					},
					{
						id: 1,
						img: 'https://cdn.pixabay.com/photo/2016/11/23/17/55/beach-1854072__340.jpg',
						url: 'www.baidu.com/',
					},
					{
						id: 2,
						img: 'https://cdn.pixabay.com/photo/2016/11/19/12/25/art-1839006__340.jpg',
						url: 'www.baidu.com/',
					},
				],
			}
		},
		onLoad() {

		},
		methods: {
			toAppointmentPage() {
				uni.navigateTo({
					url: '../feature/appointment'
				})
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.detail.value
			},
			durationChange(e) {
				this.duration = e.detail.value
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
	.notificationBanner{
		padding: 0 30rpx;
		margin-top: 30rpx;
	}
	/* 通知 */
	.notificationBar {
		padding: 0 30rpx;
		margin-top: 30rpx;
		height: 500rpx;
		color: #e54059;
	}
	

	
</style>
