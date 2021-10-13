<template>
	<view>

		<view class="example" style="padding: 35rpx;margin-top: 40rpx;">
			<uni-forms ref="dataForm" :rules="rules" :modelValue="dataForm" >
				<uni-forms-item label="姓名" name="name">
					<uni-easyinput v-model="dataForm.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="身份证号" name="idCard">
					<uni-easyinput v-model="dataForm.idCard" placeholder="请输入身份证号前14位，后4位不输" />
				</uni-forms-item>
				<uni-forms-item label="预约金额" name="money">
					<uni-easyinput v-model="dataForm.money" type="number" placeholder="请输入预约金额(元)" />
				</uni-forms-item>
				<uni-forms-item label="称呼" name="call">
					<uni-data-checkbox v-model="dataForm.call" :localdata="calls" />
				</uni-forms-item>
				<uni-forms-item label="业务经理" name="manager">
					<uni-easyinput v-model="dataForm.manager" placeholder="请输入业务经理" />
				</uni-forms-item>
				<uni-forms-item label="机构" name="organization">
					<picker :value="index" :range="array" @change="change">
						<view style="border: 1px solid #e5e5e5;width: 200rpx;text-align: center;border-radius: 5px;">
							{{array[index]}}
						</view>
					</picker>
					<view class="iconfont icon-bottom"></view>
				</uni-forms-item>
			</uni-forms>
			<button type="primary" @click="submit()" style="width: 230rpx;background-color: #ED1C24;">提交</button>
		</view>


	</view>
</template>

<script>
	let assessment = require('../../services/assessment.js');
	export default {
		data() {
			return {
				dataForm: {
					name: '',
					idCard: '',
					money: null,
					call: 1,
					manager: '',
					organization:''
				},
				array: ['丰城', '高安', '樟树', '万载','宜丰','上高','奉新','靖安','铜鼓','城区营销部','城镇营销部','收展一部','收展二部','收展三部'],
				index: 0,
				calls: [{
					text: '先生',
					value: 1
				}, {
					text: '女士',
					value: 0
				}],

				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '客户姓名不能为空'
						}]
					}
				}

			}
		},

		onLoad() {},
		onReady() {

		},
		methods: {
			change(e) {
				this.dataForm.organization =this.array[e.detail.value]
				this.index = e.detail.value;
			},

			submit() {
				let self = this;
				
				if(self.dataForm.name == null || self.dataForm.name == '') {
					uni.showToast({
						title: `姓名不能为空`
					})
					return false;
				}
				if(self.dataForm.idCard == null || self.dataForm.idCard == '') {
					uni.showToast({
						title: `身份证号不能为空`
					})
					return false;
				}
				if(self.dataForm.idCard != null || self.dataForm.idCard != '') {
					if(self.dataForm.idCard.length != 14 || self.dataForm.idCard.length>14) {
						uni.showToast({
							title: `请输入身份证号的前14位`
						})
						return false;
					}
				}
				if(self.dataForm.manager == null || self.dataForm.manager == '') {
					uni.showToast({
						title: `业务经理不能为空`
					})
					return false;
				}
				console.log(self.dataForm);
				assessment.addFormInfo({
					data: self.dataForm
				}).then(res => {
					uni.showToast({
						title: `预约成功`
					})
						uni.navigateTo({
							url: '../feature/evaluate'
						})
					
				}).catch(err => {
					uni.showToast({
						title: `预约失败`
					})
				})
			}
		}
	}
</script>
