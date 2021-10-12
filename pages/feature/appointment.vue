<template>
	<view>

		<view class="example" style="padding: 35rpx;">
			<uni-forms ref="dataForm" :rules="rules" :modelValue="dataForm">
				<uni-forms-item label="客户姓名"  name="name">
					<uni-easyinput v-model="dataForm.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="身份证号"  name="age">
					<uni-easyinput v-model="dataForm.idCard" placeholder="请输入身份证号前14位，后4位不输" />
				</uni-forms-item>
				<uni-forms-item label="预约金额"  name="age">
					<uni-easyinput v-model="dataForm.money" placeholder="请输入预约金额(元)" />
				</uni-forms-item>
				<uni-forms-item label="称呼"  name="age">
					<uni-data-checkbox v-model="dataForm.call" :localdata="calls" />
				</uni-forms-item>
				<uni-forms-item label="业务经理"  name="age">
					<uni-easyinput v-model="dataForm.manager" placeholder="请输入业务经理" />
				</uni-forms-item>
			</uni-forms>
			<button type="primary" @click="submit('dataForm')" style="width: 120px;background-color: #ED1C24;">提交</button>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 校验表单数据 
				dataForm: {
					name: '',
					idCard: '',
					money: '',
					call: 1,
					manager: ''
				},
				calls: [{
					text: '男',
					value: 1
				}, {
					text: '女',
					value: 0
				}],
				
				// 校验规则
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
			submit(ref) {
				console.log(ref);
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `预约成功`
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
		}
	}
</script>