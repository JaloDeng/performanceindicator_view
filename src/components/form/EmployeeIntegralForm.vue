<template>
  <el-dialog :title="dialogTitle" :close-on-click-modal="false" :visible.sync="dialogVisible" :before-close="colseForm" width="50%" center>
    <el-form :model="employeeIntegral" ref="saveForm">
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="参与者" label-width="120px">
            <el-input v-model="employeeIntegral.employeeId" size="mini"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12">
          <el-form-item label="项目"  label-width="120px">
            <el-input v-model="employeeIntegral.integralId" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="积分"  label-width="120px">
            <el-input type="number" v-model="employeeIntegral.integralValue" size="mini" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="时间" label-width="120px">
            <el-date-picker v-model="employeeIntegral.integralTime" type="datetime" size="mini" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="备注" label-width="120px">
            <el-input v-model="employeeIntegral.remark" type="textarea" rows="5" size="mini" placeholder="请输入备注"></el-input>
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
      this.putRequest('/employee/integral', _this.employeeIntegral).then(resp => {
        this.colseForm()
      })
    }
  },
  props: {
    dialogTitle: String,
    dialogVisible: Boolean,
    employeeIntegral: Object
  }
}
</script>

<style>
</style>
