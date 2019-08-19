<template>
  <el-container>
    <el-main>
      <template>
        参与者状态：
        <el-select v-model="searchParams.employeeStatus" @change="changeEmployeeStatusOption" size="mini" style="width: 100px;">
          <el-option v-for="item in employeeStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        参与者：
        <el-select v-model="searchParams.employeeIds" multiple collapse-tags @change="search" size="mini">
          <el-option v-for="item in employeeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        项目：
        <el-select v-model="searchParams.integralIds" multiple collapse-tags @change="search" size="mini">
          <el-option v-for="item in integralOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        获取时间：
        <el-date-picker v-model="integralTime" type="datetimerange" range-separator="-" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" size="mini"
          :start-placeholder="searchParams.integralStartTime" :end-placeholder="searchParams.integralEndTime" @change="integralSearchTimeChange" style="width: 320px">
        </el-date-picker>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="warning" size="mini" icon="el-icon-download" @click="exportExcel">导出</el-button>
      </template>
      <br style="line-height: 40px;">
      <template>
        <el-table :data="tableData" size="mini" border style="width: 100%;">
          <el-table-column align="center" width="50" label="序号" type="index" fixed="left"></el-table-column>
          <el-table-column align="center" width="150" label="参与者" prop="name" fixed="left"></el-table-column>
          <el-table-column align="center" width="150" label="上期累计" prop="lastIntegral" fixed="left"></el-table-column>
          <el-table-column v-for="item in tableColumns" width="150" align="center" :key="item.id" :property="item.columnName" :label="item.label"></el-table-column>
          <el-table-column align="center" width="150" label="减分" prop="reduceIntegral"></el-table-column>
          <el-table-column align="center" width="200" label="累计分数" prop="integral" fixed="right"></el-table-column>
        </el-table>
      </template>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      employeeOptions: [],
      employeeStatusOptions: [],
      integralOptions: [],
      integralTime: [],
      searchParams: {
        employeeIds: [],
        employeeStatus: 'ENABLED',
        integralIds: [],
        integralEndTime: '',
        integralStartTime: ''
      },
      tableColumns: [],
      tableData: []
    }
  },
  methods: {
    changeEmployeeStatusOption () {
      this.employeeOptions = []
      this.getEmployeeOptions()
    },
    exportExcel () {},
    getEmployeeOptions () {
      var _this = this
      this.getRequest('/employee', {status: _this.searchParams.employeeStatus}).then(resp => {
        if (resp.data && resp.data.data) {
          _this.employees = resp.data.data
          _this.searchParams.employeeIds = []
          for (let i = 0; i < _this.employees.length; i++) {
            const item = _this.employees[i]
            _this.employeeOptions.push({label: item.name, value: item.id})
            _this.searchParams.employeeIds.push(item.id)
          }
        }
      })
    },
    getEmployeeStatusOptions () {
      var _this = this
      this.getRequest('/enum/active').then(resp => {
        if (resp.data && resp.data.data) {
          _this.employeeStatusOptions = _this.employeeStatusOptions.concat(resp.data.data)
          _this.employeeStatusOptions.push({label: '全部', value: ''})
        }
      })
    },
    getIntegralOptions () {
      var _this = this
      this.postRequest('/integral', {}).then(resp => {
        if (resp.data && resp.data.data) {
          _this.integrals = resp.data.data
          for (let i = 0; i < _this.integrals.length; i++) {
            const item = _this.integrals[i]
            _this.integralOptions.push({label: item.label, value: item.id})
            _this.searchParams.integralIds.push(item.id)
          }
        }
      })
    },
    getTableColumn () {
      var _this = this
      this.postRequest('/integral', _this.searchParams).then(res => {
        _this.tableColumns = res.data.data
      })
    },
    getTableData () {
      var _this = this
      this.postRequest('/employee/integral/statistics', _this.searchParams).then(res => {
        _this.tableData = res.data.data
      })
    },
    integralSearchTimeChange () {
      var selectTime = this.integralTime
      if (selectTime && selectTime.length > 0) {
        this.searchParams.integralStartTime = selectTime[0]
        this.searchParams.integralEndTime = selectTime[1]
      } else {
        this.searchParams.integralStartTime = ''
        this.searchParams.integralEndTime = ''
      }
    },
    search () {
      this.getTableColumn()
      this.getTableData()
    }
  },
  mounted () {
    this.getEmployeeOptions()
    this.getEmployeeStatusOptions()
    this.getIntegralOptions()
    this.getTableColumn()
  }
}
</script>

<style>
</style>
