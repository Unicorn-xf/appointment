<template>
	<view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item>
					<view class="swiper-item"><image mode="widthFix" src="../../static/images/yuyue.png"></image></view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="notificationBar">
			<view class="item">
				<gbro-marquee broadcastType='text' direction="top" :viewHeight="100"
				 :broadcastIconIsDisplay="!true" :touchEvent="true" :broadcastData='broadcastData' :broadcastStyle='broadcastStyle'
				 style="width: 100%">
				</gbro-marquee>
			</view>
		</view>
			
		<view>
			<view style="text-align: center;font-weight: 600;font-size: 40rpx;">今日预约额度仅剩</view>
			<view style="text-align: center;font-weight: 600;font-size: 40rpx;">145万元</view>
		</view>
		
		
		
		

		
		<button type="primary" @click="toAppointmentPage()" style="width: 120px;background-color: #ED1C24;">开始预约</button>
	</view>
</template>
<script>
	import gbroMarquee from '@/components/gbro-marquee/marquee.vue'
	export default {
		components: {
		    gbroMarquee
		},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 1000,
				duration: 1000,
				broadcastData: [111111111,2222222,333333],
				broadcastStyle: {
				    speed: 12, //每秒3个字
				    font_size: "32", //字体大小(rpx)
					text_color: "#666666", //字体颜色
				    back_color: "#99999", //背景色
				
				}
			}
		},
		onLoad() {
		                let that = this;
		                setTimeout(() => { //模拟接口请求
		                    that.broadcastData = ['温**                      成功预约 10 万元',
		                        '李**                 成功预约 10 万元', '年年答复是短发分公司噶阿飞嘎斯在'
		                    ]
		                    
		                }, 1000)
		            },
		methods: {
			toAppointmentPage(){
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
			}
		}
	}
</script>

<style>
	/* 通知 */
	.notificationBar {
		padding: 0 30rpx;
		margin-top: 30rpx;
		height: 500rpx;
		color: #e54059;
	}
	.swiper_container {
		height: 360rpx !important;
		width: 100%;
		line-height: 50rpx;
		font-size: 30rpx;
	}
	.swiper_item {
		font-size: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-left: 5rpx;
	}
	.uni-margin-wrap {
		width:690rpx;
		margin:0 30rpx;
	}
	.swiper {
		height: 300rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt{
		margin-top:60rpx;
		position:relative;
	}

	.info {
		position: absolute;
		right:20rpx;
	}

    .uni-padding-wrap {
        width:550rpx;
        padding:0 100rpx;
    }
</style>
