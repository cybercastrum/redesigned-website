<template>
    <div class="plans">
        <MiniBanner 
            subtitle="Here is what we offer"
            title="our plans">
           <img slot="image" src="/img/plans-2.jpg" alt="Services">
        </MiniBanner>
        <PricePanel />
       <Footer />
    </div>
</template>

<script>
import MiniBanner from '@/components/MiniBanner'
import PricePanel from '@/components/PricePanel'
import Footer from '@/components/Footer'
import {EventBus} from '@/event-bus'
export default {
    name: "plans",
    components: {
       MiniBanner,
       PricePanel,
       Footer
    },
    mounted(){
        EventBus.$emit('component-scroll-page-to-top');
    }
};
</script>
