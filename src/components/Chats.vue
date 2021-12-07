<template>
    <div class="cursor-pointer hover:bg-gray-100 px-2">
        <div class="grid grid-cols-12 flex items-center p-2 border-b border-blue-100">
            <div class="col-span-2">
                <img src="../assets/def4.jpg" alt="" class="rounded-full w-12 h-12 bg-gray-300 border border-gray-100">
            </div>
            <div class="col-span-10">
                <div class="flex justify-between">
                <div class="">
                    <p class="font-semibold">{{chatUsername}}</p>
                </div>
                <div class="text-gray-400 text-sm">{{messageTime}}</div>
                </div>
                <p class="text-gray-400 text-sm break-words">{{messageBody}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props:['chatId', 'chatCreated', 'chatBody', 'chatUsername'],
    data(){
        return{}
    },

    computed:{
        messageBody(){
            return this.chatBody.length > 30 ? this.chatBody.substring(0, 30) + '...' : this.chatBody
        },
        messageTime(){
            return moment(this.chatCreated).format('H:MM, MM/YY')
        }
    },

    methods:{
        
        openChat(id) {
            console.log(`clicked ${id}`)
        },
    },
}
</script>