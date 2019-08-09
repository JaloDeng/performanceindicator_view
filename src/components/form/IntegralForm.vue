<template>
  <el-dialog :title="dialogTitle" :close-on-click-modal="false" :visible.sync="dialogVisible" :before-close="colseForm" width="50%" center>
    <el-form :model="integral" ref="saveForm">
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="项目" label-width="120px">
            <el-input v-model="integral.label" size="mini" placeholder="请输入项目"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="积分"  label-width="120px">
            <el-input type="number" v-model="integral.value" size="mini" placeholder="请输入积分"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="备注" label-width="120px">
            <el-input v-model="integral.remark" type="textarea" rows="5" size="mini" placeholder="请输入备注"></el-input>
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
    return {
    }
  },
  methods: {
    colseForm () {
      this.$emit('colseForm')
    },
    save (formName) {
      var _this = this
      this.putRequest('/integral', _this.integral).then(resp => {
        this.colseForm()
      })
    }
  },
  props: {
    dialogTitle: String,
    dialogVisible: Boolean,
    integral: Object
  }
}
</script>

<style>
</style>
