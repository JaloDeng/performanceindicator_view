<template>
  <div>
    <el-container>
      <h2>积分记录表</h2>
      <el-header>
        <div>
          参与者：<el-input clearable style="width: 200px;" size="mini" @keyup.enter.native="search" v-model="integrals"></el-input>
          项目：<el-input clearable style="width: 200px;" size="mini" @keyup.enter.native="search" v-model="employees"></el-input>
          获取时间：
          <el-date-picker v-model="integralTime" type="datetimerange" range-separator="-" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" size="mini"
            :start-placeholder="searchParams.integralStartTime" :end-placeholder="searchParams.integralEndTime" @change="integralSearchTimeChange">
          </el-date-picker>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="success" size="mini" icon="el-icon-plus" @click="showAddView()">添加</el-button>
        </div>
      </el-header>
      <el-main>
        <div>
          <el-table :data="employeeIntegrals" v-loading="tableLoading" size="mini" border @sort-change="tableSortChange" :default-sort="{prop: 'integralTime', order: 'descending'}">
            <el-table-column align="center" width="50" label="序号" type="index"></el-table-column>
            <el-table-column align="center" width="200px" prop="integralTime" label="获取时间" sortable="custom"></el-table-column>
            <el-table-column align="center" width="200px" prop="name" label="姓名" sortable="custom"></el-table-column>
            <el-table-column align="center" width="200px" prop="label" label="项目" sortable="custom"></el-table-column>
            <el-table-column align="center" width="200px" prop="integralValue" label="积分" sortable="custom"></el-table-column>
            <el-table-column align="center" width="800px" prop="remark" label="备注"></el-table-column>
            <el-table-column align="center" width="200" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="showEditView(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <div style="justify-content:space-between;">
            <el-pagination background :page-sizes="sizes" :page-size="searchParams.pageSize" @size-change="sizeChange" :current-page="searchParams.pageNum"
              @current-change="currentChange" layout="sizes, prev, pager, next, jumper, ->, total" :total="total" style="text-align:center"></el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <employeeIntegralForm :dialogTitle="dialogTitle" :dialogVisible="dialogVisible" :employeeIntegral="employeeIntegral" v-on:colseForm="colseForm"></employeeIntegralForm>
  </div>
</template>

<script>
import employeeIntegralForm from '@/components/form/EmployeeIntegralForm'

export default {
  components: {
    employeeIntegralForm
  },
  data () {
    return {
      dialogTitle: '',
      dialogVisible: false,
      employees: '',
      employeeIntegral: {
        id: '',
        employeeId: '',
        integralId: '',
        integralTime: '',
        integralValue: '',
        remark: '',
        createUser: '',
        createTime: '',
        updateUser: '',
        updateTime: '',
        name: '',
        label: ''
      },
      employeeIntegrals: [],
      integrals: '',
      integralTime: [],
      searchParams: {
        employeeIds: [],
        integralIds: [],
        integralEndTime: '',
        integralStartTime: '',
        orderBy: '',
        pageNum: 1,
        pageSize: 20
      },
      sizes: [20, 50, 100],
      tableLoading: false,
      total: 1
    }
  },
  methods: {
    colseForm () {
      this.dialogVisible = false
      this.emptyData()
      this.load()
    },
    currentChange (currentChange) {
      this.searchParams.pageNum = currentChange
      this.load()
    },
    del (row) {
      this.$confirm('此操作将永久删除[' + row.name + ' : ' + row.label + ' : ' + row.integralTime + ']，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/employee/integral/' + row.id).then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {
            this.load()
          }
        })
      }).catch(() => {
      })
    },
    emptyData () {
      this.employeeIntegral = {
        id: '',
        employeeId: '',
        integralId: '',
        integralTime: '',
        integralValue: '',
        remark: '',
        createUser: '',
        createTime: '',
        updateUser: '',
        updateTime: '',
        name: '',
        label: ''
      }
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
    load () {
      var _this = this
      this.tableLoading = true
      this.getRequest('/employee/integral', _this.searchParams).then(resp => {
        this.tableLoading = false
        _this.total = resp.data.total
        _this.employeeIntegrals = resp.data.data
      })
    },
    search () {
      this.searchParams.pageNum = 1
      this.load()
    },
    sizeChange (sizeChange) {
      this.searchParams.pageSize = sizeChange
      this.load()
    },
    showAddView () {
      this.dialogTitle = '添加'
      this.dialogVisible = true
    },
    showEditView (row) {
      var _this = this
      this.tableLoading = true
      this.getRequest('/employee/integral/' + row.id).then(resp => {
        _this.employeeIntegral = resp.data.data
      })
      _this.tableLoading = false
      _this.dialogTitle = '编辑'
      _this.dialogVisible = true
    },
    tableSortChange (column) {
      if (column.order === 'descending') {
        this.searchParams.orderBy = column.prop + ' DESC'
      } else {
        this.searchParams.orderBy = column.prop + ' ASC'
      }
      this.load()
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style>
</style>
