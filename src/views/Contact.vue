<template>
    <div class="services">
        <MiniBanner title="Contact Us" subtitle="contact form">
           <img slot="image" src="/img/black-rotary-telephone-on-white-surface-1416530.jpg" alt="Services">
        </MiniBanner>
        <ContactForm />
        <ContactAddress />
       <Footer />
    </div>
</template>

<script>
import MiniBanner from '@/components/MiniBanner'
import ContactAddress from '@/components/ContactAddress'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import {EventBus} from '@/event-bus'
export default {
    name: "contact",
    components: {
       MiniBanner,
       ContactForm,
       ContactAddress,
       Footer
    },
    mounted(){
        EventBus.$emit('component-scroll-page-to-top');
    }
};
</script>
