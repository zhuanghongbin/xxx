<template>
  <div class="app-container">
    <tool-tip :placement="'top-end'" text="自定义文本信息"></tool-tip>
    <Linebar />
    <Linebar :status="'primary'"/>
    <Linebar :status="'success'"/>
    <Linebar :status="'warning'"/>
    <Linebar :status="'danger'"/>
    <Linebar :size="'small'" :status="'primary'"/>
    <Linebar :size="'big'" :status="'primary'"/>
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入搜索消息标题" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.readStatus" :placeholder="'阅读状态'" clearable class="filter-item" style="width: 120px">
        <el-option v-for="item in readStatus" :key="item.key" :label="'状态：' + item.display_name" :value="item.key"/>
      </el-select>
      <search-group :search-data='this.listQuery' :has-reset-btn='true' @handleFilter="handleFilter" @handelResetData="handelResetData"></search-group>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate" style="margin-left: 10px;">添加</el-button>
      <!-- <el-select v-model="batchOperationSelect" :placeholder="'批量操作'" clearable class="filter-item" style="width: 120px">
        <el-option v-for="item in batchOperation" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select> -->
      <dropdown-menu :isActive.sync="dropdownActive" :items="articleList" style="margin-left: 10px;" title="批量操作" @dropdownMenuOption="dropdownMenuOption"></dropdown-menu>
    </div>
    <el-table
      v-loading="listLoading"
      id="viewImage"
      :key="tableKey"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" width="65" type="selection"></el-table-column>
      <el-table-column label="消息标题" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅读状态" min-width="150px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.readStatus | statusFilter">{{ scope.row.readStatus | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center" min-width="150px">
        <template slot-scope="scope">
          <!-- <img :ref="`${scope.row.id}`" :src="scope.row.imgSrc" width="40" height="40" class="viewImg" @click="imgOnload(`${scope.row.id}`)"> -->
          <div class="table-img-wrap" v-viewers="{navbar: false}">
            <img v-if="scope.row.imgSrc" :src="scope.row.imgSrc" width="40" height="40" class="viewImg">
            <img v-else src="/static/images/logo.png" width="40" height="40" class="viewImg">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发件人" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.sender }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送时间" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime | filterTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="400" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="success" @click="handleModifyStatus(scope.row)">启用</el-button>
          <el-button size="mini" type="danger" @click="delData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-container">
      <pagination v-show="total>0" :total="total" :current-page="listQuery.page" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
    </div>
    <!-- 模态框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="编辑">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="消息标题" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="阅读状态" prop="type" v-show="dialogStatus==='update'">
          <el-select v-model="temp.readStatus" class="filter-item" placeholder="Please select" disabled >
            <el-option v-for="item in readStatus" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="图片上传" prop="imgSrc">
          <!-- <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea" placeholder="Please input"/> -->
          <el-upload
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            class="avatar-uploader"
            action="http://localhost:8080/"
          >
            <img v-if="temp.imgSrc" :src="imageUrl || temp.imgSrc" class="avatar" >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Linebar from '@/components/Linebar'
import ToolTip from '@/components/ToolTip'
import DropdownMenu from '@/components/DropdownMenu'
import {getList, updateList, createList} from '@/api/sysMessage'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { MessageBox } from 'element-ui'
import SearchGroup from '@/components/SearchGroup'

