<!-- provinceAndCity -->
<template>
  <div class="province-and-city">
    <!-- label-width="100px"  -->
    <el-form :model="formData" :rules="checked? rules: {}"  ref="areaForm">
      <el-row>
        <el-col :span="8">
          <el-form-item
            :label="label"
            prop="vProvinceCode"
            class="province"
            :class="{
              'label-width-xs': labelWidthStatus === 'xs',
              'label-width-sm': labelWidthStatus === 'sm',
              'label-width-md': labelWidthStatus === 'md',
              'label-width-lg': labelWidthStatus === 'lg'}">
            <el-select
              v-model="formData.vProvinceCode"
              @change="choseProvince"
              placeholder="省级地区"
              :disabled='disabled'
              style="width:96%;">
              <el-option
                v-for="item in vProvinceList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="city" prop="vCityCode">
            <el-select
              v-model="formData.vCityCode"
              @change="choseCity"
              placeholder="市级地区"
              :disabled='disabled'
              style="width:96%; margin: 0 0 0 2%;">
              <el-option
                v-for="item in vCityList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="zone" prop="vZoneCode">
            <el-select
              v-model="formData.vZoneCode"
              @change="choseBlock"
              placeholder="区级地区"
              :disabled='disabled'
              style="width:96%; margin: 0 0 0 4%;">
              <el-option
                v-for="item in vZoneList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="showAddress">
        <el-col :span="24">
          <el-form-item
            prop="vAddress"
            :class="{
              'label-width-xs': labelWidthStatus === 'xs',
              'label-width-sm': labelWidthStatus === 'sm',
              'label-width-md': labelWidthStatus === 'md',
              'label-width-lg': labelWidthStatus === 'lg'}">
            <el-input v-model="formData.vAddress" :disabled='disabled' placeholder="请输入详细地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {queryProvinceList, queryCityList, queryCityList2} from '@/api/common'

