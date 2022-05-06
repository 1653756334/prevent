<template>
  <div class="reslutWrap">
    <p>查询条件</p>
    <!-- 查询条件 -->
    <div class="queryCond">
      <div class="info">
        姓名：
        <el-input v-model="name" placeholder="请输入姓名" :style="{ width: '150px'}"/>
        身份证号：
        <el-input
          v-model="idCard"
          placeholder="请输入身份证号"
          :style="{ width: '180px' }"
        />
        核实结果：
        <el-select v-model="checkResValue" placeholder="核实情况">
          <el-option
            v-for="item in checkresList"
            :key="item.id"
            :label="item.type"
            :value="item.type"
          />
        </el-select>
        预警等级：
        <el-select v-model="levelValue" placeholder="请选择户类型" :style="{ width: '150px' }">
          <el-option
            v-for="item in levelType"
            :key="item.id"
            :label="item.type"
            :value="item.type"
          />
        </el-select>
      </div>
      <div class="loc">
        所在地：
        <el-cascader
          v-model="selectedOptions"
          size="large"
          :options="options"
          placeholder="请选择省/市/区(县)"
          @change="cityChange"
        />
        所在乡/镇：
        <el-input v-model="town" placeholder="请输入所在乡/镇" />
        所在村：
        <el-input v-model="village" placeholder="请输入所在村/社区" />
        所在组：
        <el-input v-model="vilNum" placeholder="请输入所在组" />
      </div>
      <div class="queryItem">
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <!-- 查询结果 -->
    <div class="queryResult">
      <div :style="{margin: '20px 0', fontSize: '18px'}">结果列表：</div>
      <el-table :data="queryData">
        <el-table-column prop="order" label="序号" width="60" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="sheng" label="所在省" width="100" />
        <el-table-column prop="shi" label="所在市" width="100" />
        <el-table-column prop="xian" label="所在县" width="100" />
        <el-table-column prop="cun" label="所在乡" width="100" />
        <el-table-column prop="personNum" label="家庭人口数" width="100" />
        <el-table-column prop="checkPerson" label="核实人员" width="100" />
        <el-table-column prop="checkRes" label="核实结果" width="100" />
        <el-table-column prop="level" label="预警等级" width="120" />
        <el-table-column prop="checkFeedback" label="核实反馈" width="100" />
      </el-table>
    </div>
    <!-- 导出文件 -->
    <div class="exportFile">
      <div class="top">
        <el-button type="primary">导出数据</el-button>
        <div class="pagination">
          <span
            >共 {{ queryData.length }} 条记录 第 {{ currentPage }} /
            {{ Math.ceil(queryData.length / pagesize) }} 页</span
          >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10]"
            :page-size="pagesize"
            layout="prev, pager, next"
            :pager-count="5"
            background
            :total="queryData.length"
          >
          </el-pagination>
        </div>
        <el-button type="primary" @click="isDao" class="daoru">导入</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";

export default {
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      town: "",
      village: "",
      vilNum: "",
      levelType: [
        { id: 0, type: "一级" },
        { id: 1, type: "二级" },
        { id: 2, type: "三级" },
        { id: 3, type: "四级" },
      ],
      levelValue: "无",
      
      isCheck: [
        { id: 0, type: "是" },
        { id: 1, type: "否" },
      ],
      isCheckValue: "",
      checkResValue: "",
      checkresList: [
        {
          id: 0, type: "是"
        },
        {
          id: 1, type: "否"
        }
      ],
      name: "",
      idCard: "",
      queryData: [
        {
          order: 1,
          sheng: "重庆市",
          shi: "重庆市",
          xian: "城口县",
          cun:"某村",
          name: "张三冯",
          idCard: "4545165465456456456",
          level: "二级",
          isCheck: "是",
          personNum: 4,
          checkPerson: "王五",
          checkRes: "良好",
          checkFeedback: "优良",
        },
        {
          order: 1,
          sheng: "重庆市",
          shi: "重庆市",
          xian: "城口县",
          cun:"某村",
          name: "张三冯",
          idCard: "4545165465456456456",
          level: "二级",
          isCheck: "是",
          personNum: 6,
          checkPerson: "王五",
          checkRes: "良好",
          checkFeedback: "优良",
        },
      ],
      // 分页器具数据源
      currentPage: 1,
      pagesize: 5,
    };
  },

  methods: {
    cityChange() {
      var loc = "";
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]];
      }
      console.log(loc);
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    isDao(){
      this.$confirm('是否导入帮扶系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '导入成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导入'
          });          
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.reslutWrap {
  padding: 10px;
  p {
    font-size: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  .queryCond {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    .info{
      display: inline-flex;
      align-items: center;
      .el-input, .el-select{
        margin-right: 20px;
        margin-bottom: 5px;
      }
    }
    .loc {
      display: flex;
      // flex-wrap: wrap;
      // justify-content: start;
      align-items: center;
      padding: 10px 0;
      .el-cascader {
        width: 230px;
        margin-right: 20px;
      }
      .el-input {
        width: 150px;
        margin-right: 20px;
      }
    }
    .queryItem {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .el-input {
        width: 150px;
        margin-right: 20px;
      }
      .el-select {
        width: 150px;
        margin-right: 20px;
      }
    }
  }
  .queryResult {
    width: 100%;
    .el-scrollbar__wrap {
      overflow-x: auto;
      height: calc(100% + 20px); //多出来的20px是横向滚动条默认的样式
    }
    .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
      white-space: nowrap;
      display: inline-block;
    }
  }
  .exportFile {
    margin-top: 10px;
    .top {
      position: relative;
      .el-button {
        display: inline-block;
      }
      .daoru{
        float: right;
        margin-right: 10%;
      }
      padding: 10px 0;
      .pagination {
        position: absolute;
        display: inline-flex;
        left: 50%;
        transform: translateX(-50%);
        justify-content: flex-end;
        margin-top: 10px;
        span {
          display: inline-flex;
          height: 32px;
          align-items: center;
        }
      }
    }

  }
}
</style>
