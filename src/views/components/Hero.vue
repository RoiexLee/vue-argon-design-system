<template>
    <section class="section-hero section-shaped my-0">
        <div class="shape shape-style-1 shape-primary">
            <span class="span-150"></span>
            <span class="span-50"></span>
            <span class="span-50"></span>
            <span class="span-75"></span>
            <span class="span-100"></span>
            <span class="span-75"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
        </div>
        <div class="container shape-container d-flex align-items-center">
            <div class="col px-0">
                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-7 text-center pt-lg">
                        <h1 class="text-white">自动人格评测系统</h1>
                        <p class="text-white mt-5 mb-5">A beautiful Design System for Bootstrap 4. It's Free and Open
                            Source.</p>
                        <div class="btn-wrapper" v-if="isAuthenticated">
                            <router-link to="/profile">
                                <base-button tag="a"
                                             class="text-white mr-3 ml-3"
                                             type="primary"
                                             icon="fa fa-user-circle">
                                    个人中心
                                </base-button>
                            </router-link>
                            <router-link to="/collection">
                                <base-button tag="a"
                                             class="ml-3 mr-3"
                                             type="secondary"
                                             icon="fa fa-database">
                                    采集数据
                                </base-button>
                            </router-link>
                        </div>
                        <div class="btn-wrapper" v-else>
                            <router-link to="/register">
                                <base-button tag="a"
                                             class="text-white mr-3 ml-3"
                                             type="primary"
                                             icon="fa fa-user-plus">
                                    注册
                                </base-button>
                            </router-link>
                            <router-link to="/login">
                                <base-button tag="a"
                                             class="ml-3 mr-3"
                                             type="secondary"
                                             icon="fa fa-user">
                                    登录
                                </base-button>
                            </router-link>
                        </div>
                    </div>
                </div>
                <!--                <div class="row align-items-center justify-content-around stars-and-coded">-->
                <!--                    <div class="col-sm-4">-->
                <!--                        <span class="text-white alpha-7 ml-3">Star us on</span>-->
                <!--                        <a href="https://github.com/creativetimofficial/argon-design-system" target="_blank"-->
                <!--                           title="Support us on Github">-->
                <!--                            <img src="img/brand/github-white-slim.png" style="height: 22px; margin-top: -3px">-->
                <!--                        </a>-->
                <!--                    </div>-->
                <!--                    <div class="col-sm-4 mt-4 mt-sm-0 text-right">-->
                <!--                        <span class="text-white alpha-7">Coded by</span>-->
                <!--                        <a href="https://www.creative-tim.com" target="_blank"-->
                <!--                           title="Creative Tim - Premium Bootstrap Themes and Templates">-->
                <!--                            <img src="img/brand/creativetim-white-slim.png" class="ml-3" style="height: 30px;">-->
                <!--                        </a>-->
                <!--                    </div>-->
                <!--                </div>-->
            </div>
        </div>
    </section>
</template>
<script>
import {mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters(["isAuthenticated"])
    }
};
</script>
<style>
</style>
