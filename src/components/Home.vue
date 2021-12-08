<template>
    <div class="">
        <!-- <register v-if="!isLoggedIn"></register> -->

        <div>
            <div class="grid grid-cols-12">
                <div class="xs:col-span-12 md:col-span-4">
                    <header class="bg-blue-600 py-4 px-6">
                        <div class="flex flex-row">
                            <button @click="SidebarModalShow"><i class="fas fa-bars" style="color:#ffffff;"></i></button>
                            <p class="text-white uppercase px-5 font-bold">nkata</p>
                        </div>
                    </header>
                    <div v-if="chats" class="max-h-full overflow-y-scroll">
                        <chats v-for="chat of chats" :key="chat.id" :chat-username="username(chat)" :chat-id="chat.id" :chat-created="chat.created_at" :chat-body="chat.body" @click.native="openChat(chat.to, chat.from, username(chat)); respOpenChat()" :class="respOpenChatClasses"></chats>
                    </div>
                </div>
                <div class="md:col-span-8 xs:col-span-12 bg-blue-100 md:block h-screen max-h-full">
                    <messages :key="contactId" v-if="chatOpen" :contact-username="chatUsername" :contact-id="contactId" class="w-full" @resp-close-chat="respCloseChat"></messages>
                </div>
            </div>
            <sidebar-modal v-if="showSidebarModal" v-on:hide-sidebar-modal="showSidebarModal = false" v-on:show-contacts-modal="ContactsModalShow"></sidebar-modal>
            <contacts-modal v-if="showContactsModal" v-on:hide-contacts-modal="showContactsModal = false" v-on:show-addcontact-modal="AddContactModalShow" v-on:open-chat="openChat2" @resp-open-chat="respOpenChat"></contacts-modal>
            <new-contact-modal v-if="showNewContactModal" v-on:hide-addcontacts-modal="showNewContactModal = false" v-on:show-contacts-modal="ContactsModalShow"></new-contact-modal>
        </div>
    </div>
</template>

<script>
import Chats from './Chats.vue'
import Messages from './Messages.vue'
import SidebarModal from './SidebarModal.vue'
import ContactsModal from './ContactsModal.vue'
import NewContactModal from './NewContactModal.vue'
import {mapActions} from 'vuex'

export default {
    components: {
        Chats,
        Messages,
        SidebarModal,
        ContactsModal,
        NewContactModal,
    },

    data() {
        return {
            contactId: null,
            chatOpen: false,
            showSidebarModal: false,
            showContactsModal: false,
            showNewContactModal: false,
            respOpenChatClasses: {},
            chatUsername: null,
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
        },
        username(){
            return (chat) => {
                if(parseInt(chat.from) === this.user.id){
                    return chat.to_user.username
                }else{
                    return chat.from_user.username
                }
            }
        }
    },

    methods: {
        ...mapActions(['GetChats', 'GetSingle']),
        async openChat(to, from, username) {
            this.chatOpen= false
            console.log('clicked')
            if(to === this.user.id){
                this.contactId= from
                // this.contactUsername= 
            }else{
                this.contactId= to
            }
            this.GetSingle(this.contactId)

            this.chatUsername= username
            this.chatOpen= true      
        },

        openChat2(contactId, username){
            this.contactId= contactId
            this.chatUsername= username
            this.chatOpen= true
            this.showContactsModal= false
        },

        SidebarModalShow(){
            this.showSidebarModal= true
        },

        ContactsModalShow(){
            this.showSidebarModal= false
            this.showContactsModal= true
            this.showNewContactModal= false
        },

        AddContactModalShow(){
            this.showContactsModal= false
            this.showNewContactModal= true
        },

        respOpenChat(){
            this.respOpenChatClasses= {
                'xs:hidden': true,
                'md:block': true,
            }
        },

        respCloseChat(){
            this.chatOpen= false
            this.respOpenChatClasses= {
                'xs:hidden': false,
                'md:block': true,
            }
        },
    },

    created(){
        this.isLoggedIn
        if(this.isLoggedIn){
            this.GetChats()
        }
    },

    mounted() {
        if(this.isLoggedIn){
            this.$Echo.join(`messagesend.${this.user.id}`)
            .here((e) => {
                console.log('joined')
                console.log(e)
            })
            .listen('MessageSent', (e) => {
                console.log(e.message);
                console.log('loggedWebSocket');
                this.GetSingle(e.message.from)
                this.GetChats()
            });
        }        
    }
}
</script>