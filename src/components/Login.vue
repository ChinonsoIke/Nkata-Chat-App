<template>
    <div class="bg-blue-600 p-5 pt-20 w-full h-screen">
        <div class="grid justify-items-center mb-10">
            <p class="text-white text-3xl font-bold mb-1">Welcome back, champ!</p>
            <p class="text-white xs:text-sm md:text-lg">Sign back in to continue chatting with friends</p>
        </div>
        <div class=" grid justify-items-center">
            <form class="bg-white p-10 rounded-md h-auto lg:w-5/12 md:w-7/12 xs:w-10/12" @submit.prevent="handleSubmit">
                <div class="mb-6">
                    <label for="email" class="text-sm  text-blue-600">Email</label>
                    <input type="text" id="email" v-model="form.email" class="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md" placeholder="ekwueme@hotmail.com"/>
                </div>

                <div class="mb-6">
                    <label for="password" class ="text-sm  text-blue-600">Password</label>
                    <input type="password" id="password" v-model="form.password" class="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md" placeholder="********"/>
                </div>

                <button class="bg-blue-600 mb-3 text-white md:text-base xs:text-xs rounded-md text-md p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600" type="submit">Login</button>

                <p>New to Nkata? <router-link to="/register" class="text-blue-600 font-semibold">Register</router-link></p>
            </form>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            showError: false,
            errors: '',
        }
    },

    methods: {
        ...mapActions(["LogIn"]),
        async handleSubmit() {
        const User = new FormData();
        User.append("email", this.form.email);
        User.append("password", this.form.password);
            try {
                await this.LogIn(User);
                this.$router.push("/");
                this.showError = false
            } catch (error) {
                this.showError = true
                console.log(error)
                // this.errors = error.response.data.errors
            }
        },
    },

    mounted() {
        console.log('Login mounted')
    }
}
</script>