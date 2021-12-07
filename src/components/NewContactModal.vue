<template>
    <div class="w-screen h-screen animated fadeIn faster  xs:px-6 md:px-0 fixed  left-0 top-0 flex inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
        <div class="absolute bg-black opacity-30 inset-0 z-0" @click="hideMod"></div>
        <!--content-->
        <div class="relative max-h-4/6 mx-auto my-auto lg:w-3/12 xs:w-8/12 bg-white shadow-xl">
            <!--body-->
            <div>
                <div class="flex flex-row justify-between py-3 px-4">
                    <p class= "text-blue-600 uppercase font-semibold">Add Contact</p>
                    <button @click="hideMod"><i class="fas fa-times"></i></button>
                </div>
                <form class="p-10 rounded-md w-full" @submit.prevent="handleSubmit">
                    <p v-if="addContactResponse" class="text-red-600 break-words py-3 text-sm">{{addContactResponse.message}}</p>
                    <p v-else class="text-gray-500 break-words py-3 text-sm">input username to search for and add your contact</p>
                    <div class="mb-3">
                        <label for="username" class="text-sm  text-blue-600">Username</label>
                        <input type="text" id="username" v-model="form.username" class="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md" placeholder="dopeLikeCrack"/>
                    </div>

                    <div class="flex flex-row justify-between">
                        <button class="uppercase font-semibold text-blue-600 text-sm p-2 hover:bg-gray-300 mt-3 rounded" type="submit">add contact</button>
                        <button class="uppercase font-semibold text-blue-600 text-sm p-2 hover:bg-gray-300 mt-3 rounded" @click="$emit('show-contacts-modal')">view contacts</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            form: {
                username: '',
            }
        }
    },

    computed: {
        addContactResponse() {
            return this.$store.getters.addContactResponse
        }
    },

    methods: {
        ...mapActions(['addContact']),
        hideMod(){
            this.$emit('hide-addcontacts-modal');
        },
        handleSubmit(){
            this.addContact(this.form);
            // console.log('responsible response');
            // this.hideMod();
        }
    },
}
</script>