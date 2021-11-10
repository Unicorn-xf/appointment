<template>
	<swiper class="box" :style="style" circular @change="swiperChange" autoplay="true" interval="9000"
		indicator-dots="true" :indicator-active-color="themeColor">
		<swiper-item>
			<video style="width: 100%;height: 100%;" id="myVideo"
				src="https://6661-faasspace-636c54-1302268565.tcb.qcloud.la/510a7186526849ed04a427372c138455.mp4"
				autoplay="true" loop="true" objectFit="fill" :muted="false" :show-play-btn="false"
				:show-fullscreen-btn="false" :controls="false"></video>
		</swiper-item>
		<swiper-item v-for="(item, index) in list" :key="index" class="box-item"
			@click="toDetailPage({index: index,id:item.id})">
			<image :style="style_img" :src="item.img" @error="onImageError(item)" />
		</swiper-item>

	</swiper>

</template>

<script>
	export default {
		props: {

			list: {
				type: Array,
				default () {
					return []
				}
			},
			padding: {
				type: Number,
				default: 0
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			height: {
				type: Number,
				default: 0
			},
			borderRadius: {
				type: Number,
				default: 0
			},
			themeColor: {
				type: String,
				default: '#FFFFFF',
			},
		},
		computed: {
			style() {
				let that = this;
				var height = parseInt(that.height);
				var padding = parseInt(that.padding);
				var style = '';
				if (height > 0) {
					style = `height:${height}rpx;`;
				}
				if (padding > 0) {
					style += `padding:0rpx ${padding}rpx;`;
				}

				return style;
			},
			style_img() {
				let that = this;
				var borderRadius = that.borderRadius;
				var style = '';

				if (borderRadius > 0) {
					style += `border-radius:${borderRadius}rpx;`;
				}
				return style;
			},
		},

		watch: {

		},
		data() {
			return {

			};
		},

		methods: {
			swiperChange(e) {
				this.$emit('swiperChange', e);
			},
			//详情页
			toDetailPage(item) {
				let that = this;
				let list = that.list;
				let index = item.index;
				let data = {
					curIndex: index,
					item: list[index],
					list: list
				};
				this.$emit('toDetailPage', data);
			},

			onImageError(item, index) {
				//虽触发，但不会显示默认的图片				
				this.error = null; //这个暂没有发现作用

				let obj = {
					index: index,
					list: this.list
				};
				this.$emit('Error', obj);
			},
		}
	}
</script>

<style lang="scss">
	swiper,
	swiper-item {
		box-sizing: border-box;
		border-radius: 10px;
	}

	uni-image {
		width: 100%;
		height: 100%;
	}

	.box {
		width: 90%;
		height: 300rpx;
		margin-left: 40rpx;
		margin-top: 20rpx;
		// position: absolute;
		// top: 395rpx;
		// left: 106rpx;

		.box-item {
			width: 100%;
			height: 100%;
			padding: 0 0upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			// border-radius: 20upx;
		}
	}
</style>
