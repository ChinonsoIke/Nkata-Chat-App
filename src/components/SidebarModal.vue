<template>
    <div class="w-screen h-screen animated fadeIn faster  xs:px-6 md:px-0 fixed  left-0 top-0 flex inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
        <div class="absolute bg-black opacity-30 inset-0 z-0" @click="hideMod"></div>
        <!--content-->
        <div class="h-screen relative lg:w-2/12 xs:w-8/12 bg-white shadow-xl">
            <!--body-->
            <div>
                <div class="flex flex-row justify-between py-3 px-4 mb-10">
                    <p class="text-blue-600 uppercase text-lg px-5 font-bold">nkata</p>
                    <button @click="hideMod"><i class="fas fa-times"></i></button>
                </div>
                <ul>
                    <button @click="$emit('show-contacts-modal')" class="w-full"><div class="flex flex-row items-center py-3 px-8 w-full hover:bg-gray-300">
                        <i class="fas fa-user-friends"></i><li class="px-8 font-semibold">Contacts</li>
                    </div></button>

                    <button class="w-full"><div class="flex flex-row items-center py-3 px-8 w-full hover:bg-gray-300">
                        <i class="fas fa-cogs"></i><li class="px-8 font-semibold">Settings</li>
                    </div></button>

                    <button @click="handleLogout" class="w-full"><div class="flex flex-row items-center py-3 px-8 w-full hover:bg-gray-300">
                        <i class="fas fa-sign-out-alt"></i><li class="px-8 font-semibold">Logout</li>
                    </div></button>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        hideMod(){
            this.$emit('hide-sidebar-modal');
        },

        async handleLogout (){
            await this.$store.dispatch('LogOut')
            this.$router.push('/login')
        },
    }
}
</script>