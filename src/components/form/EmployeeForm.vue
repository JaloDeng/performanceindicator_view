<template>
  <el-dialog :title="dialogTitle" :close-on-click-modal="false" :visible.sync="dialogVisible" :before-close="colseForm" width="50%" center>
    <el-form :model="employee" ref="saveForm">
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="姓名" label-width="120px">
            <el-input v-model="employee.name" size="mini" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="联系方式"  label-width="120px">
            <el-input v-model="employee.phone" size="mini" placeholder="请输入联系方式"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="电子邮箱" label-width="120px">
            <el-input v-model="employee.email" size="mini" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="联系地址"  label-width="120px">
            <el-input v-model="employee.address" size="mini" placeholder="请输入联系地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="状态" label-width="120px">
            <el-switch v-model="employee.status" active-color="#13ce66" inactive-color="#ff4949" active-value="ENABLED" inactive-value="DISABLED"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="积分初始值"  label-width="120px">
            <el-input type="number" v-model="employee.initialIntegralValue" size="mini" placeholder="请输入积分初始值"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="备注" label-width="120px">
            <el-input v-model="employee.remark" type="textarea" rows="5" size="mini" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="save('saveForm')">保存</el-button>
      <el-button size="mini" @click="colseForm">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    colseForm () {
      this.$emit('colseForm')
    },
    save (formName) {
      var _this = this
      this.putRequest('/employee', _this.employee).then(resp => {
        this.colseForm()
      })
    }
  },
  props: {
    dialogTitle: String,
    dialogVisible: Boolean,
    employee: Object
  }
}
</script>

<style>
</style>
