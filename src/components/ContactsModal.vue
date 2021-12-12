<template>
    <div class="w-screen h-screen animated fadeIn faster  xs:px-6 md:px-0 fixed  left-0 top-0 flex inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
        <div class="absolute bg-black opacity-30 inset-0 z-0" @click="hideMod"></div>
        <!--content-->
        <div class="relative max-h-4/6 mx-auto my-auto lg:w-3/12 xs:w-10/12 sm:w-8/12 bg-white shadow-xl">
            <!--body-->
            <div>
                <div class="flex flex-row justify-between py-3 px-4 mb-10">
                    <p class= "text-blue-600 uppercase font-semibold">Contacts</p>
                    <button @click="hideMod"><i class="fas fa-times"></i></button>
                </div>
                <div v-if="contacts" class="max-h-60 overflow-y-scroll">
                    <div class="cursor-pointer hover:bg-gray-100 px-2 w-full" v-for="contact in contacts" :key="contact.user_contact.id" @click="$emit('resp-open-chat'); $emit('open-chat', contact.user_contact.id, contact.user_contact.username)">
                        <div class="grid grid-cols-12 flex items-center p-2 border-b border-blue-100">
                            <div class="col-span-3">
                                <img src="../assets/def4.jpg" alt="" class="rounded-full w-12 h-12 bg-gray-300 border border-gray-100">
                            </div>
                            <div class="col-span-9">
                                <p class="font-semibold">{{contact.user_contact.firstname}} {{contact.user_contact.lastname}}</p>
                                <p class="text-gray-400 text-sm break-words">{{contact.user_contact.username}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>You don't have any contacts yet</div>
                <div class="flex flex-row p-3">
                    <button class="uppercase font-semibold text-blue-600 text-sm p-2 hover:bg-gray-300 rounded" @click="$emit('show-addcontact-modal')">add contact</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    computed: {
        contacts(){
            return this.$store.getters.userContacts
        }
    },
    methods: {
        ...mapActions(['getContacts']),
        hideMod(){
            this.$emit('hide-contacts-modal');
        },
    },
    mounted(){
        this.getContacts();
    }
}
</script>