<template>
    <div class="services">
        <MiniBanner title="our services">
           <img slot="image" src="/img/black-lighted-gaming-keyboard-841228.jpg" alt="Services">
        </MiniBanner>
        <ServicesPanel />
       <Footer />
    </div>
</template>

<script>
import MiniBanner from '@/components/MiniBanner'
import ServicesPanel from '@/components/ServicesPanel'
import Footer from '@/components/Footer'
import {EventBus} from '@/event-bus'
export default {
    name: "services",
    components: {
       MiniBanner,
       ServicesPanel,
       Footer
    },
    mounted(){
        var hash = this.$router.currentRoute.hash;
        if (!hash) {
            EventBus.$emit('component-scroll-page-to-top');
        }
    }
};
</script>
