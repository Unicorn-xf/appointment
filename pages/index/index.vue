<template>
	<view style="background: #F8F8F8;">
		<mz-network-error @onload="getVaule"></mz-network-error>
		<view class="cmtop">
			<view class="image">
				<image mode="scaleToFill" src="../../static/images/apps/card-bg.jpg" />
			</view>
			<view class="infobox">
				<view class="avatar" @tap="onImgUserInfo">
					<image v-if="avatar == ''" src="../../static/images/apps/default-blue_2x.png" />
					<image v-else :src="avatar" />
				</view>
				<view class="name">
					<text @tap="onShowGather(0)">
						{{ name }}
						<!-- <text :class="userIsOnline.isOnLine == 0 ? 'greenCol state' : 'state'">{{userIsOnline.isOnLine == 0 ? '在线' : '离线'}}</text> -->
					</text>
					<text @tap="onShowGather(1)" class="userTel">{{ mobile }}</text>
				</view>
				<view class="selectCorp" v-if="corpFlag === true && flag === true">
					<picker :value="corpIndex" :range=" corpList " :range-key="'corp_name'" @change="changeCorp">
						<image mode="aspectFill" src="../../static/images/home/change_corp.png" />
						<text class="colorTrue">切换团队</text>
					</picker>
				</view>
				<view class="customerPos">
					<view class="pos_col">
						<text class="number">{{ totalCount }}</text>
						<text class="num">客户总计</text>
					</view>
					<view class="pos_col">
						<text class="number">{{ todayNum }}</text>
						<text class="num">个人客户</text>
					</view>
					<view class="pos_col">
						<text class="number">{{ weekNum }}</text>
						<text class="num">商户客户</text>
					</view>
					<view class="pos_col">
						<text class="number">{{ monthNum }}</text>
						<text class="num">企业客户</text>
					</view>
				</view>
			</view>
		</view>
		<view class="notificationBar" v-if="notifyInfoList != null && notifyInfoList.length > 0">
			<view class="item">
				<image mode="widthFix" src="../../static/images/home/notice_2x.png" class="icon" />
				<text class="cuIcon-notification notificationIcon"></text>
				<swiper class="swiper_container" vertical="true" autoplay="true" interval="2000" circular="true"
				 skip-hidden-item-layout="true">
					<block v-for="(item, index) in notifyInfoList" :key="index">
						<swiper-item>
							<view v-if=" item.title != 0 " class="swiper_item" :id="item.id" @tap="notifyList">{{item.title}}</view>
						</swiper-item>
					</block>
				</swiper>
				<!-- <text class="cuIcon-right rightMore"  @tap="notifyList"></text> -->
				<!-- <image class="arrow" src="../../static/images/home/arrow-right_2x.png" @tap="notifyList" /> -->
			</view>
		</view>
		<view class="contentBox">
			<!-- 待办 -->

			<view v-if=" workNoticeList.length > 0 && workNoticeList != null " class="db-big">
				<view class="item" @tap="onWorkNoticeList('sign')">
					<view class="item-title">
						<text class="cuIcon-titles notificationIcon text-blue"></text>
						<text class="indexName">待办</text>
						<text class="more">更多</text>
					</view>
					<!-- <image class="icon to-c-db" /> -->
					<!-- <image class="arrow" src="../../static/images/home/arrow-right_2x.png" /> -->
					<text class="cuIcon-right rightMore"></text>
				</view>
				<scroll-view scroll-x="false" scroll-y="true" class="daibanBig">
					<block v-for="(item, index) in workNoticeList" :key="index">
						<block v-if="index <=4">
							<view :data-length=" (item.imgUrl.length) " class="item-block" :class="index === workNoticeList.length - 1 ? '':'daiban-item-border'">
								<view class="daiban-item">
									<view :data-length=" (item.imgUrl.length) " class="swiper_container2" style="display:inline-flex;" :style="item.imgUrl.length < 5?'width:480rpx;':'width: 594rpx;'"
									 :data-id="item.id" @tap="onQtItem">
										<!-- <view class="daiban-item-num">{{index + 1 + '.'}}</view> -->
										<view style="position: absolute;top: 25rpx;left: 10rpx;">
											<text v-if="item.iconInfo" :class="'cuIcon-' + item.iconInfo.iconName" :style="{background:  item.iconInfo.iconColor}" style="font-size: 80rpx;color: #fff;border-radius: 15rpx;padding: 10rpx;text-align: center;"></text>
										</view>
										<text style="font-weight: bold;display: inline-block;margin-left: 100rpx;">{{item.workNotice + ''}}</text>
									</view>
									<text @tap.stop="photo_five" style="position: absolute;right: 108rpx;width: 88rpx !important;" v-if="item.imgUrl.length < 5 && (item.isRequirePicture === '0')"
									 :data-id=" item.id " :data-index=" index " class="btn">拍照</text>
									<text style="position: absolute;right: 0;width: 88rpx !important;" @tap.stop="exitSign(item.id,item.eventId,item.recordId,item.gmtCreate,item.signDuraction,item.clientType)"
									 class="btn" :data-id="item.id" :data-name="item.content.actionType" :data-gpsId="item.recordId">{{item.bot}}</text>
								</view>
								<view class="db-content-qd daiban-item" :data-id="item.id" @tap="onQtItem">
									<view class="swiper_container3" style="padding-left: 100rpx;">
										{{item.content.remarks}}
									</view>
								</view>
							</view>
						</block>
					</block>
				</scroll-view>
			</view>
		</view>
		
		<view class="contentBox">
			<!-- 物料 -->
		
			<view v-if=" material.length > 0 && material != null " class="db-big">
				<view class="item">
					<view class="item-title">
						<text class="cuIcon-titles notificationIcon text-blue"></text>
						<text class="indexName">物料</text>
						<!-- <text class="more">更多</text> -->
					</view>
					<!-- <text class="cuIcon-right rightMore"></text> -->
				</view>
				<scroll-view scroll-x="false" scroll-y="true" class="daibanBig">
					<block v-for="(item, index) in material" :key="index">
						<block>
							<view class="item-block" :class="index == material.length - 1 ? '':'daiban-item-border'" >
								<view class="daiban-item">
									<view class="swiper_container2" style="display:inline-flex;width:480rpx;">
										<view class="daiban-item-num">{{index + 1 + '.'}}</view>
										<text style="font-weight: bold;">{{item.merName + ''}}</text>
									</view>
									<text style="position: absolute;right: 0;width: 88rpx !important;" @tap="finish(item._id,index)"
									 class="btn">完成</text>
								</view>
								<view class="db-content-qd daiban-item">
									<view class="swiper_container3" style="padding-left: 45rpx;">
										物料缺失
									</view>
								</view>
							</view>
						</block>
					</block>
				</scroll-view>
			</view>
		</view>

		<view class="contentBox">
			<!-- 预约 -->

			<view v-if=" orderList.length > 0 && orderList != null " class="db-big">
				<view class="item" @tap="onWorkNoticeList('order')">
					<view class="item-title">
						<text class="cuIcon-titles notificationIcon text-blue"></text>
						<text class="indexName">预约</text>
						<text class="more">更多</text>
					</view>
					<text class="cuIcon-right rightMore"></text>
				</view>
				<scroll-view scroll-x="false" scroll-y="true" class="daibanBig">
					<block v-for="(item, index) in orderList" :key="index">
						<block v-if="index <=2">
							<view class="item-block" :class="index == orderList.length - 1 ? '':'daiban-item-border'" :data-phone="item.phone">
								<view class="daiban-item">
									<view class="swiper_container2" style="display:inline-flex;width:480rpx;" :data-phone="item.phone" @tap="calling">
										<!-- <view class="daiban-item-num">{{index + 1 + '.'}}</view> -->
										<view style="position: absolute;top: 25rpx;left: 10rpx;">
											<text class="cuIcon-dianhua" style="font-size: 80rpx;color: #fff;border-radius: 15rpx;padding: 10rpx;text-align: center;background:#1296db"></text>
										</view>
										<text style="font-weight: bold;display: inline-block;margin-left: 100rpx;">{{item.workNotice + ''}}</text>
									</view>
									<text style="margin-right:20rpx;" class="btn" @tap="toCustomerInfoById(item.clientType, item.clientId)">详情</text>
									<view class="btn" :data-phone="item.phone" @tap="calling">
										联系
									</view>
								</view>
								<view class="db-content-qd daiban-item" :data-phone="item.phone" @tap="calling">
									<view class="swiper_container3" style="padding-left: 100rpx;">
										{{item.bot + '：' + item.phone}}
									</view>
								</view>
							</view>
						</block>
					</block>
				</scroll-view>
			</view>
		</view>

		<view class="contentBox">
			<view v-if=" missionList.length > 0 && missionList != null " class="db-big">
				<!-- <view class="item" @tap="onWorkNoticeList"> -->
				<view class="item">
					<view class="item-title">
						<text class="cuIcon-titles notificationIcon text-blue"></text>
						<text class="indexName">任务</text>
					</view>
					<!-- <text class="cuIcon-right rightMore"></text> -->
				</view>
				<scroll-view scroll-x="false" scroll-y="true" class="daibanBig">
					<block v-for="(item, index) in missionList" :key="index">
						<block>
							<view class="item-block" :class="index == missionList.length - 1 ? '':'daiban-item-border'" style="padding-bottom: 10rpx;">
								<view style="position: absolute;top: 25rpx;left: 10rpx;">
									<text v-if="item.iconInfo" :class="'cuIcon-' + item.iconInfo.iconName" :style="{background:  item.iconInfo.iconColor}" style="font-size: 80rpx;color: #fff;border-radius: 15rpx;padding: 10rpx;text-align: center;"></text>
								</view>
								<view class="daiban-items">
									<view class="swiper_container2" style="display:inline-flex;width:480rpx;">
										<view class="daiban-item-num"><!-- {{index + 1 + '.'}} --></view>
										<text style="font-weight: bold;line-height: 60rpx;">{{item.missionName + '（' + missionTargetStr[item.missionTarget] + '）'}}</text>
									</view>
									<!-- 	<view class="btn" style="margin-left: 100rpx;">
										详情
									</view> -->
								</view>
								<view class="db-content-qd daiban-items">
									<view class="swiper_container3" style="padding-left: 45rpx;">
										<view class="progress-box">
											{{missionCirculaStr[item.missionCircula]}}：{{item.finishNum}}/{{item.missionNum}}
											<!-- <progress style="width: 470rpx;" :percent="item.progress" stroke-width="13" /> -->
											<!-- <text style="text-align:left;position: absolute;top: 48rpx;right: 20rpx;font-size: 35rpx;">{{item.progress}}%</text> -->
											<view class="cu-progress round striped active" style="width: 75%;display: block;margin-top: 10rpx;margin-bottom: 20rpx;">
												<view class="bg-green" :style="'width: '+ item.finishRate "></view>
											</view>
											<text style="text-align:left;position: absolute;top: 48rpx;right: 0rpx;font-size: 35rpx;">{{item.finishRate}}</text>
										</view>
									</view>
								</view>
							</view>
						</block>
					</block>
				</scroll-view>
			</view>
		</view>
		
		
	</view>
