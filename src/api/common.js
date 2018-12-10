// import request from '@/utils/request'
// axios 使用application / x-www-form-urlencoded格式
// 参数里面要传数组呢，只需要在qs的方法中设置它的indices为false即可，如：
// qs.stringify({a:['b','c','d']},{indices:false});
// import qs from 'qs'

// 实际上省调用queryProvinceList接口
export function queryProvinceList () {
  return new Promise((resolve, reject) => {
    resolve({
      data: [
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '110000',
          'name': '北京',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '120000',
          'name': '天津',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '130000',
          'name': '河北省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '140000',
          'name': '山西省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '150000',
          'name': '内蒙古',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '210000',
          'name': '辽宁省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '220000',
          'name': '吉林省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '230000',
          'name': '黑龙江省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '310000',
          'name': '上海',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '320000',
          'name': '江苏省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '330000',
          'name': '浙江省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '340000',
          'name': '安徽省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '350000',
          'name': '福建省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '360000',
          'name': '江西省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '370000',
          'name': '山东省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '410000',
          'name': '河南省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '420000',
          'name': '湖北省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '430000',
          'name': '湖南省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440000',
          'name': '广东省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '450000',
          'name': '广西壮族自治区',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '460000',
          'name': '海南省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '500000',
          'name': '重庆',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '510000',
          'name': '四川省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '520000',
          'name': '贵州省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '530000',
          'name': '云南省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '540000',
          'name': '西藏自治区',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '610000',
          'name': '陕西省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '620000',
          'name': '甘肃省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '630000',
          'name': '青海省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '640000',
          'name': '宁夏回族自治区',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '650000',
          'name': '新疆维吾尔自治区',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '710000',
          'name': '台湾省',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '810000',
          'name': '香港特别行政区',
          'parentCode': '1'
        }, {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '820000',
          'name': '澳门特别行政区',
          'parentCode': '1'
        }
      ]
    })
  }).then(res => {
    return res
  }).catch(() => {})

  // return request({
  //   url: '/queryCityList',
  //   method: 'post'
  // })
}
// 市和区只调用queryCityList接口
export function queryCityList (code) {
  return new Promise((resolve, reject) => {
    resolve({
      data: [
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440100',
          'name': '广州市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440200',
          'name': '韶关市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440300',
          'name': '深圳市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440400',
          'name': '珠海市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440500',
          'name': '汕头市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440600',
          'name': '佛山市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440700',
          'name': '江门市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440800',
          'name': '湛江市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440900',
          'name': '茂名市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '441200',
          'name': '肇庆市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '441300',
          'name': '惠州市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '441400',
          'name': '梅州市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '441500',
          'name': '汕尾市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '441600',
          'name': '河源市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '441700',
          'name': '阳江市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '441800',
          'name': '清远市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '441900',
          'name': '东莞市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '442000',
          'name': '中山市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '442100',
          'name': '东沙群岛',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '445100',
          'name': '潮州市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '445200',
          'name': '揭阳市',
          'parentCode': '440000'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '445300',
          'name': '云浮市',
          'parentCode': '440000'
        }
      ]
    })
  }).then(res => {
    return res
  }).catch(() => {})
  // const data = {
  //   code
  // }
  // return request({
  //   url: '/queryCityList',
  //   method: 'post',
  //   data //data: qs.stringify(data)
  // })
}
export function queryCityList2 (code) {
  return new Promise((resolve, reject) => {
    resolve({
      data: [
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440303',
          'name': '罗湖区',
          'parentCode': '440300'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440304',
          'name': '福田区',
          'parentCode': '440300'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440305',
          'name': '南山区',
          'parentCode': '440300'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440306',
          'name': '宝安区',
          'parentCode': '440300'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440307',
          'name': '龙岗区',
          'parentCode': '440300'
        },
        {
          'provinceName': null,
          'cityName': null,
          'zoneName': null,
          'provinceCode': null,
          'cityCode': null,
          'zoneCode': null,
          'code': '440308',
          'name': '盐田区',
          'parentCode': '440300'
        }
      ]
    })
  }).then(res => {
    return res
  }).catch(() => {})
  // const data = {
  //   code
  // }
  // return request({
  //   url: '/queryCityList',
  //   method: 'post',
  //   data //data: qs.stringify(data)
  // })
}