// import {area} from '@/utils/validate'
export default {
  components: {},
  props: {
    // 默认选中数据
    defaultData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    address: {
      type: String,
      default: ''
    },
    showAddress: {
      type: Boolean,
      default: false
    },
    // 是否可编辑
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否校验
    checked: {
      type: Boolean,
      default: false
    },
    // 标签宽度
    labelWidthStatus: {
      type: String,
      default: 'xs'
    },
    // label
    label: {
      type: String,
      default: '地区'
    }
  },
  data () {
    return {
      vProvinceList: [],
      vCityList: [],
      vZoneList: [],
      provinceName: '',
      cityName: '',
      zoneName: '',
      formData: {
        vProvinceCode: '',
        vCityCode: '',
        vZoneCode: '',
        vAddress: ''
      },
      rules: {
        vProvinceCode: [
          {required: true, trigger: 'change', message: '请选择省'}
        ],
        vCityCode: [
          { required: true, trigger: 'change', message: '请选择市' }
        ],
        vZoneCode: [
          { required: true, trigger: 'change', message: '请选择区' }
        ],
        vAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    newData () {
      return this.defaultData
    },
    newAddress () {
      return this.address
    }
  },
  watch: {
    'formData.vProvinceCode' (val) {
      if (val) {
        if (!this.provinceName) {
          this.provinceName = this.codeToName(val, this.vProvinceList)
        }
        this.$emit(
          'update:defaultData',
          {
            provinceCode: val,
            cityCode: '',
            zoneCode: '',
            cityName: '',
            provinceName: this.provinceName,
            zoneName: '',
            provinceList: this.vProvinceList,
            cityList: '',
            zoneList: ''
          }
        )
        console.log(val, '省市区的省变化')
      }
    },
    'formData.vCityCode' (val) {
      if (val) {
        if (!this.cityName) {
          this.cityName = this.codeToName(val, this.vCityList)
        }
        this.$emit(
          'update:defaultData',
          {
            provinceCode: this.formData.vProvinceCode,
            cityCode: val,
            zoneCode: '',
            cityName: this.cityName,
            provinceName: this.provinceName,
            zoneName: '',
            provinceList: this.vProvinceList,
            cityList: this.vCityList,
            zoneList: ''
          }
        )
        console.log(val, '省市区的市变化')
      }
    },
    'formData.vZoneCode' (val) {
      if (val) {
        if (!this.zoneName) {
          this.zoneName = this.codeToName(val, this.vZoneList)
        }
        this.$emit('update:defaultData',
          {
            provinceCode: this.formData.vProvinceCode,
            cityCode: this.formData.vCityCode,
            zoneCode: val,
            cityName: this.cityName,
            provinceName: this.provinceName,
            zoneName: this.zoneName,
            provinceList: this.vProvinceList,
            cityList: this.vCityList,
            zoneList: this.vZoneList
          }
        )
        console.log(val, '省市区的区变化')
      }
    },
    'formData.vAddress' (val) {
      this.$emit('update:address', val)
    }
  },
  methods: {
    // 参数code: 对应的省市区code， list: 对应的省市区列表
    codeToName (code, list) {
      let tempArr = list.filter(item => {
        return item.code === code
      })
      return tempArr.length && tempArr[0].name
    },
    // 参数isSelf 表示是否手动更改
    getProvinceData (isSelf) {
      queryProvinceList().then(response => {
        let data = response.data
        this.vProvinceList = []
        // 省
        data.forEach(item => {
          this.vProvinceList.push({code: item.code, name: item.name})
        })
        if (!isSelf) {
          this.formData.vProvinceCode = this.newData.provinceCode
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getCityData (code, isSelf) {
      queryCityList(code).then(response => {
        let data = response.data
        this.vCityList = []
        // 市
        data.forEach(item => {
          this.vCityList.push({code: item.code, name: item.name})
        })
        if (!isSelf) {
          this.formData.vCityCode = this.newData.cityCode
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getZoneData (code, isSelf) {
      queryCityList2(code).then(response => {
        let data = response.data
        this.vZoneList = []
        // 区
        data.forEach(item => {
          this.vZoneList.push({code: item.code, name: item.name})
        })
        if (!isSelf) {
          this.formData.vZoneCode = this.newData.zoneCode
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 选省
    choseProvince (e) {
      for (let item in this.vProvinceList) {
        if (e === this.vProvinceList[item].code) {
          this.formData.vCityCode = ''
          this.formData.vZoneCode = ''
          this.getCityData(e, true)
          this.provinceName = this.vProvinceList[item].name
          break
        }
      }
    },
    // 选市
    choseCity (e) {
      for (let item in this.vCityList) {
        if (e === this.vCityList[item].code) {
          this.formData.vZoneCode = ''
          this.getZoneData(e, true)
          this.cityName = this.vCityList[item].name
          break
        }
      }
    },
    // 选区
    choseBlock (e) {
      for (let item in this.vZoneList) {
        if (e === this.vZoneList[item].code) {
          this.zoneName = this.vZoneList[item].name
          break
        }
      }
    },
    // 提交校验
    submitForm () {
      this.$refs['areaForm'].validate((valid) => {
        if (valid) {
          return true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetFields () {
      this.$refs['areaForm'].resetFields()
    }
  },
  created () {
    // 设置默认省数据
    if (this.newData.provinceList && this.newData.provinceList.length) {
      this.vProvinceList = this.newData.provinceList
      this.formData.vProvinceCode = this.newData.provinceCode
      this.provinceName = this.codeToName(this.formData.vProvinceCode, this.vProvinceList)
    } else if (!this.vProvinceList.length) {
      this.getProvinceData()
    }
    // 设置默认市数据
    if (this.newData.cityList && this.newData.cityList.length) {
      this.vCityList = this.newData.provinceList
      this.formData.vCityCode = this.newData.cityCode
      this.cityName = this.codeToName(this.formData.vCityCode, this.vCityList)
    } else {
      this.getCityData(this.formData.vProvinceCode)
    }
    // 设置默认区数据
    if (this.newData.zoneList && this.newData.zoneList.length) {
      this.vZoneList = this.newData.zoneList
      this.formData.vZoneCode = this.newData.zoneCode
      this.zoneName = this.codeToName(this.formData.vZoneCode, this.vZoneList)
    } else {
      this.getZoneData(this.formData.vCityCode)
    }
    // 设置详细地址
    this.formData.vAddress = this.newAddress
  }
}
</script>
<style lang='scss' >
.province-and-city{
  .label-width-xs {
    .el-form-item__label{
      width: 100px;
      position: absolute;
      left: -100px;
    }
  }
  .label-width-sm {
    .el-form-item__label{
      width: 140px;
      position: absolute;
      left: -140px;
    }
  }
  .label-width-md {
    .el-form-item__label{
      width: 180px;
      position: absolute;
      left: -180px;
    }
  }
  .label-width-lg {
    .el-form-item__label{
      width: 200px;
      position: absolute;
      left: -200px;
    }
  }
  .city div.el-form-item__error{
    left: 5px;
  }
  .zone div.el-form-item__error{
    left: 10px;
  }
}
</style>
