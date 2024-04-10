<script>
import * as echarts from "echarts";
import moment from 'moment';
import {analyLineList, analyBarList} from "@/api/analy.js";

export default {
    data() {
        return {
            today_new_user: 0,
            today_new_transaction: 0,
            all_user: 0,
            chart1_range: 'all',
            chart1_time: {
                start: '2000-01-01 00:00:00',
                end: '2099-12-31 23:59:59'
            },
            chart2_range: 'all',
            chart2_time: {
                start: '2000-01-01 00:00:00',
                end: '2099-12-31 23:59:59'
            }
        };
    },
    mounted() {
        this.getUserLine()
        this.getTransactionBar()
    },
    watch: {
        chart1_range(val) {
            switch (val) {
                case 'yesterday':
                    this.chart1_time = {
                        start: moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'),
                        end: moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59')
                    }
                    break
                case 'week':
                    this.chart1_time = {
                        start: moment().subtract(6, 'days').format('YYYY-MM-DD 00:00:00'),
                        end: moment().format('YYYY-MM-DD 23:59:59')
                    }
                    break
                case 'month':
                    this.chart1_time = {
                        start: moment().subtract(1, 'months').format('YYYY-MM-DD 00:00:00'),
                        end: moment().format('YYYY-MM-DD 23:59:59')
                    }
                    break
                default:
                    this.chart1_time = {
                        start: '2000-01-01 00:00:00',
                        end: '2099-12-31 23:59:59'
                    }
            }
            this.getUserLine()
        },
        chart2_range(val) {
            switch (val) {
                case 'yesterday':
                    this.chart2_time = {
                        start: moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'),
                        end: moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59')
                    }
                    break
                case 'week':
                    this.chart2_time = {
                        start: moment().subtract(6, 'days').format('YYYY-MM-DD 00:00:00'),
                        end: moment().format('YYYY-MM-DD 23:59:59')
                    }
                    break
                case 'month':
                    this.chart2_time = {
                        start: moment().subtract(1, 'months').format('YYYY-MM-DD 00:00:00'),
                        end: moment().format('YYYY-MM-DD 23:59:59')
                    }
                    break
                default:
                    this.chart2_time = {
                        start: '2000-01-01 00:00:00',
                        end: '2099-12-31 23:59:59'
                    }
            }
            this.getTransactionBar()
        }
    },
    methods: {
        getUserLine() {
            let ecObj = document.getElementById("chart1");
            ecObj.removeAttribute('_echarts_instance_');

            let myChart = echarts.init(ecObj);

            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [
                    {
                        name: 'new user',
                        type: 'line',
                        data: []
                    }
                ]
            };
            myChart.setOption(option);

            analyLineList(this.chart1_time).then((res) => {
                if (res.code === 200) {
                    this.today_new_user = res.data.today_new_user;
                    this.today_new_transaction = res.data.today_new_transaction;
                    this.all_user = res.data.all_user;
                    option.xAxis.data = res.data.list.map(item => item.k);
                    option.series[0].data = res.data.list.map(item => item.v);
                }
                myChart.setOption(option);
            })
        },

        getTransactionBar() {
            let ecObj = document.getElementById("chart2");
            console.log(ecObj)
            ecObj.removeAttribute('_echarts_instance_');

            let myChart = echarts.init(ecObj);

            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'transition',
                        data: [],
                        type: 'bar'
                    }
                ]
            };
            myChart.setOption(option);

            analyBarList(this.chart2_time).then((res) => {
                if (res.code === 200) {
                    option.xAxis.data = res.data.list.map(item => item.k);
                    option.series[0].data = res.data.list.map(item => item.v);
                }
                myChart.setOption(option);
            })
        }
    }
};
</script>

<template>
    <div class="echart-container">
        <div class="echart-item">
            <div class="title">
                <div class="left">
                    New user statistics
                </div>
                <div class="right">
                    <el-tag class="fix-hover" :type="chart1_range === 'all' ? 'primary' : 'info'"
                            @click="chart1_range = 'all'">All
                    </el-tag>
                    <el-tag class="fix-hover" :type="chart1_range === 'yesterday' ? 'primary' : 'info'"
                            @click="chart1_range = 'yesterday'">Yesterday
                    </el-tag>
                    <el-tag class="fix-hover" :type="chart1_range === 'week' ? 'primary' : 'info'"
                            @click="chart1_range = 'week'">Week
                    </el-tag>
                    <el-tag class="fix-hover" :type="chart1_range === 'month' ? 'primary' : 'info'"
                            @click="chart1_range = 'month'">Month
                    </el-tag>
                </div>
            </div>
            <hr class="hr">
            <div class="descr">
                <div class="descr-item">
                    <div class="descr-title">
                        Today New User
                    </div>
                    <div class="descr-value">
                        {{ today_new_user }}
                    </div>
                </div>
                <div class="descr-item">
                    <div class="descr-title">
                        Today Transition
                    </div>
                    <div class="descr-value">
                        {{ today_new_transaction }}
                    </div>
                </div>
                <div class="descr-item">
                    <div class="descr-title">
                        All User
                    </div>
                    <div class="descr-value">
                        {{ all_user }}
                    </div>
                </div>
            </div>
            <div class="echart-canvas" id="chart1">

            </div>
        </div>
        <div class="echart-item">
            <div class="title">
                <div class="left">
                    Transaction transfer statistics
                </div>
                <div class="right">
                    <el-tag class="fix-hover" :type="chart2_range === 'all' ? 'primary' : 'info'"
                            @click="chart2_range = 'all'">All
                    </el-tag>
                    <el-tag class="fix-hover" :type="chart2_range === 'yesterday' ? 'primary' : 'info'"
                            @click="chart2_range = 'yesterday'">
                        Yesterday
                    </el-tag>
                    <el-tag class="fix-hover" :type="chart2_range === 'week' ? 'primary' : 'info'"
                            @click="chart2_range = 'week'">Week
                    </el-tag>
                    <el-tag class="fix-hover" :type="chart2_range === 'month' ? 'primary' : 'info'"
                            @click="chart2_range = 'month'">Month
                    </el-tag>
                </div>
            </div>
            <hr class="hr">

            <div class="echart-canvas" id="chart2">

            </div>
        </div>
    </div>
</template>

<style scoped>
.el-main {
    padding: unset !important;
}

.echart-container {
    width: 98%;
    height: auto;
    margin: 10px auto;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    flex-direction: row;
    flex-wrap: wrap;
}

.echart-item {
    width: 48%;
    height: 400px;
    background-color: #ffffff;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 96%;
    margin: 20px auto auto;
    font-size: 18px;
    font-weight: 600;
}

.fix-hover {
    cursor: pointer;
}

.title > .left {
    text-align: left;
    text-indent: 10px;
    font-size: 18px;
    height: 30px;
    font-weight: 600;
    display: flex;
    justify-content: flex-start;
}

.title > .right {
    width: 250px;
    display: flex;
    justify-content: space-evenly;
    font-size: 18px;
    height: 30px;
    font-weight: 600;
}

.hr {
    border: 1px solid #f1efef;
    margin: 10px;
}

.echart-canvas {
    width: 100%;
    height: 300px;
}

#chart2 {
    height: 360px;
}

#chart3 {
    height: 360px;
}

.descr {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.descr-item {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 70px;
}

.descr-title {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 4px;
}

.descr-value {
    font-size: 30px;
}

</style>