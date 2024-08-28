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
                    <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>使用身份注册</small>
                            </div>
                            <form role="form" @submit.prevent="registerUser">
                                <base-input class="mb-3"
                                            placeholder="用户名"
                                            addon-left-icon="ni ni-hat-3" v-model="name">
                                </base-input>
                                <base-input class="mb-3"
                                            placeholder="邮箱"
                                            addon-left-icon="ni ni-email-83" v-model="email">
                                </base-input>
                                <base-input type="password"
                                            placeholder="密码"
                                            addon-left-icon="ni ni-lock-circle-open" v-model="password">
                                </base-input>
                                <base-checkbox v-model="agreeToPrivacyPolicy">
                                    <span>我同意<a href="#">隐私政策</a></span>
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="registerUser">注册账号
                                    </base-button>
                                </div>
                            </form>
                        </template>
                    </card>
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
            name: "",
            email: "",
            password: "",
            agreeToPrivacyPolicy: false
        }
    },
    methods: {
        ...mapActions(["register"]),
        registerUser() {
            if (!this.agreeToPrivacyPolicy) {
                alert("你必须同意隐私政策");
            } else {
                this.register({
                    name: this.name,
                    email: this.email,
                    password: this.password
                });
            }
        }
    }
};
</script>
<style>
</style>
