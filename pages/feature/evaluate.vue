<template>
	<view>

		<view class="example" style="padding: 35rpx;margin-top: 40rpx;">
			<uni-forms ref="dataForm" :modelValue="dataForm">
				<uni-forms-item>
					<text style="margin-left: 225rpx;font-size: 60rpx;font-weight: bold;">预约成功</text>
				</uni-forms-item>
				<uni-forms-item>
					<text style="margin-left: 210rpx;">您的预约编码是00001</text>
				</uni-forms-item>
				<uni-forms-item>
					<text style="margin-left: 260rpx;font-size: 40rpx;">服务评价</text>
				</uni-forms-item>
				<uni-forms-item name="evaluate">
					<view style="margin-left: 140rpx;">
						<uni-data-checkbox v-model="dataForm.evaluate" :localdata="evaluates" />
					</view>
				</uni-forms-item>
			</uni-forms>
			<button type="primary" @click="submit()" style="width: 230rpx;background-color: #ED1C24;">提交评价</button>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataForm: {
					evaluate: 1,
				},
				evaluates: [{
						text: '满意',
						value: 1
					}, {
						text: '一般',
						value: 2
					},
					{
						text: '不满意',
						value: 3
					}
				],
			}
		},
		methods: {
			init() {

			},
			submit() {
				uni.showToast({
					title: `感谢您的评价`
				})
				uni.navigateTo({
					url: '../index/index'
				})

			}
		}
	}
</script>

<style>

</style>
