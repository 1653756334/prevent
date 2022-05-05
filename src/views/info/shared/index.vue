<template>
  <div class="datashare">
    <div class="headtitle">查询条件</div>
    <div class="search">
      <div class="searchType">
        <ul>
          <li>
            <span class="demonstration">部门：</span>
            <el-select v-model="depvalue" placeholder="请选择部门">
              <el-option
                v-for="item in departments"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <span class="demonstration">所在地：</span>
            <el-cascader
              v-model="cityvalue"
              :options="citysss"
              placeholder="请选择所在省/市/县/乡"
            ></el-cascader>
          </li>
          <li>
            <span class="demonstration">是否达到返贫预警线：</span>
            <el-select v-model="select" placeholder="请选择是否">
              <el-option
                v-for="item in yesorno"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <el-button type="primary">查询</el-button>
          </li>
        </ul>
      </div>
      <div class="searchres">
        <div class="restitle">结果列表</div>
        <el-table :data="searchres" style="width: 100%">
          <el-table-column prop="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="100">
          </el-table-column>
          <el-table-column prop="idcard" label="身份证号" width="220">
          </el-table-column>
          <el-table-column prop="sheng" label="所在省" width="130">
          </el-table-column>
          <el-table-column prop="shi" label="所在市" width="130">
          </el-table-column>
          <el-table-column prop="xian" label="所在县" width="130">
          </el-table-column>
          <el-table-column prop="xiang" label="所在乡" width="130">
          </el-table-column>
          <el-table-column prop="hosnum" label="（医疗）自费额" width="130">
          </el-table-column>
          <el-table-column
            prop="yesorno"
            label="是否达到返贫预警线"
            width="230"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="export">
        <el-button type="primary">导出文件</el-button>
        <div class="page">
          <span>
            <span>共 {{searchres.length}} 条记录第 1 / 1 页</span>
            <el-pagination background layout="prev, pager, next" :total="10" :page-size="100">
            </el-pagination>
          </span>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";

export default {
  data() {
    return {
      citysss: regionData,
      cityvalue: [],
      depvalue: [],
      select: [],
      citys: [
        {
          value: "四川省",
          label: "四川省",
          children: [
            {
              value: "成都市",
              label: "成都市",
              children: [
                {
                  value: "双流区",
                  label: "双流区",
                  children: [
                    {
                      value: "某乡",
                      label: "某乡",
                    },
                  ],
                },
              ],
            },
            {},
          ],
        },
        {
          value: "重庆市",
          label: "重庆市",
          children: [
            {
              value: "重庆市",
              label: "重庆市",
              children: [
                {
                  value: "城口县",
                  label: "城口县",
                  children: [
                    {
                      value: "某乡",
                      label: "某乡",
                    },
                  ],
                },
                {
                  value: "南岸区",
                  label: "南岸区",
                  children: [
                    {
                      value: "某乡",
                      label: "某乡",
                    },
                    {
                      value: "某mou乡",
                      label: "某mou乡",
                    },
                  ],
                },
              ],
            },
            {},
          ],
        },
      ],
      departments: [
        {
          value: "教育部门",
          label: "教育部门",
        },
        {
          value: "医疗部门",
          label: "医疗部门",
        },
        {
          value: "住建部门",
          label: "住建部门",
        },
      ],
      yesorno: [
        {
          value: "是",
          label: "是",
        },
        {
          value: "否",
          label: "否",
        },
      ],
      searchres: [
        {
          index: 1,
          name: "张三",
          idcard: "124545454545454545",
          sheng: "重庆市",
          shi: "重庆市",
          xian: "城口县",
          xiang: "某乡",
          hosnum: 2000,
          yesorno: "否",
        },
        {
          index: 2,
          name: "张三",
          idcard: "1245254179945454545",
          sheng: "重庆市",
          shi: "重庆市",
          xian: "石柱县",
          xiang: "某乡",
          hosnum: 1800,
          yesorno: "是",
        },
        {
          index: 3,
          name: "李四",
          idcard: "1245254179945454545",
          sheng: "重庆市",
          shi: "重庆市",
          xian: "石柱县",
          xiang: "某乡",
          hosnum: 1000,
          yesorno: "是",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.datashare {
  padding: 20px 10px;
  .headtitle {
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    border-bottom: 2px solid #ddd;
  }
  .search {
    padding: 25px 0;
    height: 500px;
    .searchType {
      border-bottom: 2px solid #ddd;
      ul {
        display: flex;
        align-items: center;
        padding-left: 0;

        li {
          list-style: none;
          margin-right: 20px;
          margin-bottom: 20px;
        }
      }
    }
    .searchres {
      .restitle {
        height: 50px;
        line-height: 50px;
        margin-top: 20px;
        font-size: 18px;
      }
    }
    .export{
      display: flex;
      position: relative;
      margin-top: 20px;
      align-items: center;
      .page{
        position: absolute;
        display: inline-flex;
        left: 50%;
        transform: translateX(-50%);
        justify-content: flex-end;
        span{
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
