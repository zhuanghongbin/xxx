<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入搜索消息标题" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.readStatus" :placeholder="'阅读状态'" clearable class="filter-item" style="width: 120px">
        <el-option v-for="item in readStatus" :key="item.key" :label="'状态：' + item.display_name" :value="item.key"/>
      </el-select>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" @click="handleFilter">重置</el-button> -->
      <search-group :search-data='this.listQuery' :has-reset-btn='true' @handleFilter="handleFilter" @handelResetData="handelResetData"></search-group>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate" style="margin-left: 10px;">添加</el-button>
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
      style="width: 100%;">
      <el-table-column label="序号" align="center" width="65" type="index" />
      <el-table-column label="消息标题" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.name }}</span>
          <!-- <el-tag>{{ scope.row.type | typeFilter }}</el-tag> -->
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
          <!-- <el-tag>{{ scope.row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="发送时间" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime | filterTime}}</span>
          <!-- <el-tag>{{ scope.row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- <el-table-column :label="'备注'" align="center" width="350">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.remark }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="状态" class-name="status-col" width="200">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusToChinaFilter }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" width="400" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="success" @click="handleModifyStatus(scope.row)">发布</el-button> -->
          <el-button size="mini" type="danger" @click="delData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div> -->
    <div class="pagination-container">
      <pagination v-show="total>0" :total="total" :current-page="listQuery.page" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
    </div>
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
import {getList, updateList, createList} from '@/api/sysMessage'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { MessageBox } from 'element-ui'
import SearchGroup from '@/components/SearchGroup'
// 拖拽
// import Sortable from 'sortablejs'
// import { parseTime, param2Obj } from '@/utils'

const readStatus = [
  { key: 'read', display_name: '已读' },
  { key: 'unread', display_name: '未读' }
]

// 数组转对象 ,such as { CN : "China", US : "USA" }
const arrToObj = readStatus.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'SysMessage',
  components: {
    Pagination,
    SearchGroup
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
      readStatus,
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

  created () {
    // console.log(param2Obj('https://panjiachen.github.io/vue-element-admin/#/dashboard?name=bin&age=12'))
  },
  mounted () {
    // this.getUserInfo()
    this.getList()
    this.$nextTick(function () {
      // 拖拽
      // this.setSort()
    })
    setTimeout(() => {
      this.list = this.list.map(item => {
        return Object.assign(item, {imgSrc: '/static/images/login-bg.png'})
      })
    }, 2000)
  },
  methods: {
    // 图片预览
    previews () {
      // this.viewer && this.viewer.destroy()
      // 图片预览（必须图片加载完成后才有效果）
      this.viewers = new this.$viewers(document.querySelector('#viewImage'), {
        // inline: true, // 在指定的位置展示
        movable: false,
        loop: true,
        scalable: false,
        navbar: true
      })
      console.log(this.viewers)
    },

    // 拖拽后数据重新排列
    // setSort () {
    //   const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
    //   this.sortable = Sortable.create(el, {
    //     ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
    //     setData: function(dataTransfer) {
    //       dataTransfer.setData('Text', '')
    //       // to avoid Firefox bug
    //       // Detail see : https://github.com/RubaXa/Sortable/issues/1012
    //     },
    //     onEnd: evt => {
    //       const targetRow = this.list.splice(evt.oldIndex, 1)[0]
    //       this.list.splice(evt.newIndex, 0, targetRow)

    //       // for show the changes, you can delete in you code
    //       // const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
    //       // this.newList.splice(evt.newIndex, 0, tempIndex)
    //     }
    //   })
    // },
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
        // this.$message.error(error)
      })
    },
    // 获取用户信息
    // getUserInfo () {
    //   this.$store.dispatch('GetUserInfo').then(res => { // 拉取user_info
    //     const role = res.data.role // note: roles must be a array! such as: ['editor','develop']
    //     this.$store.dispatch('GenerateRoutes', { role }).then(() => { // 根据roles权限生成可访问的路由表
    //       this.$router.addRoutes(this.$store.getters.addRouters) // 动态添加可访问路由表
    //     })
    //   }).catch((err) => {
    //     this.$store.dispatch('FedLogOut').then(() => {
    //       this.$message.error(err || '用户验证失败，请重新登录')
    //       this.$router.push({ path: '/' })
    //     })
    //   })
    // },
    // 图片预览
    // imgOnload (dom) {
    //   this.viewers && this.viewers.destroy()
    //   this.viewers = new Viewers(this.$refs[dom], {
    //     // inline: true // 在指定的位置展示
    //   })
    //   this.viewers.view()
    //   // console.log(viewer)
    // },

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

    // formatJson (filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => {
    //     if (j === 'timestamp') {
    //       return parseTime(v[j])
    //     } else {
    //       return v[j]
    //     }
    //   }))
    // }
  }
}
</script>

<style scoped>
  .avatar{
    width: 250px;
    height: 250px;
    display: inline-block;
  }
</style>