const readStatus = [
  { key: 'read', display_name: '已读' },
  { key: 'unread', display_name: '未读' }
]
const batchOperation = [ // 批量操作
  { key: 'stop', display_name: '停用' },
  { key: 'start', display_name: '启用' },
  { key: 'del', display_name: '删除' }
]
// 数组转对象 ,such as { CN : "China", US : "USA" }
const arrToObj = readStatus.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'Index',
  components: {
    ToolTip,
    Pagination,
    SearchGroup,
    Linebar,
    DropdownMenu
  },
  filters: {
    typeFilter (type) {
      return arrToObj[type]
    },
    statusFilter (status) {
      const statusMap = {
        read: 'success',
        unread: 'danger'
      }
      return statusMap[status]
    },
    filterTime (date) {
      if (date) {
        return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)} ${date.substring(8, 10)}:${date.substring(10, 12)}`
      }
    }
  },
  data () {
    return {
      articleList: [
        {title: '停用', value: 'stop'},
        {title: '启用', value: 'start'},
        {title: '删除', value: 'del'}
      ],
      readStatus,
      batchOperation, // 批量操作
      dropdownActive: false,
      selectId: [], // 批量操作选中的数据id
      /** 表格 */
      // sortable: null, // 表格拖拽
      tableKey: 0, // 表格key
      list: null, // 表格数据列表
      newList: [],
      total: 0, // 表格数据条数
      listLoading: true,
      /** 分页 */
      listQuery: {
        page: 1,
        limit: 10,
        sort: '+id',
        name: undefined,
        // startTime: '',
        readStatus: undefined
      },
      /** 表格处理单行数据 */
      temp: {
        id: undefined,
        imgSrc: '',
        name: '',
        sender: '',
        startTime: '',
        readStatus: ''
      },
      /** 对话框 */
      dialogFormVisible: false,
      dialogStatus: '',
      /** 表单校验规则 */
      rules: {
        name: [{ required: true, message: '消息标题不能为空', trigger: 'blur' }],
        imgSrc: [{ required: true, message: '图片不能为空', trigger: 'change' }]
      },
      imageUrl: '/static/images/login-bg.png' // 上传的图片地址
    }
  },
  watch: {
  },
  mounted () {
    // this.getUserInfo()
    this.getList()
    this.$nextTick(function () {
      // 拖拽
      // this.setSort()
    })
  },
  methods: {
    // dropdown
    dropdownMenuOption (val) {
      console.log(val, 'ssssssssssssssssssssss')
      if (val === 'start') {
        // todo 启用
      } else if (val === 'stop') {
        // todo 停用
      } else if (val === 'del') {
        // 删除
        this.delSelectData(this.selectId)
      }
      this.dropdownActive = false
    },
    // 遍历数组，遍历出对象中的某个key,重新组成数组 [{name: 'jim', age: 8}, {name: 'tom', age: 9}] => ['jim', 'tom']
    mapObjArrVal (arr, objKey) {
      let tempArr = arr.map(item => {
        return item[objKey]
      })
      return tempArr
    },
    // 批量操作 选择需要操作的数据
    handleSelectionChange (val) {
      this.selectId = this.mapObjArrVal(val, 'id')
      console.log(this.selectId, '批量操作时，选中的数据')
    },
    // 图片预览
    previews () {
      // this.viewer && this.viewer.destroy()
      // 图片预览（必须图片加载完成后才有效果）
      this.viewers = new this.$viewers(document.querySelector('#viewImage'), {
        // inline: true, // 在指定的位置展示`
        movable: false,
        loop: true,
        scalable: false,
        navbar: true
      })
      console.log(this.viewers)
    },
    // 获取数据列表
    getList () {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.listLoading = false
        this.total = response.data && response.data.length
        if (this.total) {
          this.list = response.data
          // 这时候才能进行图片预览
          this.$nextTick(() => {
            // this.previews()
          })
        }
      }).catch(error => {
        this.listLoading = false
        console.log(error)
      })
    },
    // 图片上传成功
    handleSuccess (res, file) {
      // console.log(file)
      // this.imageUrl = file.response.data.url
      // this.temp.imgSrc = this.imageUrl
      // console.log(file.response.data.url, 'ggggggggggg')
    },
    // 图片上传之前
    beforeUpload (file) {
      // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      // const isLt2M = file.size / 1024 / 1024 < 5

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG或者png格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 5MB!')
      // }
      // return isLt2M
    },
    // 搜索
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    // 重置搜索
    handelResetData (resetData) {
      this.listQuery = resetData
      console.log(this.listQuery, 'resetafter')
    },
    handleModifyStatus (row) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    // 重置dialog 的数据
    resetTemp () {
      this.temp = {
        id: undefined,
        imgSrc: '/static/images/login-bg.png',
        name: '',
        sender: '',
        startTime: '',
        readStatus: ''
      }
      // this.imageUrl = ''
    },
    // 添加操作
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    // 编辑
    handleUpdate (row) {
      console.log(row, '编辑的行数据')
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 更新一条数据
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // 替换编辑的那条数据
          const newList = this.list.map(item => {
            if (item.id === tempData.id) {
              return tempData
            } else {
              return item
            }
          })
          // 真正的更新后台数据
          this.handleList(newList)
        }
      })
    },
    // 创建一条数据
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createList(this.temp).then((res) => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {})
        }
      })
    },
    // 删除一条数据
    delData (id) {
      MessageBox.confirm('确定删除此条信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const newList = this.list.filter(item => {
          return item.id !== id
        })
        // this.handleList(newList)
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000,
          offset: 80
        })
        const index = this.list.indexOf(newList)
        console.log(index)
        this.list.splice(index, 1)
      }).catch(() => {})
    },
    // 批量删除数据
    delSelectData (arr) {
      if (!arr.length) {
        this.$notify({
          title: '提示',
          message: '请选择至少一条数据进行删除',
          type: 'warning',
          duration: 2000,
          offset: 80
        })
        return
      }
      MessageBox.confirm('确定删除选中的信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const newList = this.list.filter(item => {
          return Array.indexOf(arr, item.id) === -1
        })
        // this.handleList(newList)
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000,
          offset: 80
        })
        this.list = newList
        setTimeout(() => {
          this.getList()
        }, 2000)
      }).catch(() => {})
    },
    // 处理 参数是数组列表[{},{}]
    handleList (requireData) {
      const content = JSON.stringify(requireData)
      updateList({ content }).then((res) => {
        this.dialogFormVisible = false
        // this.getList()
        this.list = res.data
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000,
          offset: 80
        })
      })
    },
    // 删除
    handleDelete (row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000,
        offset: 80
      })
      const index = this.list.indexOf(row)
      console.log(index)
      this.list.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
  .avatar{
    width: 250px;
    height: 250px;
    display: inline-block;
  }
</style>
