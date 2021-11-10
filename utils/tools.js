/**
 * 工具模块
 * 日期函数，其他
 */

let reg = /^1[0-9]{10}$/;

// 两位数对齐，数字前补0
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

// get yyyy-MM-dd HH:mm:ss
const formatDateTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// get yyyyMMdd
const formatDate = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()

	return [year, month, day].map(formatNumber).join('')
}

// get yyyy-MM-dd
const formatDateLine = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()

	return [year, month, day].map(formatNumber).join('-')
}

module.exports = {

	getYestoday() {
		return formatDate(new Date(new Date().getTime() - 86400000))
	},

	getToday() {
		return formatDate(new Date())
	},

	getTodayLine() {
		return formatDateLine(new Date())
	},
	
	// 生成uuid
	randomUUID() {
		return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},

	getDatetime() {
		return formatDateTime(new Date())
	},

	getTime() {
		return (new Date()).getTime()
	},

	// get yyyy-MM month
	getMonth() {
		var date = new Date();
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		return [year, month].map(formatNumber).join('-')
	},

	// 根据日期串yyyy-mm-dd，获取n个月后的日期yyyy-mm-dd
	getNextMonthDay(date, n) {
		var d = new Date(date)
		d.setMonth(d.getMonth() + n);
		d.setDate(d.getDate() - 1);
		return formatDate1(d)
	},

	// 根据日期串yyyy-mm-dd，判断是否小于当前日期，是否过期
	outOfDate(date) {
		var d = new Date(date + ' 01:00:00')
		d.setDate(d.getDate() + 1)
		var currTime = new Date()
		return currTime >= d
	},

	getHour(date) {
		return date.getHours()
	},

	getDatetimeTest(date) {
		return formatDateTime(date)
	},

	sleep(milliSecond) {
		var now = new Date();
		var exitTime = now.getTime() + milliSecond;
		while (true) {
			now = new Date();
			if (now.getTime() > exitTime)
				return;
		}
	},

	//计算当前日期的周次
	getWeek(dateTime) {
		let temptTime = dateTime;
		//周几
		let weekday = temptTime.getDay() || 7;
		//周1+5天=周六
		temptTime.setDate(temptTime.getDate() - weekday + 1 + 5);
		let firstDay = new Date(temptTime.getFullYear(), 0, 1);
		let dayOfWeek = firstDay.getDay();
		let spendDay = 1;
		if (dayOfWeek != 0) {
			spendDay = 7 - dayOfWeek + 1;
		}
		firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay);
		let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000);
		let result = Math.ceil(d / 7);
		return result + 1;
	},

	// 获取所在月共多少天
	getThisMonthDays: function(year, month) {
		return new Date(year, month, 0).getDate()
	},
	// 获取所在月第一天是星期几
	getFirstDayOfWeek: function(year, month) {
		return new Date(Date.UTC(year, month - 1, 1)).getDay()
	},
	// 获取所在月最后一天是星期几
	getLastDayOfWeek: function(year, month) {
		let _time = new Date(year + '-' + (month + 1) + '-' + 1).getTime() - 24 * 60 * 60 * 1000;
		let lastDay = new Date(_time).getDate()
		return new Date(Date.UTC(year, month - 1, lastDay)).getDay()
	},
	
	/**
	 * string时间转long时间(当天)
	 * 传入 时分秒 返回年月日时分秒(当天)的时间戳
	 * @param time
	 * @return
	 */
	getCurrentLongTime(time) {
		let date = new Date();
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		let longTime = 0;
		let currentDate = [year, month, day, time].map(formatNumber).join('');
		var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
		var formatedDate = currentDate.replace(pattern, '$1/$2/$3 $4:$5:$6');
		return new Date(formatedDate).getTime();
	},
	/**
	 * @param {Object} obj
	 * 判断是否为空
	 */
	isEmpty(obj) {
		if (typeof obj == "undefined" || obj == null || obj == "") {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 判断是否是当天
	 * 时间戳
	 * @param time
	 */
	isCurrentDay(time) {
		let date = new Date(time);
		var Y = date.getFullYear();
		var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
		var D = date.getDate();
		let date2 = new Date();
		var Y2 = date2.getFullYear();
		var M2 = date2.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
		var D2 = date2.getDate();
		if (Y + M + D == Y2 + M2 + D2) {
			return true;
		}
		return false;
	},
	/**
	 * 补充：计算两点之间真实距离
	 * @param {number} e1 点1的东经, 单位:角度, 如果是西经则为负
	 * @param {number} n1 点1的北纬, 单位:角度, 如果是南纬则为负
	 * @param {number} e2
	 * @param {number} n2
	 * 	getDistance(e1, n1, e2, n2)
	 */
	//根据经纬度计算距离
	//         纬度       经度     纬度    经度
	getDistance(latFrom, lngFrom, latTo, lngTo) {
	    var rad = function(d){//计算角度
	      return d * Math.PI / 180.0;
	    }
	    var EARTH_RADIUS = 6378136.49;
	    var radLatFrom = rad(latFrom);
	    var radLatTo = rad(latTo);
	    var a = radLatFrom - radLatTo;
	    var b = rad(lngFrom) - rad(lngTo);
	    var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));
	    distance = distance * EARTH_RADIUS;
	    distance = Math.round(distance * 10000) / 10000;
	    return parseFloat(distance.toFixed(0));
	},
	/**
	 * 获取当前日期（2018-03-27 09:54:00）
	 *
	 * @return
	 */
	getCurrentData(date) {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		const hour = date.getHours()
		const minute = date.getMinutes()
		const second = date.getSeconds()

		return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
	},
	
	/**
	 * 获取当前日期九点半（2018-03-27 09:54:00）
	 *
	 * @return
	 */
	getCurrentDataInfo(date) {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		const hour = date.getHours()
		const minute = date.getMinutes()
		const second = date.getSeconds()
	
		return [year, month, day].map(formatNumber).join('-') + ' ' + "09:00:00"
	},

	// 驼峰转下划线
	humpTurnUnderLine(data) {
		// 数组类型
		const toLine = hump => hump.replace(/([A-Z]|\d)/g, (a, l) => `_${l.toLowerCase()}`);
		if (data instanceof Array) {
			var newObjList = [];
			for (var i = 0; i < data.length; i++) {
				let item = data[i];
				var newObj = {};
				for (let k in item) {
					if (k + "" == "id") { // 修改 id为_id
						newObj["_id"] = item["id"];
					} else {
						newObj[toLine(k)] = item[k];
					}
				}
				newObjList.push(newObj);
			}
			return newObjList;
		} else if (Object.prototype.toString.call(data) === '[object Object]') {
			var newObj = {};
			for (let k in data) {
				if (k + "" == "id") { // 修改 id为_id
					newObj["_id"] = data["id"];
				} else {
					newObj[toLine(k)] = data[k];
				}
			}
			return newObj;
		}
		return data;
	},
	// 下划线转驼峰
	underLineTurnHump(data) {
		if (data instanceof Array) {
			var newObjList = [];
			for (var i = 0; i < data.length; i++) {
				let item = data[i];
				var newObj = {};
				for (let key in item) {
					if (key + "" == "_id") { // 修改 _id为id
						newObj["id"] = item["_id"];
					} else {
						newObj[key.replace(/\_(\w)/g, function(all, letter) {
							return letter.toUpperCase();
						})] = item[key];
					}
				}
				newObjList.push(newObj);
			}
			return newObjList;
		} else if (Object.prototype.toString.call(data) === '[object Object]') {
			var newObj = new Object();
			for (let key in data) {
				if (key + "" == "_id") { // 修改 _id为id
					newObj["id"] = data["_id"];
				} else {
					newObj[key.replace(/\_(\w)/g, function(all, letter) {
						return letter.toUpperCase();
					})] = data[key];
				}
			}
			return newObj;
		}
		return data;
	},
	// md5加密
	md5(string){
		// 生成md5
		function RotateLeft(lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		}
		
		function AddUnsigned(lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}
		
		function F(x, y, z) {
			return (x & y) | ((~x) & z);
		}
		
		function G(x, y, z) {
			return (x & z) | (y & (~z));
		}
		
		function H(x, y, z) {
			return (x ^ y ^ z);
		}
		
		function I(x, y, z) {
			return (y ^ (x | (~z)));
		}
		
		function FF(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};
		
		function GG(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};
		
		function HH(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};
		
		function II(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};
		
		function ConvertToWordArray(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWords_temp1 = lMessageLength + 8;
			var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
			var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
			var lWordArray = Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
		};
		
		function WordToHex(lValue) {
			var WordToHexValue = "",
				WordToHexValue_temp = "",
				lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				WordToHexValue_temp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
			}
			return WordToHexValue;
		};
		
		function Utf8Encode(string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		};
		var x = Array();
		var k, AA, BB, CC, DD, a, b, c, d;
		var S11 = 7,
			S12 = 12,
			S13 = 17,
			S14 = 22;
		var S21 = 5,
			S22 = 9,
			S23 = 14,
			S24 = 20;
		var S31 = 4,
			S32 = 11,
			S33 = 16,
			S34 = 23;
		var S41 = 6,
			S42 = 10,
			S43 = 15,
			S44 = 21;
		string = Utf8Encode(string);
		x = ConvertToWordArray(string);
		a = 0x67452301;
		b = 0xEFCDAB89;
		c = 0x98BADCFE;
		d = 0x10325476;
		for (k = 0; k < x.length; k += 16) {
			AA = a;
			BB = b;
			CC = c;
			DD = d;
			a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
			d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
			c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
			b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
			a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
			d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
			c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
			b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
			a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
			d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
			c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
			b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
			a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
			d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
			c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
			b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
			a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
			d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
			c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
			b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
			a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
			d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
			c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
			b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
			a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
			d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
			c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
			b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
			a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
			d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
			c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
			b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
			a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
			d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
			c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
			b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
			a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
			d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
			c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
			b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
			a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
			d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
			c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
			b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
			a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
			d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
			c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
			b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
			a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
			d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
			c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
			b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
			a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
			d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
			c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
			b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
			a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
			d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
			c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
			b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
			a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
			d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
			c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
			b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
			a = AddUnsigned(a, AA);
			b = AddUnsigned(b, BB);
			c = AddUnsigned(c, CC);
			d = AddUnsigned(d, DD);
		}
		var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
		return temp.toLowerCase();
	}
}
