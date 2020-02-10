<template>
    <div id="services-mini" class="services-mini">
        <div class="container">
            <h2>
                <span>{{heading}}</span>
            </h2>
            <div class="services-mini--collection">
                <div class="services-mini--item" 
                    v-for="(service, index) in services" 
                    :key="index">
                    <router-link :to="{name: 'services', hash: '#' + service.linkPath}" class="cc-card">
                        <div class="cc-card--main">
                            <img 
                                class="cc-card--image" 
                                :src="service.image" 
                                :alt="service.name">
                            <h3 class="cc-card--title">{{service.name}}</h3>
                        </div>

                        <div class="cc-card--content">
                            <ServicesDescription :type="service.name" :is-mini="true" />
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import services from '@/assets/json/services.json';
import ServicesDescription from '@/components/ServicesDescription';

export default {
    name: 'ServicesMini',

    props: ['title'],
    
    components: {
        ServicesDescription
    },
    
    data(){
        return {
            services: []
        }
    },
    
    computed: {
        heading(){
            return this.title || 'Checkout our security services';
        }
    },
    
    created(){
        this.services = services;
    }
}
</script>

<style lang="scss">
@import "../styles/components/ServicesMini.scss";
</style>
