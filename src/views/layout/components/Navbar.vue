<template>
  <div class="navbar">
    <el-row>
      <!-- logo -->
      <el-col class="logo hidden-md-and-down"  :xs="24" :sm="24" :md="4" :lg="4">
        <router-link to="/dashboard">
          <img :src="require('@/assets/images/admin/logo.png')" alt="">
          <p class="logo-text">公司口号公司口号公司口号</p>
        </router-link>
      </el-col>
      <!-- 控制sidebar -->
      <el-col class="collapse-btn" :xs="2" :sm="2" :md="2" :lg="2">
        <div class="hamburger" :class="{'active': sidebar.opened}" @click="toggleClick" >
          <i class="el-icon-tickets"></i>
        </div>
      </el-col>
      <!-- 主导航 -->
      <el-col class="content-info" :xs="22" :sm="22" :md="22" :lg="18">
        <!-- topbar 中的导航 -->
        <!-- <el-row>
          <el-col :xs="24" :sm="12" :md="16" :lg="16">
            <el-menu class="header-menu hidden-xs-only" :default-active="headerIndex" mode="horizontal" @select="handleSelect" background-color="#3e4558" text-color="#fff" active-text-color="#ffd04b">
              <el-menu-item :index="index + ''" v-for="(item, index) in headerList" :key="index" class="index-li">
                <router-link :to="item.path" class="index-a">
                  <i :class="item.icon"></i>{{item.name}}
                </router-link>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col class="user-info" :xs="24" :sm="12" :md="8" :lg="8">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link userinfo-inner"><img :src="userPhoto"/>{{userName}}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row> -->
        <nav  class="main-nav">
          <span class="hidden-sm-and-down">
            <router-link to="/sysmessage/index">
              <el-badge :value="200" :max="99" class="badge-item">
                <a href="">系统消息</a>
                <!-- <el-button size="small">评论</el-button> -->
              </el-badge>
            </router-link>
            <a href="">新手引导</a>
            <!-- <a href="">
              <i class="iconfont icon-message_fill"></i>
              商户管理员<span></span>
            </a> -->
            <a href="">余额 <span class="text-pink">55.00</span> 元</a>
            <a href="javascript:void(0);" @click.prevent="resetPassword">修改密码</a>
            <a href="javascript:void(0);" @click.prevent="loginOut">
              <i class="iconfont icon-message_fill"></i>
              退出
            </a>
          </span>
          <router-link class="user-info" to="/account/index"><img :src="avatar"/>{{name}}</router-link>
          <!-- <el-dropdown trigger="click" class="user-info">
            <span class="el-dropdown-link userinfo-inner"><img :src="userPhoto"/>{{userName}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided @click.native="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </nav>
      </el-col>
    </el-row>
    <!-- 修改密码 dialog -->
    <el-dialog title="修改密码" :visible.sync="dialogResetPassword" width="750px" >
      <el-form ref="passForm" :model="passwordInfo" :rules="passwordRules">
        <el-form-item label="原始密码" :label-width="formLabelWidth" prop="oldPass" ref="oldPass">
          <el-input  type="password" v-model="passwordInfo.oldPass" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPass">
          <el-input  type="password" v-model="passwordInfo.newPass" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
          <el-input  type="password" v-model="passwordInfo.checkPass" auto-complete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResetPassword = false">取 消</el-button>
        <el-button type="primary" @click="confirmPass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {password, checkPassword} from '@/utils/validate'
export default {
  data () {
    return {
      // userName: '商户管理员: 刘先生',
      // userPhoto: require('@/assets/images/admin/timg.jpg'),
      // companyPhoto: require('@/assets/images/admin/timg.jpg'),
      dialogResetPassword: false,
      passwordInfo: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      passwordRules: {
        oldPass: [
          {validator: password, trigger: 'blur', defRequired: true}
        ],
        newPass: [
          {validator: password, trigger: 'blur', defRequired: true}
        ],
        checkPass: [
          {validator: checkPassword, trigger: 'blur', defRequired: true}
        ]
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    confirmPass () {
      this.$refs.passForm.validate(valid => {
        if (valid) {
          // doto 请求修改密码接口
          this.$store.dispatch('ResetPassword', this.passwordInfo).then(() => {
            this.dialogResetPassword = false
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetPassword () {
      // 清空密码信息
      for (let p in this.passwordInfo) {
        this.passwordInfo[p] = ''
      }
      this.dialogResetPassword = true
      this.resetField('passForm')
    },
    // 重置表单校验
    resetField (formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
    },
    // 清除表单校验
    // clearValidate(formName) { // formName 可以使整个表单的ref，也可以是某个子项校验例如：本页面的 ref="oldPass"
    //   this.$refs[formName].clearValidate()
    // },
    // 退出登录
    loginOut () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning'
      }).then(() => {
        // storage.removeSession('index')
        // storage.removeSession('slide_index')
        this.$router.replace('login')
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    // 折叠导航栏
    toggleClick () {
      this.$store.dispatch('toggleSideBar')
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  background: #3e4558;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 9999;
}
.main-nav{
  height: 60px;
  a{
    display: inline-block;
    margin: 0 30px;
    color: #fff;
    &:hover{
      text-decoration: underline;
    }
  }
}
.badge-item{
  a{
    margin: 0px;
  }
}
.logo {
  height: 60px;
  overflow: hidden;
  line-height: 60px;
  border-color: rgba(238, 241, 146, 0.3);
  border-right-width: 1px;
  border-right-style: solid;
  img {
    display: inline-block;
    height: 50px;
    padding: 5px;
    margin: 0 auto;
  }
  .logo-text {
    font-size: 16px;
    display: inline-block;
    color: #fff;
  }
}
.hamburger {
  padding: 0 18px;
  font-size: 24px;
  height: 60px;
  line-height: 60px;
  color: white;
  cursor: pointer;
  &.active{
    color: #409EFF;
  }
}
.content-info {
  text-align: right;
  .user-info{
    display: inline-block;
    line-height: 60px;
    padding-right: 35px;
    text-align: right;
    cursor: pointer;
    color: #fff;
    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }
}
</style>
