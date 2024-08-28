<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>使用身份登录</small>
                            </div>
                            <form role="form" @submit.prevent="loginUser">
                                <base-input class="mb-3"
                                            placeholder="邮箱"
                                            addon-left-icon="ni ni-email-83" v-model="email">
                                </base-input>
                                <base-input type="password"
                                            placeholder="密码"
                                            addon-left-icon="ni ni-lock-circle-open" v-model="password">
                                </base-input>
                                <base-checkbox v-model="remember">记住我</base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="loginUser">登录</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>忘记密码</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <a href="#" class="text-light">
                                <small>注册账号</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import {mapActions} from "vuex";

export default {
    data() {
        return {
            email: "",
            password: "",
            remember: false
        }
    },
    methods: {
        ...mapActions(["login"]),
        loginUser() {
            if (!this.email || !this.password) {
                alert("请输入邮箱和密码");
            } else {
                this.login({
                    email: this.email,
                    password: this.password,
                    remember: this.remember
                });
            }
        }
    }
};
</script>
<style>
</style>
