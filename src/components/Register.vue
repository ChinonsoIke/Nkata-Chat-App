<template>
    <div class="bg-blue-600 p-5 pt-20 w-full grid justify-items-center h-auto">
        <div class="grid justify-items-center">
            <p class="text-white text-3xl font-bold mb-1">So, this is your first time?</p>
            <p class="text-white text-lg mb-5">Don't be shy. Sign up on Nkata to chat with friends</p>
        </div>
        <form class="bg-white p-10 rounded-md h-full lg:w-5/12 md:w-7/12 xs:w-9/12" @submit.prevent="handleSubmit">
            <div class="grid grid-cols-2 justify-items-center mb-6 gap-2">
                <div class="col-span-1">
                    <label for="firstname" class="text-sm text-blue-600">First Name</label>
                    <input type="text" v-model="form.firstname" class="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md" id="firstname" placeholder="John"/>
                </div>
                <div class="col-span-1">
                    <label for="lastname" class="text-sm text-blue-600">Last Name</label>
                    <input type="text" id="lastname" v-model="form.lastname" class="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md" placeholder="Doe" />
                </div>
            </div>

            <div class="mb-6">
                <label for="email" class="text-sm  text-blue-600">Email</label>
                <input type="text" id="email" v-model="form.email" class="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md" placeholder="ekwueme@hotmail.com"/>
            </div>

            <div class="grid grid-cols-2 justify-items-center mb-6 gap-2">
                <div class="col-span-1">
                    <label for="username" class="text-sm  text-blue-600">Username</label>
                    <input type="text" id="username" v-model="form.username" class="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md" placeholder="sabinus101"/>
                </div>
                <div class="col-span-1">
                    <label for="phone" class="text-sm  text-blue-600">Phone Number</label>
                    <input type="text" id="phone" v-model="form.phone" class="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md" placeholder="08010010010"/>
                </div>
            </div>

            <div class="mb-6">
                <label for="password" class="text-sm  text-blue-600">Password</label>
                <input type="password" id="password" v-model="form.password" class="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md" placeholder="********"/>
            </div>

            <button class="bg-blue-600 mb-3 text-white md:text-base xs:text-xs rounded-md text-md p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600" type="submit">Register</button>
            <p v-if="showErrors">{{errors}}</p>

            <p>Already have an account? <router-link to="/login" class="text-blue-600 font-semibold">Login</router-link></p>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            form: {
                firstname: '',
                lastname: '',
                email: '',
                username: '',
                phone: '',
                password: '',
            },
            showErrors: false,
            errors: '',
        }
    },

    methods: {
        ...mapActions(["Register"]),
        async handleSubmit() {
        try {
            await this.Register(this.form);
            this.showError = false
            this.$router.push("/");
        } catch (error) {
            this.showError = true
            // this.errors = error.response.data.message
            console.log(error)
        }
        },
    },

    mounted() {
        console.log('Register mounted')
    }
}
</script>