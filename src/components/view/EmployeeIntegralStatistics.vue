<template>
  <el-container>
    <el-main>
      <template>
        获取时间：
        <el-date-picker v-model="integralTime" type="datetimerange" range-separator="-" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" size="mini"
          :start-placeholder="searchParams.integralStartTime" :end-placeholder="searchParams.integralEndTime" @change="integralSearchTimeChange" style="width: 320px">
        </el-date-picker>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="warning" size="mini" icon="el-icon-download" @click="exportExcel">导出</el-button>
      </template>
      <br style="line-height: 40px;">
      <template>
        <el-table :data="tableData" size="mini" border style="width: 100%">
          <el-table-column align="center" width="50" label="序号" type="index" fixed="left"></el-table-column>
          <el-table-column align="center" width="200" label="参与者" prop="name" fixed="left"></el-table-column>
          <el-table-column align="center" width="200" label="上期累计" prop="lastIntegral" fixed="left"></el-table-column>
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
      tableColumns: [],
      integralTime: [],
      searchParams: {
        employeeIds: [],
        employeeStatus: '',
        integralIds: [],
        integralEndTime: '',
        integralStartTime: '',
        orderBy: '',
        pageNum: 1,
        pageSize: 20
      },
      tableData: [
        {name: '黑仔达', lastIntegral: 10, 1: 4, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 1, reduceIntegral: 10, integral: 4},
        {name: '超桑', lastIntegral: 20, 1: 0, 2: 3, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, reduceIntegral: 0, integral: 23}
      ]
    }
  },
  methods: {
    exportExcel () {},
    getTableColumn () {
      var _this = this
      this.getRequest('/integral').then(res => {
        _this.tableColumns = res.data.data
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
    load () {},
    search () {}
  },
  mounted () {
    this.getTableColumn()
  }
}
</script>

<style>
</style>
