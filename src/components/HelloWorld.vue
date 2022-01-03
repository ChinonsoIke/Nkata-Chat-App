<template>
    <div>
        <!-- <register v-if="!isLoggedIn"></register> -->

        <div>
            <div class="h-screen flex">
                <div class="xs:col-span-12 md:col-span-4">
                    <div v-if="chats">
                        <chats v-for="chat of chats" :key="chat.id" :chat-id="chat.id" :chat-created="chat.created_at" :chat-body="chat.body" @click.native="openChat(chat.to, chat.from)"></chats>
                    </div>
                </div>
                <div class="flex-1 flex overflow-hidden">
                <div class="flex-col-reverse col-span-8 bg-blue-100 xs:hidden md:block h-screen relative flex-1 overflow-y-scroll">
                    <messages :key="contactId" v-if="chatOpen" :contact-id="contactId" class="w-full"></messages>
                </div>
                </div>
            </div>
            <button @click="handleLogout">logout</button>
        </div>
    </div>
</template>

<script>
import Chats from './Chats.vue'
import Messages from './Messages.vue'
import {mapActions} from 'vuex'

export default {
    components: {
        Chats,
        Messages,
    },

    data() {
        return {
            contactId: null,
            chatOpen: false,
        }
    },

    computed:{
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        },
        chats(){
            return this.$store.getters.StateChats.filter(chat => chat !== null)
        },
        user(){
            return this.$store.getters.StateUser
        }
    },

    methods: {
        ...mapActions(['GetChats']),
        openChat(to, from) {
            this.chatOpen= false
            if(to === this.user.id){
                this.contactId= from
            }else{
                this.contactId= to
            }
            this.chatOpen= true      
        },
        async handleLogout (){
            await this.$store.dispatch('LogOut')
            this.$router.push('/login')
        }
    },

    created(){
        this.GetChats()
    },

    mounted() {
    }
}
</script>


