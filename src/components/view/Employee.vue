<template>
  <div>
    <el-container>
      <el-main style="padding: 0px;">
        <template>
          状态:
          <el-select v-model="searchParams.status" @change="search" size="mini" style="width: 100px;">
            <el-option v-for="item in activeStatuses" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          姓名：<el-input clearable style="width: 200px;" size="mini" @keyup.enter.native="search" v-model="searchParams.name"></el-input>
          联系方式：<el-input clearable style="width: 200px;" size="mini" @keyup.enter.native="search" v-model="searchParams.phone"></el-input>
          电子邮箱：<el-input clearable style="width: 200px;" size="mini" @keyup.enter.native="search" v-model="searchParams.email"></el-input>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="success" size="mini" icon="el-icon-plus" @click="showAddView()">添加</el-button>
        </template>
        <br style="line-height: 40px;">
        <template>
          <el-table :data="employees" v-loading="tableLoading" size="mini" border @sort-change="tableSortChange" :default-sort="{prop: 'name', order: 'descending'}" height="600">
            <el-table-column align="center" width="50" label="序号" type="index"></el-table-column>
            <el-table-column align="center" width="100px" prop="status" label="状态" :formatter="formatStatus"></el-table-column>
            <el-table-column align="center" width="200px" prop="name" label="姓名" sortable="custom"></el-table-column>
            <el-table-column align="center" width="200px" prop="phone" label="联系方式" sortable="custom"></el-table-column>
            <el-table-column align="center" width="200px" prop="email" label="电子邮箱"></el-table-column>
            <el-table-column align="center" width="500px" prop="address" label="联系地址"></el-table-column>
            <el-table-column align="center" width="100px" prop="initialIntegralValue" label="积分初始值"></el-table-column>
            <el-table-column align="center" width="800px" prop="remark" label="备注"></el-table-column>
            <el-table-column align="center" width="200" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="showEditView(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <div style="justify-content:space-between;">
            <el-pagination background :page-sizes="sizes" :page-size="searchParams.pageSize" @size-change="sizeChange" :current-page="searchParams.pageNum"
              @current-change="currentChange" layout="sizes, prev, pager, next, jumper, ->, total" :total="total" style="text-align:center"></el-pagination>
          </div>
        </template>
      </el-main>
    </el-container>
    <employeeForm :dialogTitle="dialogTitle" :dialogVisible="dialogVisible" :employee="employee" v-on:colseForm="colseForm"></employeeForm>
  </div>
</template>

<script>
import employeeForm from '@/components/form/EmployeeForm'

export default {
  components: {
    employeeForm
  },
  data () {
    return {
      activeStatuses: [],
      dialogTitle: '',
      dialogVisible: false,
      employee: {
        id: '',
        status: 'ENABLED',
        name: '',
        phone: '',
        email: '',
        address: '',
        initialIntegralValue: 0,
        remark: '',
        createUser: '',
        createTime: '',
        updateUser: '',
        updateTime: ''
      },
      employees: [],
      searchParams: {
        address: '',
        email: '',
        name: '',
        orderBy: '',
        pageNum: 1,
        pageSize: 20,
        phone: '',
        status: 'ENABLED'
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
      this.$confirm('此操作将永久删除[' + row.name + ']，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/employee/' + row.id).then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {
            this.load()
          }
        })
      }).catch(() => {
      })
    },
    getActiveStatus () {
      var _this = this
      this.getRequest('/enum/active').then(resp => {
        if (resp.data && resp.data.data) {
          _this.activeStatuses = resp.data.data
        }
      })
    },
    emptyData () {
      this.employee = {
        id: '',
        status: 'ENABLED',
        name: '',
        phone: '',
        email: '',
        address: '',
        initialIntegralValue: 0,
        remark: '',
        createUser: '',
        createTime: '',
        updateUser: '',
        updateTime: ''
      }
    },
    formatStatus (row, column, cellValue, index) {
      if (row.status === 'DISABLED') {
        return '禁用'
      }
      return '正常'
    },
    load () {
      var _this = this
      this.getRequest('/employee', _this.searchParams).then(resp => {
        this.tableLoading = false
        _this.total = resp.data.total
        _this.employees = resp.data.data
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
      this.getRequest('/employee/' + row.id).then(resp => {
        _this.employee = resp.data.data
      })
      _this.tableLoading = false
      _this.dialogTitle = '编辑'
      _this.dialogVisible = true
    },
    tableSortChange (column) {
      var _this = this
      if (column.order === 'descending') {
        _this.searchParams.orderBy = column.prop + ' DESC'
      } else {
        _this.searchParams.orderBy = column.prop + ' ASC'
      }
      this.load()
    }
  },
  mounted () {
    this.getActiveStatus()
  }
}
</script>

<style>
</style>
