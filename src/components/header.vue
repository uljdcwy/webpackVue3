<template>
    <div class="header">
        <div class="nav-list">
            <div class="nav-item active">
                数据大屏
            </div>
            <div class="nav-item">
                车道管理
            </div>
            <div class="nav-item">
                车辆管理
            </div>
            <div class="nav-item">
                区域管理
            </div>
        </div>
        <div class="title">
            四川宏创数据可视化平台
        </div>
        <div class="time-show">
            显示时间
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped="scoped">
    .header{
        box-sizing: border-box;
        padding: 0 5%;
        height: 60px;
        background-image: url(./../../public/header.png);
        background-size: auto 100%;
        background-position: center center;
        background-repeat: no-repeat;
        font-weight: bold;
        color: #fff;
        display: flex;
        position: relative;
        .title{
            position: absolute;
            left: 50%;
            top: 50%;
            line-height: 60px;
            text-align: center;
            font-size: 24px;
            transform: translate(-50%,-50%);
        }
        justify-content: space-between;
        .nav-list{
            display: flex;
            padding-top: 30px;
            width: 38%;
            justify-content: space-around;
            color: #afafaf;
            .nav-item:hover,
            .active{
                color: #fff;
                cursor: pointer
            }
        }
    }
</style>
  