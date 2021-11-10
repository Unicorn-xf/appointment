<template>
	<view
		class="mask"
		:style="{
			height: `100vh`
		}"
	>
		<view class="wrapper">
			<view
				class="packet"
				v-for="item of redpacketsRe"
				:key="item.id"
				:animation="item.animationData"
				@click="clickRedpacket(item)"
				:style="{
					top: item.top + 'px',
					left: item.left + 'px',
					display: item.isShow ? 'block' : 'none',
					transform: `rotateY(${item.rotateX}deg)  rotatez(${item.rotateZ}deg)`}"
			>
				<image src="./red.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'redpacketrain',
	data() {
		return {
			navHeight: 0,
			redpacketsRe: [],
			scrollerArea: {},
			redsHeight:80,
			redsWidth:40
		};
	},
	props: {
		// 红包列表
		redpackets: {
			type: Array,
			default: () => []
		},
		// 红包雨时间，单位秒
		duration: {
			default: Number,
			default: 20
		},
		// 单个红包下落延迟，延迟越短越容易重叠，单位毫秒
		spaceTimers: {
			default: Number,
			default: 300
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.selector('.mask', this, res => {
				this.scrollerArea = {
					left: res.left,
					right: res.right,
					top: res.top,
					bottom: res.bottom,
					height: res.bottom - res.top - this.redsHeight,
					width: res.right - res.left - this.redsWidth
				};

				this.craeteReds();
			});
		});
	},
	methods: {
		clickRedpacket(item) {
			item.isShow = false;
			// 点击红包事件
			this.$emit('clickRedPacket',item);
		},
		speedDistance(animation) {
			// 红包下落动画
			return animation
				.translateY(this.scrollerArea.height * 4)
				.step({ duration: this.duration * 1000 })
				.export();
		},
		runNumber(max, min) {
			// 某个范围内的随机数
			return Math.ceil(Math.random() * (max - min) + min);
		},
		craeteReds() {
			// 创建红包数组，带动画，初始位置和翻转角度
			this.redpacketsRe = this.redpackets.map((ele, index) => {
				return {
					...ele,
					left: this.runNumber(0, this.scrollerArea.width),
					top: -this.runNumber(0, this.scrollerArea.height * 2) - 80,
					rotateX: this.runNumber(-45, 45),
					rotateZ:this.runNumber(-45,45),
					isShow: true,
					animationData: this.speedDistance(
						uni.createAnimation({
							timingFunction: 'ease',
							delay: index * this.spaceTimers
						})
					)
				};
			});
		},
		selector(selectorName, componentsName, cb) {
			// 节点选择器
			const query = uni.createSelectorQuery().in(componentsName);
			query
				.select(selectorName)
				.boundingClientRect(data => {
					cb && cb(data);
				})
				.exec();
		}
	}
};
</script>

<style lang="less">
.mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: 0 auto;
	width: 100vw;
	height: 100vh;
	z-index: 9999;
	// background-color: rgba(0, 0, 0, 0.3);
	.wrapper {
		.packet {
			width: 80upx;
			height: 120upx;
			border-radius: 10upx;
			position: absolute;
			background-color: #fff;
			image {
				width: 80upx;
				height: 120upx;
				border-radius: 10upx;
			}
		}
	}
}
</style>
