<template>
	<view>

		<view class="example" style="padding: 35rpx;margin-top: 40rpx;">
			<uni-forms ref="dataForm" :rules="rules" :modelValue="dataForm" >
				<uni-forms-item label="姓名" name="name">
					<uni-easyinput v-model="dataForm.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="身份信息" name="idcard">
					<uni-easyinput v-model="dataForm.idcard" maxlength="14" type="number" placeholder="请输入身份证号前14位，后4位不输" />
				</uni-forms-item>
				<uni-forms-item label="预约金额(元)" name="money">
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
						<view style="border: 1px solid #e5e5e5;width: 200rpx;text-align: center;border-radius: 5px;height: 36px;box-sizing: border-box;line-height: 36px;">
							{{array[index]}}
						</view>
					</picker>
				</uni-forms-item>
			</uni-forms>
			
		</view>
		<button type="primary" @click="submit()" style="width: 230rpx;background-color: #ED1C24;position: fixed;bottom: 80rpx;left: 35%;">提交</button>

	</view>
</template>

<script>
	let assessment = require('../../services/assessment.js');
	export default {
		data() {
			return {
				dataForm: {
					name: '',
					idcard: '',
					money: null,
					call: 1,
					manager: '',
					organization:''
				},
				array: ['请选择','丰城', '高安', '樟树', '万载','宜丰','上高','奉新','靖安','铜鼓','城区营销部','城镇营销部','收展一部','收展二部','收展三部'],
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
					uni.showModal({
						title: "提示",
						content: "姓名不能为空",
						showCancel: false
					})
					return false;
				}
				if(self.dataForm.idcard == null || self.dataForm.idcard == '') {
					uni.showModal({
						title: "提示",
						content: "身份证号不能为空",
						showCancel: false
					})
					return false;
				}
				if(self.dataForm.idcard != null && self.dataForm.idcard != '') {
					if(self.dataForm.idcard.length < 14){
						uni.showModal({
							title: "提示",
							content: "请输入身份证号前14位",
							showCancel: false
						})
						return false;
					}
				}
				if(self.dataForm.money == null || self.dataForm.money == '') {
						uni.showModal({
							title: "提示",
							content: "预约金额(元)不能为空",
							showCancel: false
						})
						return false;
				}
				if(self.dataForm.money != null && self.dataForm.money != '') {
					if(parseInt(self.dataForm.money) < 20000) {
						uni.showModal({
							title: "提示",
							content: "预约金额不能低于2万",
							showCancel: false
						})
						return false;
					}
				}
				if(self.dataForm.manager == null || self.dataForm.manager == '') {
					uni.showModal({
						title: "提示",
						content: "业务经理不能为空",
						showCancel: false
					})
					return false;
				}
				if(self.dataForm.organization == '' || self.dataForm.organization == '请选择'){
					uni.showModal({
						title: "提示",
						content: "请选择机构",
						showCancel: false
					})
					return false;
				}
				
				assessment.addFormInfo({
					data: self.dataForm
				}).then(res => {
					if (res.result.retcode == "0000") {
						var isVip = false;
						if(parseInt(self.dataForm.money) > 500000){
							isVip = true;
						}
						uni.navigateTo({
							url: '../feature/evaluate?card='+ self.dataForm.idcard+"&numbers="+res.result.data+"&isVip="+isVip
						})
					}else{
						if(res.result.retmsg == "-1"){
							uni.showModal({
								title: "提示",
								content: "预约金额大于剩余金额，请调整预约金额",
								showCancel: false
							})
						}else if(res.result.retmsg == "-2"){
							uni.showModal({
								title: "提示",
								content: "该身份证号已预约",
								showCancel: false
							})
						}
					}
					
						
						
					
				}).catch(err => {
					uni.showToast({
						title: `预约失败`
					})
				})
			}
		}
	}
</script>

<style>
	.uni-forms-item__label {
		width: 80px !important;
	}
</style>
