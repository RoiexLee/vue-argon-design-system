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
                            <form role="form" @submit.prevent="loginUser()">
                                <base-input class="mb-3"
                                            placeholder="用户名"
                                            addon-left-icon="ni ni-hat-3" v-model="username">
                                </base-input>
                                <base-input type="password"
                                            placeholder="密码"
                                            addon-left-icon="ni ni-lock-circle-open" v-model="password">
                                </base-input>
                                <base-checkbox v-model="remember">记住我</base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="loginUser()">登录</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
        <modal :show.sync="showModal">
            <h6 slot="header" class="modal-title" id="modal-title-default">提示</h6>
            <p>{{ message }}</p>
            <base-button type="info" @click="showModal=false">关闭</base-button>
        </modal>
    </section>
</template>
<script>
import Modal from "@/components/Modal.vue";
import axios from "axios";

export default {
    components: {Modal},
    methods: {
        async loginUser() {
            if (!this.username || !this.password) {
                this.showModal = true;
                this.message = "请填写所有信息";
            } else {
                try {
                    await axios.post(
                        "/user/login",
                        {
                            username: this.username,
                            password: this.password,
                            remember: this.remember
                        },
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                    ).then(
                        response => {
                            if (response.status === 200) {
                                this.$store.commit("SET_ACCESS_TOKEN", response.data["access_token"]);
                                this.showModal = true;
                                this.message = "登陆成功，三秒后跳转";
                                setTimeout(() => {
                                    this.$router.push("/");
                                }, 3000);
                            } else {
                                this.showModal = true;
                                this.message = "登陆失败";
                            }
                        }
                    )
                } catch (e) {
                    this.showModal = true;
                    this.message = e.response.data["detail"];
                }
            }
        }
    },
    data() {
        return {
            username: "",
            password: "",
            remember: false,
            showModal: false,
            message: ""
        }
    }
};
</script>
<style>
</style>
