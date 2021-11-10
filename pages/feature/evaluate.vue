<template>
	<view>
		<view class="view_contain">
				<view class="view_iconText" v-if="isopen">
					<icon type="success" size="100" color="#39b54a" />
					<text class="text_title">预约成功</text>
					<view class="text_title" v-if="isvip" style="width: 600rpx;height: 130rpx;color:#e98f36;position: relative;">
						<image src="../../static/images/tip.png" class="imgStyle"></image>
						<view style="width: 450rpx;position: absolute;right: 0;">超过50万限额请联系客户经理通过绿色通道预约</view>
					</view>
					<text class="text_content">您的预约编码是{{serialnumber}}</text>
				</view>
				<view class="example" style="padding: 6px;margin-top: 40rpx;">
					<uni-forms ref="dataForm" :modelValue="dataForm">
						<uni-forms-item name="evaluate">
							<view style="margin-left: 140rpx;">
								<uni-data-checkbox v-model="dataForm.evaluate" :localdata="evaluates" />
							</view>
						</uni-forms-item>
					</uni-forms>
				</view>
				<button class="button_gotohome" @click="submit()">提交评价</button>
				
			</view>
		
		


	</view>
</template>

<script>
	let assessment = require('../../services/assessment.js');
	export default {
		data() {
			return {
				dataForm: {
					evaluate: 1,
					card:""
				},
				serialnumber:"",//预约编号
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
				isopen:false,
				isvip:false,
			}
		},
		onLoad(query) {
		    let t = this;
			t.dataForm.card = query.card;
			t.isopen = query.isopen
			if(query.isVip == '0'){
				t.isvip = true
			}else{
				t.isvip = false
			}
			// console.info("111:"+query.isvip)
			// this.isvip = query.isvip;
			// setTimeout(function(){
			// 	t.isvip = query.isVip;
			// },1000)
			
			var numbers = query.numbers.toString();
			switch(numbers.length){
				case 1:this.serialnumber ="0000"+numbers;break;
				case 2:this.serialnumber ="000"+numbers;break;
				case 3:this.serialnumber ="00"+numbers;break;
				case 4:this.serialnumber ="0"+numbers;break;
				case 5:this.serialnumber =numbers;break;
				default:break;
			}
			
			
		},
		methods: {
			init() {

			},
			submit() {
				let self = this
				assessment.addAssessment({
					data: self.dataForm
				}).then(res => {
					if (res.result.retcode == "0000") {
						uni.navigateTo({
							url: '../index/index'
						})
					}
				}).catch(err => {
					uni.showToast({
						title: `预约失败`
					})
				})
				// uni.showToast({
				// 	title: `感谢您的评价`
				// })
				// uni.navigateTo({
				// 	url: '../index/index'
				// })

			}
		}
	}
</script>

<style>
	page {
			width: 100%;
			height: 100%;
		}
	
		.view_contain {
			width: 100%;
			height: 100%;
			margin-top: 50upx;
		}
	
		.view_iconText {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 30%;
			align-items: center;
			justify-content: center;
		}
		.text_title{
			margin-top: 50upx;
			font-size: 40upx;
			font-weight: 600;
		}
		.button_gotohome{
			width: 50%;
			background: linear-gradient(to right, #74bba7, #28b53d);
			border-radius: 50upx;
			color: #ffffff;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.35);
			margin-top: 20rpx;
		}
		.text_content{
			margin-top: 30rpx;
			color: #557ead;
			font-size: 35upx;
		}
		.bottom{
			width: 100%;
			display: flex;
			flex-direction: column;
			position: fixed;
			bottom: 20upx;
			align-items: center;
			justify-content: center;
		}
		.imgStyle{
			width: 100rpx;
			height: 100rpx;
			vertical-align: middle;
			position: absolute;
			top: 3rpx;
			left: 30rpx;
		}
	
</style>
