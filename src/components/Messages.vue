<template>
    <div class="relative h-screen">
        <div class="w-full flex flex-row py-4 px-3 bg-white">
            <button @click="$emit('resp-close-chat')" class="px-3 mr-4 md:hidden"><i class="fas fa-arrow-left"></i></button>
            <p class="font-semibold">{{contactUsername}}</p>
        </div>
        <div class="h-5/6 flex flex-column-reverse overflow-y-scroll">
        <div class="grid grid-cols-12 max-h-10 w-full px-5 py-5 mb-5" v-if="messages">
            <div v-for="single in messages" :key="single.id" class="rounded-xl py-3 px-2 shadow my-2" :class="msgClasses(single.from)">
                <p class="break-words text-gray-800">{{single.body}}</p>
                <p class="flex flex-row-reverse text-xs text-gray-500">{{messageTime(single.created_at)}}</p>
            </div>
        </div>
        </div>
        <div class=" absolute bottom-0 w-full bg-gray-300 grid grid-cols-12 py-2 items-center">
            <div class="col-start-3 col-span-8">
                <form @submit.prevent="send()">
                    <input v-model="messageBody" type="message" id="message" rows=1 class="w-full break-words border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 p-1 rounded-xl" placeholder="Message"/>
                </form>
            </div>
            
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import moment from 'moment'

export default {
    props: [
        'contactId',
        'contactUsername'
    ],

    data(){
        return{
            errors: null,
            messageBody: '',
        }
    },

    computed: {
        messages(){
            return this.$store.getters.singleChat.filter(single => single !== null)
        },
        user(){
            return this.$store.getters.StateUser
        },
        msgClasses(){
            return (from)=>{
                if(from === this.user.id){
                return {
                    "col-start-5": "col-start-5",
                    "col-span-8": "col-span-8",
                    "bg-blue-300": "bg-blue-300"
                    }
                }else{
                    return {
                        "col-span-8": "col-span-8",
                        "bg-white": "bg-white"
                    }
                }
            }
        },
        messageTime(){
            return (time)=>{
                return moment(time).format('H:MM, MM/YY')
            }
        }
        
    },

    methods: {
        ...mapActions(['GetSingle', 'sendMessage']),
        async send(){
            try{
                this.sendMessage({'body':this.messageBody, 'to':this.contactId})
                this.messageBody= ''
            } catch (error) {
                console.log(error)
                this.errors = error.response.data.errors
            }
        }
    },

    created(){
        
    }
}
</script>