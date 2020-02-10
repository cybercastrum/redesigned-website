<template>
    <div ref="servicesPanel" id="services-panel" class="services-panel">
        <div class="max-container">
            <div class="services-panel--section modifier--left">
                <div 
                    :class="{'modifier--active': activeService === service.name}"
                    class="services-panel--item" 
                    v-for="(service, index) in services" 
                    :key="index">
                    <div class="services-panel--item--section-anchor" :data-set="service.linkPath" v-if="isMobileResolution" :ref="service.linkPath"></div>
                    <router-link 
                        class="services-panel--item--trigger"
                        v-if="isMobileResolution !== true"
                        :to="{name: 'services', hash: '#' + service.linkPath}" />
                    <div
                        class="services-panel--item--title">
                        <img 
                            v-if="isMobileResolution !== true" 
                            :src="service.image" 
                            :alt="service.name">
                        <h2 class="brand-heading">{{service.name}}</h2>
                    </div>
                    <div 
                        v-if="isMobileResolution" 
                        class="services-panel--item--content">
                        <ServicesDescription  :type="service.name"/>
                    </div>
                </div>
            </div>
            <div 
                v-if="isMobileResolution === false"
                class="services-panel--section modifier--right">
                <ServicesDescription :type="activeService"/>
            </div>
        </div>
    </div>
</template>

<script>
import services from '@/assets/json/services';
import {EventBus} from '@/event-bus';
import ServicesDescription from '@/components/ServicesDescription';
export default {
    name: 'ServicesPanel',

    components: {
        ServicesDescription
    },
    
    data(){
        return {
            services: [],
            isMobileResolution: matchMedia("(max-width: 767)").matches,
            activeService: null
        }
    },

    watch: {
        $route(to){
            try {
                if (this.$router.currentRoute.hash) {
                    this.activeService = this.$router.currentRoute.hash.replace('#', '');
                } else {
                    this.activeService = this.services[0].name;
                }

                if (this.isMobileResolution !== true) {
                    EventBus.$emit('component-scroll-to-element', this.$refs.servicesPanel);
                }
            } catch(e) {
                this.activeService = to.services[0].name;
            }
        }
    },

    created(){
        this.services = services;
        this.isMobileResolution = matchMedia("(max-width: 767px)").matches;
        window.addEventListener('resize', () => {
            this.isMobileResolution = matchMedia("(max-width: 767px)").matches;
        });
        
        try {
            if (this.$router.currentRoute.hash) {
                this.activeService = this.$router.currentRoute.hash.replace('#', '');
            } else {
                this.activeService = this.services[0].name;
            }
        } catch(e) {
            this.activeService = this.services[0].name;
        }
    },

    mounted(){
        setTimeout(() => {
            if (this.$router.currentRoute.hash) {
                if (this.isMobileResolution) {
                    EventBus.$emit('component-scroll-to-element', this.$refs[this.activeService][0]);
                } else {
                    EventBus.$emit('component-scroll-to-element', this.$refs.servicesPanel);
                }    
            }
        }, 400);
    }
}
</script>


<style lang="scss">
@import "../styles/components/ServicesPanel.scss";
</style>
