<template>
  <div class="reslutWrap">
    <p>查询条件</p>
    <!-- 查询条件 -->
    <div class="queryCond">
      <div class="loc">
        日期：
        <el-date-picker
          type="month"
          placeholder="选择申报年月"
          v-model="applyMonth"
          @change="changeApplyMonth"
        />
        所在地：
        <el-cascader
          v-model="selectedOptions"
          size="large"
          :options="options"
          placeholder="请选择省/市/区(县)"
          @change="cityChange"
        />
      </div>
      <div class="loc">
        所在乡/镇：
        <el-input v-model="town" placeholder="请输入所在乡/镇" />
        所在村：
        <el-input v-model="village" placeholder="请输入所在村/社区" />
        所在组：
        <el-input v-model="vilNum" placeholder="请输入所在组" />
        易返贫致贫类别：
        <el-select v-model="repoorTypeValue" placeholder="请选择类别">
          <el-option
              v-for="item in repoorType"
              :key="item.id"
              :label="item.type"
              :value="item.type"
            />      
        </el-select>
        <el-button type="primary" @click="query">查询</el-button>
      </div>
    </div>
    <!-- 查询结果 -->
    <div class="queryResult">
      <div :style="{ margin: '20px 0', fontSize: '18px' }">结果列表：</div>
      <el-table :data="queryData">
        <el-table-column prop="order" label="序号" width="50" />
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="gender" label="性别" width="60" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="nation" label="民族" width="60" />
        <el-table-column prop="politics" label="政治面貌" width="80" />
        <el-table-column prop="education" label="文化程度" width="120" />
        <el-table-column prop="status" label="在校生状况" width="100" />
        <el-table-column prop="health" label="健康状况" width="80" />
      </el-table>
    </div>
    <!-- 导出文件 -->
    <div class="exportFile">
      <div class="top">
        <el-button type="primary">导出文件</el-button>
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
            pager-count="5"
            background
            :total="queryData.length"
          >
          </el-pagination>
        </div>
      </div>

      <div class="dealInfo">
        <div>
          <el-button type="primary">新增成员</el-button>
        </div>
        <div>
          <el-button :style="{backgroundColor:'skyblue', color: '#fff'}">修改信息</el-button>
        </div>
        <div>
          <el-button :style="{backgroundColor:'#ed322e', color: '#fff'}">删除成员</el-button>
        </div>
        <el-button type="primary">保存</el-button>
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
      applyMonth: "",
      repoorTypeValue: "无",
      repoorType: [{id: 0, type: "边缘易致贫户"}, {id: 1, type: "突发严重困难户"}],
      queryData: [
        {
          order: 1,
          loc: "重庆市南岸区重庆邮电大学",
          name: "张三冯",
          idCard: "500101199001020301",
          gender: "男",
          nation: "汉",
          politics: "共青团员",
          education: "本科",
          status: "在校",
          health: "健康",
        },
        {
          order: 2,
          loc: "重庆市南岸区重庆邮电大学",
          name: "张三冯",
          idCard: "500101199001020301",
          gender: "男",
          nation: "汉",
          politics: "共青团员",
          education: "本科",
          status: "在校",
          health: "健康",
        },
      ],
      dealPeople: "",
      dealTel: "",

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
    cityChange() {

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
      .el-input,
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

    .dealInfo {
      display: flex;   
      // justify-content: start;
      margin-top: 20px;
      .el-button {
        width: 130px;
        margin-right: 10vw;
      }
    }
  }
}
</style>
