<template>
    <div class="home">
       <Banner />
       <ServicesMini />
       <Footer />
    </div>
</template>

<script>
import Banner from '@/components/Banner'
import ServicesMini from '@/components/ServicesMini'
import Footer from '@/components/Footer'
import {EventBus} from '@/event-bus'
export default {
    name: "home",
    components: {
       Banner,
       ServicesMini,
       Footer
    },
    mounted(){
        EventBus.$emit('component-scroll-page-to-top');
    }
};
</script>
