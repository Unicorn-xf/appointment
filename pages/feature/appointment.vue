<template>
	<view>
		<image class="bg-set" v-if="isopen" src="https://6661-faasspace-636c54-1302268565.tcb.qcloud.la/input5.png"></image>
		<view class="example" style="padding: 35rpx;margin-top: 300rpx;">
			<uni-forms ref="dataForm" :rules="rules" :modelValue="dataForm" >
				
				<uni-forms-item label="姓名" name="name">
					<uni-easyinput v-model="dataForm.name" placeholder="请输入姓名" placeholder-style="color: #CD7F32;"/>
				</uni-forms-item>
				<uni-forms-item label="身份信息" name="idcard" v-if="isopen">
					<uni-easyinput v-model="dataForm.idcard" maxlength="14" type="number" placeholder-style="color: #CD7F32;" placeholder="请输入身份证号前14位，后4位不输" />
				</uni-forms-item>
				<uni-forms-item label="预约金额(万元)" name="money" v-if="isopen">
					<uni-easyinput v-model="dataForm.money" type="number" placeholder-style="color: #CD7F32;"placeholder="请输入预约金额(万元)" />
				</uni-forms-item>
				<uni-forms-item label="称呼" name="call" v-if="isopen">
					<uni-data-checkbox v-model="dataForm.call" :localdata="calls" />
				</uni-forms-item>
				<uni-forms-item label="业务经理" name="manager" v-if="isopen">
					<uni-easyinput v-model="dataForm.manager" placeholder="请输入业务经理" placeholder-style="color: #CD7F32;"/>
				</uni-forms-item>
				<uni-forms-item label="业务经理工号" name="worknumber">
					<uni-easyinput v-model="dataForm.worknumber" maxlength="14" placeholder="请输入业务经理工号" placeholder-style="color: #CD7F32;"/>
				</uni-forms-item>
				<uni-forms-item label="机构" name="organization">
					<picker :value="index" :range="array" @change="change">
						<view style="border: 1px solid #e5e5e5; width: 200rpx;text-align: center;border-radius: 5px;height: 36px;box-sizing: border-box;line-height: 36px;color: #CD7F32;">
							{{array[index]}}
						</view>
					</picker>
				</uni-forms-item>
			</uni-forms>
			
		</view>
		<button type="primary" @click="submit()" style=" width: 230rpx;background-color: #ED1C24;position: fixed;bottom: 80rpx;left: 35%;">提交</button>

	</view>
</template>

<script>
	let assessment = require('../../services/assessment.js');
	export default {
		data() {
			return {
				dataForm: {
					worknumber:'',
					name: '',
					idcard: '',
					money: null,
					call: 1,
					manager: '',
					organization:'',
					equipment:''
				},
				isopen:false,
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

		onLoad(query) {
			let self = this
			this.isopen = query.isopen
			uni.getSystemInfo({
			    success: function (res) {
			        self.dataForm.equipment = res.deviceId
			    }
			});
		},
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
							content: "预约金额(万元)不能为空",
							showCancel: false
						})
						return false;
				}
				if(self.dataForm.money != null && self.dataForm.money != '') {
					if((parseFloat(self.dataForm.money)*10000) < 20000) {
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
				if(self.dataForm.worknumber == null || self.dataForm.worknumber == '') {
					uni.showModal({
						title: "提示",
						content: "客户经理工号不能为空",
						showCancel: false
					})
					return false;
				}
				if(self.dataForm.worknumber != null && self.dataForm.worknumber != '') {
					if(self.dataForm.worknumber.length < 14){
						uni.showModal({
							title: "提示",
							content: "请输入正确长度的业务经理工号",
							showCancel: false
						})
						return false;
					}else{
						var noStr = self.dataForm.worknumber.substring(0,4)
						if(noStr != "3608"){
							uni.showModal({
								title: "提示",
								content: "请输入3608开头的业务经理工号",
								showCancel: false
							})
							return false;
						}
					}
				}
				if(self.dataForm.organization == '' || self.dataForm.organization == '请选择'){
					uni.showModal({
						title: "提示",
						content: "请选择机构",
						showCancel: false
					})
					return false;
				}
				self.dataForm.money = (parseFloat(self.dataForm.money)*10000).toFixed(2)
				assessment.addFormInfo({
					data: self.dataForm
				}).then(res => {
					if (res.result.retcode == "0000") {
						var isVip = '-1';
						if(parseInt(self.dataForm.money) > 500000){
							isVip = '0';
						}else{
							isVip = '-1';
						}
						uni.navigateTo({
							url: '../feature/evaluate?card='+ self.dataForm.idcard+"&numbers="+res.result.data+"&isVip="+isVip+"&isopen="+this.isopen
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
						}else if(res.result.retmsg == "-3"){
							uni.showModal({
								title: "提示",
								content: "该手机已参与预约",
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

<style scoped lang="scss">
	
	.bg-set {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}
	
</style>
<style>
	.uni-forms-item__label {
		width: 74px !important;
	}
	.label-text{
		color: #fff !important;
	}
	.uni-easyinput__content-input{
		color: #fff !important;
		/* placeholder{   
		                color: #ffffff !important; 
		            } */
	}
	
</style>