</template>



<script>
	
	export default {
		components: {
			
		},
		data() {
			return {
				userinfo: {},
				name: '',
				avatar: '',
				totalCount: 0,
				todayNum: 0,
				weekNum: 0,
				monthNum: 0,
				mobile: '',
				notifyInfoList: [],
				workNoticeList: [],
				orderList: [],
				missionList: [],
				missionTargetStr: ['电访', '签到', '新增客户', '新增商户', '新增企业'],
				missionCirculaStr: ['今天', '本周', '本月', '本季', '本年'],
				isTogether: false,
				userIsOnline: {},
				wgtVer: '',
				version: '',
				userId: '',
				userDingId: '',
				isWork: false,
				isFirst: true,
				data: {
					isFirst: true,
					isWork: false,
					userInfo: {},
					name: '',
					avatar: '',
					totalCount: 0,
					todayNum: 0,
					weekNum: 0,
					monthNum: 0,
					mobile: '',
					notifyInfoList: [],
					workNoticeList: [],
					orderList: [],
					missionList: [],
					missionTargetStr: ['电访', '面访', '新增客户', '新增商户', '新增企业'],
					missionCirculaStr: ['今天', '本周', '本月', '本季', '本年'],
					isTogether: false,
					userIsOnline: {},
					wgtVer: '',
					version: '',
					userId: '',
					userDingId: '',
				},
				flag: false, //网络状态标志
				corpList: [],
				corpIndex: '',
				previewIndex: 0,
				corpFlag: false, //是否有多个机构
				darValue: '',
				weekStartDate: '', //本周开始时间
				weekEndDate: '', //本周结束时间
				monthStartDate: '', //本月开始时间
				monthEndDate: '', //本月结束时间
				today: '',
				todayInfo: '',
				isShowRetry:false,
				material:[],//物料
				showGatherList:[],//退出功能
				inputFormModal:false,
				paintedEggCoder:"",
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		onReady() {
			
		},
		methods: {
			
		}
	}
</script>

<style>
	/* 工作面板 */
	/* 头部样式 */
	@import '../../static/css/customer.css';

	.selectCorp {
		display: inline-block;
		position: absolute;
		right: 30rpx;
		top: 55rpx;
		font-size: 24rpx;
		width: 200rpx;
		text-align: center;
	}

	.selectCorp image {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
		margin-right: 10rpx;
	}

	.cmtop {
		position: relative;
		/* padding: 0; */
		/* margin-bottom: 20rpx; */
		/* background: #F8F8F8; */
	}

	.cmtop .image {
		position: absolute;
		top: 0;
		right: 0rpx;
		bottom: 0rpx;
		left: 0rpx;
		z-index: 1;
		border-radius: 0rpx;
		overflow: hidden;
	}

	.cmtop .image image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.cmtop .infobox {
		position: relative;
		z-index: 2;
		background: transparent;
		margin-bottom: 0;
	}

	/* 通知 */
	.notificationBar {
		padding: 0 30rpx;
		margin-top: 10rpx;
		color: #e54059;
	}

	.rightMore {
		font-size: 30rpx;
		color: #8799A3;
	}

	.notificationIcon {
		/* padding: 0 40upx; */
		font-size: 43rpx;
		/* height: 90upx; */
		width: 30rpx;
		position: absolute;
		left: 0;
		top: 0;
	}

	.contentBox {
		margin: -15rpx 0rpx 20rpx 0rpx;
		padding: 0rpx 20rpx;
		background: #ffffff;
	}

	.item {
		display: flex;
		display: -webkit-box;
		box-align: center;
		-webkit-box-align: center;
		/* padding: 20rpx 0 20rpx 30rpx; */
	}

	.noticeModular {
		/* padding-top: 5rpx; */
		/* padding-bottom: 5rpx; */
		/* padding-left: 0 !important; */
		/* border-bottom: #f5f5f5 1px solid; */
		/* border-top: #f5f5f5 1px solid; */
	}

	.noticeModular .icon {
		width: 110rpx;
	}

	.icon {
		display: block;
		width: 84rpx;
		height: 84rpx;
	}

	.item-title {
		height: 50rpx !important;
		width: 650rpx !important;
		line-height: 50rpx;
		/* margin-top: 5rpx; */
		margin: 20rpx 10rpx;
		font-size: 37rpx;
		/* font-weight: bold; */
		position: relative;
	}

	.swiper_container {
		height: 50rpx !important;
		width: 600rpx !important;
		line-height: 50rpx;
		/* margin-top: 5rpx; */
		margin-left: 9rpx;
		font-size: 30rpx;
	}

	.swiper_item {
		font-size: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-left: 5rpx;
	}

	.arrow {
		display: block;
		width: 16rpx;
		height: 30rpx;
	}

	/* 待办 */
	.daibanBig {
		box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20rpx;
		border-radius: 5rpx;
		/* margin: 20rpx 0rpx; */
		overflow: hidden;
	}

	.daibanBig-height {
		height: 390rpx;
	}

	.daiban-item {
		padding: 10rpx 0rpx 0rpx 20rpx;
		font-size: 25rpx;
		display: inline-flex;
		width: calc(100% - 30rpx);
		position: relative;
	}
	
	.daiban-items {
		padding: 0rpx 0rpx 0rpx 75rpx;
		font-size: 25rpx;
		display: inline-flex;
		width: calc(100% - 30rpx);
		position: relative;
	}

	.daiban-item-border {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding-bottom: 30rpx;
	}

	.item-block {
		margin: 15rpx 0;
		position: relative;
		padding-bottom: 20rpx;
	}

	.daiban-item-num {
		width: 40rpx;
		margin-right: 5rpx;
	}

	.img-right {
		position: absolute;
		float: right;
		right: 0px;
		padding: 0rpx 30rpx 0rpx 60rpx;
		margin-right: 30rpx;
	}

	.to-c {
		height: 50rpx !important;
	}

	.db-big {
		margin-top: 30rpx;
	}

	/* 	.dbModular {
		padding-top: 5rpx;
		padding-bottom: 5rpx;
		padding-left: 0 !important;
	}

	.dbModular .icon {
		width: 110rpx
	}
 */
	.btn {
		display: block;
		text-align: center;
		width: 90rpx;
		font-size: 25rpx;
		color: rgb(255, 255, 255);
		text-indent: 0px;
		background-color: rgb(50, 150, 250);
		border-radius: 10rpx;
		display: inline-block;
		height: 45rpx;
		line-height: 45rpx;
		margin-top: 5rpx;
	}

	.xhx_bule {
		border-bottom: 1px solid rgb(50, 150, 250);
		color: rgb(50, 150, 250);
	}

	.db-content {
		margin-left: 65rpx;
		font-size: 25rpx;
	}

	.db-content-qd {
		font-size: 25rpx;
	}

	.swiper_container2 {
		padding-top: 10rpx;
		/* width: 634rpx !important; */
		width: 594rpx;
		/* height: 40rpx !important;
	  line-height: 40rpx; */
	}

	.to-c-db {
		height: 40rpx !important
	}

	.swiper_container3 {
		padding-top: 10rpx;
		width: 634rpx;
	}

	.btns {
		height: 70px;
		width: 78px;
		display: inline-block;
		position: fixed;
		right: 0;
		bottom: 50rpx;
		border-radius: 50%;
		line-height: 100px;
		padding: 0px;
		background-image: url("https://7478-txtest-6af55d-1302237642.tcb.qcloud.la/miniProgram/huilian/images/sign@2x.png");
		background-repeat: no-repeat;
		background-position: 50%;
		background-size: 100%;
		z-index: 999;
	}

	.indexName {
		display: inline-block;
		position: absolute;
		left: 40rpx;
		top: 0;
	}

	.more {
		display: inline-block;
		position: absolute;
		right: 0;
		top: 3rpx;
		font-size: 28rpx;
		color: #666666;
	}
	.password-border{
		border: #C0C0C0 1rpx solid;
		padding-left: 10rpx;
		height: 50rpx;
		line-height: 50rpx;
		width: 70%;
		text-align: left;
	}
	.password-view{
		display: inline-flex;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		width: 80%;
		height: 50rpx;
		line-height: 50rpx;
	}
	.padding-xl{
		padding: 0 !important;
	}
</style>
