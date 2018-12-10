<template>
  <div class="app-container">
    <el-row>
      <el-col :sm="24" :md="12">
        <!-- 为了方便管理，form表单用了label-width 最好设置成[100px, 140px, 180px, 220px]这四个值 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择活动区域"
            >
              <el-option
                v-for="item in ruleForm.tagSelOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 省市区 -->
          <el-form-item style="margin-bottom:0px;">
            <!-- province-and-city的lable 同form一样有4个预设值对应[100px, 140px, 180px, 220px] ==> [xs, sm, md, lg] -->
            <province-and-city
              :default-data.sync="ruleForm.defaultData"
              :address.sync="ruleForm.address"
              :showAddress="true"
              :checked="true" ref="areaForm"
              label-width-status="xs"
              label="地区"
              >
            </province-and-city>
          </el-form-item>
          <el-form-item >
            <gaode-map ref="gaodeMap" :marker-addres="ruleForm.address" :marker-area="ruleForm.areaName" :marker-position.sync="markerPosition"></gaode-map>
          </el-form-item>
          <el-form-item label="标注">
            <el-input v-model="markerPosition" disabled placeholder="地址标注"></el-input>
            <el-button type="warning" @click="searchArea">搜索标注</el-button>
          </el-form-item>
          <!-- <province-and-city :default-data="ruleForm.defaultData" @areaMapChange="(data) => {ruleForm.defaultData = data}"></province-and-city> -->
          <el-form-item label="多标签选择" prop="tagSelect">
            <el-select
              v-model="ruleForm.tagSelect"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择"
              @change="tagSelectChange"
              style="width:100%;"
            >
              <el-option
                v-for="item in ruleForm.tagSelOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>

          <!-- <el-form-item prop="file" class="upload-img-form" ref="uploadElement" label="logo设置">
            <el-upload
              class="avatar-uploader"
              :style="{backgroundImage:'url(' + dialogImageUrl + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"
              action="http://*****/upload"
              :show-file-list="false"
              :on-change="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <i v-show="!dialogImageUrl" class="el-icon-upload avatar-uploader-icon"></i>
              <div v-show="!dialogImageUrl" slot="tip" class="el-upload__text upload__tip">上传照片</div>
            </el-upload>
            <div class="el-upload__tip">请上传png、jpg及jpeg格式图片(大小2M以下,建议分辨率256*256)</div>
          </el-form-item> -->
          <el-form-item label="图片上传" prop="cover">
            <el-upload
              :show-file-list="false"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
              class="avatar-uploader"
              action="http://localhost:8080/"
            >
              <img v-if="ruleForm.cover" :src="imageUrl || ruleForm.cover" class="avatar" >
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 省市区地址组件
import ProvinceAndCity from '@/components/ProvinceAndCity'
// 高德地图组件
import GaodeMap from '@/components/GaodeMap'
export default {
  components: {
    ProvinceAndCity,
    GaodeMap
  },
  watch: {
    'ruleForm.defaultData': {
      handler (val) {
        setTimeout(() => {
          if (val.zoneName) {
            this.ruleForm.areaName = `${val.provinceName}${val.cityName}${val.zoneName}`
          }
        }, 0)
        console.log(val, 'defaultData')
      },
      deep: true
    }
  },
  data () {
    return {
      ruleForm: {
        // defaultData: {cityCode: '440300', provinceCode: '440000', zoneCode: '440305', cityName: '深圳市', provinceName: '广东省', zoneName: '南山区', provinceList: [], cityList: [], zoneList: []}
        defaultData: {cityCode: '440300', provinceCode: '440000', zoneCode: '440305', cityName: '', provinceName: '', zoneName: '', provinceList: [], cityList: [], zoneList: []},
        address: '',
        areaName: '', // 省市区字符串
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        file: '',
        cover: '',
        tagSel: [],
        tagSelOption: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }]
        // dialogImageUrl: Object.assign({}, this.keypersonList).iconUrl // 图片
      },
      formData: new FormData(),
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl: '',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
          // { required: true, validator: select, trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        file: [
          {required: true, message: '请上传应用图标', trigger: 'change'}
        ],
        cover: [
          { required: true, message: '图片不能为空', trigger: 'change' }
        ],
        tagSelect: [
          {required: true, message: '请选择一个标签', trigger: 'visible-change'}
        ]
      },
      markerPosition: ''
    }
  },
  computed: {
    newTagSel () {
      return this.tagSel
    }
  },
  mounted () {
    this.clearValidate('ruleForm')
  },
  methods: {
    searchArea () {
      console.log(this.ruleForm.areaName, this.ruleForm.address, 'zzzzzzzz')
      this.$refs.gaodeMap.getMarkerPointList(this.ruleForm.areaName + this.ruleForm.address)
    },
    // 添加标注点
    add () {
      let o = this.amapManager.getMap()
      let marker = new AMap.Marker({
        position: [121.59996, 31.177646]
      })
      marker.setMap(o)
    },
    // tagSelect 改变校验规则
    tagSelectChange (val) {
      this.rules.tagSelect = [
        {required: true, message: '请选择', trigger: 'change'}
      ]
    },
    // 清除表单校验
    clearValidate (formName) { // formName 可以使整个表单的ref，也可以是某个子项校验例如：本页面的 ref="oldPass"
      this.$refs[formName].clearValidate()
    },
    // 图片上传成功
    handleSuccess (res, file) {
      console.log(file)
      this.imageUrl = file.response.data.url
      this.ruleForm.cover = this.imageUrl
      console.log(file.response.data.url, 'ggggggggggg')
    },
    // 图片上传之前
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或者png格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isLt2M
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return true
        } else {
          return false
        }
      })
      // 如果没有设置验证this.$refs.areaForm.submitForm() 是 undefined
      if (this.$refs.areaForm.submitForm() === false) return false
      // todo
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      // 省市区重置
      this.$refs.areaForm.resetFields()
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // 阻止upload的自己上传，进行再操作
      this.formData.append('file', file)
      return false
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      console.log(file, 'dialogImageUrl')
      this.dialogImageUrl = file.url
    },
    // 图片预览
    // handlePictureCardPreview (file) {
    //   this.dialogImageUrl = file.url
    //   this.addKeyPersonForm.file = file.url
    //   this.doUpload = true
    //   this.$refs['addKeyPersonForm'].validateField('file')
    // },
    // 阻止upload的自己上传，进行再操作
    // beforeupload (file) {
    //   this.formData.append('file', file)
    //   return false
    // },
    uploadSuccess (response, file, fileList) {
      this.$refs.uploadElement.clearValidate()
    }
  }
}
</script>
<style >
.avatar-uploader .el-upload{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}
</style>
<style lang="scss" scoped>
/*上传图片样式*/
.avatar-uploader {
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.amap-box{
  width: 500px;
  height: 375px;
}
// .upload-img{
//   width: 100px;
//   height: 80px;
//   background: red;
//   overflow:hidden;
// }
// .add-keyperson-dialog .upload-img-form{
//   width: 1rem;
//   height: 1.35rem;
//   position: absolute;
//   right:0.2rem;
//   top:0rem;
//   border: 1px dashed #d9d9d9;
//   border-radius: 6px;
//   cursor: pointer;
//   text-align: center;
// }
// .add-keyperson-dialog .upload-img{
//   width: 1rem;
//   height: 1.35rem;
//   overflow:hidden;
// }
// .add-keyperson-dialog .upload-img:hover {
//   border-color: #409EFF;
//   color: #409EFF;
// }
// .add-keyperson-dialog .upload__tip {
//   font-size: 0.13rem;
//   text-align: center;
//   position: relative;
//   z-index:10;
//   top: -0.7rem;
// }
</style>
