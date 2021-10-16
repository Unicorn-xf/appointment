<template>
	<view class="header" style="background: #fa436a;">
		<!-- 头部 -->
		<view class="place">
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentSwiper: 0,
				city: '北京',
				weatherData: [{
					type: '阴',
					img: "/static/images/weather/yin.png"
				}, {
					type: '晴',
					img: "/static/images/weather/qing.png"
				}, {
					type: '多云',
					img: "/static/images/weather/duoyun.png"
				}, {
					type: '雨',
					img: "/static/images/weather/xiaoyu.png"
				}, {
					type: '小雨',
					img: "/static/images/weather/xiaoyu.png"
				}, {
					type: '中雨',
					img: "/static/images/weather/xiaoyu.png"
				}, {
					type: '大雨',
					img: "/static/images/weather/dayu.png"
				}, {
					type: '暴雨',
					img: "/static/images/weather/leiyu.png"
				}, {
					type: '雷阵雨',
					img: "/static/images/weather/leiyu.png"
				}, {
					type: '雨夹雪',
					img: "/static/images/weather/xiaoxue.png"
				}, {
					type: '雪',
					img: "/static/images/weather/xue.png"
				}, {
					type: '小雪',
					img: "/static/images/weather/xue.png"
				}, {
					type: '中雪',
					img: "/static/images/weather/xiaoxue.png"
				}, {
					type: '大雪',
					img: "/static/images/weather/daxue.png"
				}],
				high: '',
				weatherName: '',
				latitude: '',
				longitude: '',
				todyWeather: {},
				statusBarHeight: 20
			};
		},
		props: {
			colors: {
				type: String
			},
			locations: {
				type: Object
			},
			swiperList: {
				type: Array
			}
		},
		created() {

			// #ifndef H5
			//this.getUserPosition();
			// #endif
			// #ifdef H5
			if (this.locations.latlng) {
				this.latitude = this.locations.latlng.lat || ''
				this.longitude = this.locations.latlng.lng || ''
				this.city = this.locations.poiname
				this.getWeather(this.latitude, this.longitude);
			}
			// #endif
		},
		watch: {
			locations(value) {
				this.latitude = this.locations.latlng.lat || ''
				this.longitude = this.locations.latlng.lng || ''
				this.city = this.locations.poiname
				// this.getWeather(this.latitude, this.longitude);
			}
		},
		methods: {
			getUserPosition() {
				/**
				 * 在这里执行获取用户的位置
				 */
				//获取用户位置
				let that = this;
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: res => {
						console.log('获取经纬度成功', res);
						that.setData({
							latitude: res.latitude,
							longitude: res.longitude
						});
					},
					fail: () => {
						that.setData({
							latitude: '',
							longitude: ''
						});
					},
					complete: () => {
						// 解析地址
						that.getCity();
					}
				});
			},

			getCity() {

			},

			getWeather(la, lo) { //获取天气信息
				let url = 'https://free-api.heweather.net/s6/weather/now?key=' + hfKey + '&location=' + lo + ',' + la;
				uni.request({
					url: url,
					method: 'GET',
					success: res => {
						console.log(res);
						let today = res.data.HeWeather6[0].now; //获取到今天的天气
						let h = today.fl;
						this.setData({
							high: h,
							//高温
							weatherName: today.cond_txt
						});
						this.weatherData.forEach(e => {
							if (e.type == today.cond_txt) {
								this.setData({
									todyWeather: e
								});
							}
						});

						if (this.todyWeather.type == '' || !this.todyWeather.type) {
							let data = this.weatherData[0];
							this.setData({
								todyWeather: data
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},

			nearAddress() { //设置位置信息
				// #ifdef MP
				const _this = this; // 处理拒绝再次打开调用设置
				uni.getSetting({
					success(res) {
						if (res && res.authSetting && res.authSetting.hasOwnProperty('scope.userLocation')) {
							uni.openSetting({
								success() {
									_this.getUserPosition();
								}
							});
						}
					}
				});
				// #endif
				// #ifdef H5
				uni.navigateTo({
					url: '/pages/views/home/h5map'
				})
				// #endif
			},
			swiperChange(e) {
				this.setData({
					currentSwiper: e.detail.current,
				});
			}
		}
	};
</script>
<style scoped lang="scss">
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
		background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, .3), rgba(255, 255, 255, .5), #ffffff);
	}

	.left {
		font-size: 26upx;
		color: #333;
		float: left;
		height: 80upx;
		color: #fff;
		display: flex;
		align-items: center;
		align-items: center;
		z-index: 800;
	}

	.left image {
		width: 30upx;
		height: 30upx;
		float: left;
		margin-right: 6upx;
	}

	.left view {
		width: 60vw;
		height: 30upx;
		line-height: 30upx;
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.right {
		height: 80upx;
		float: right;
		font-size: 26upx;
		display: flex;
		align-items: center;
	}

	.right image {
		width: 40upx;
		height: 40upx;
	}

	.right text {
		margin-left: 10upx;
	}

	.swiper {
		width: 100%;
		margin-top: 10upx;
		display: flex;
		justify-content: center;
	}

	.swiper-box {
		width: 100%;
		height: 45vw;
		overflow: hidden;
		/* border-radius: 15upx; */
		/* box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2); */
		position: relative;
		z-index: 1;
	}

	.swiper-box swiper {
		width: 100%;
		height: 45vw;
	}

	.swiper-box swiper swiper-item {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.swiper-box swiper swiper-item image {
		width: 95%;
		height: 45vw;
		margin: 0 auto;
		display: block;
		border-radius: 10px;
		transition: height .3s;
	}

	.swiper-item-side {
		width: 95%;
		height: 40vw !important;
		transition: height .3s;
	}

	.indicator {
		position: absolute;
		bottom: 20upx;
		left: 20upx;
		background-color: rgba(255, 255, 255, 0.4);
		width: 150upx;
		height: 5upx;
		border-radius: 3upx;
		overflow: hidden;
		display: flex;
	}

	.dots {
		width: 0upx;
		background-color: rgba(255, 255, 255, 1);
		transition: all 0.3s ease-out;
	}

	.on {
		width: 30%;
		background-color: rgba(255, 255, 255, 1);
		transition: all 0.3s ease-out;
	}
</style>
