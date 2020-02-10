<template>
    <div
        :style="{backgroundImage: bgImage}" 
        id="mini-banner" 
        class="mini-banner">
        <div class="mini-banner--main">
            <Particles :no-central-particles="true"/>
        
            <div class="mini-banner--image-container">
                <slot name="image"></slot>
            </div>

            <h2 v-if="bannerTitle" class="mini-banner--heading">
                <span>{{bannerTitle}}</span>
            </h2>
        </div>
        <div v-if="subtitle" class="container">
            <h2 class="brand-heading modifier--page-section-heading">{{subtitle}}</h2>
        </div>
    </div>
</template>

<script>
import Particles from '@/components/Particles';

export default {
    name: 'MiniBanner',

    props: ['title', 'bg-image', 'subtitle'],

    data(){
        return {
            bannerTitle: ''
        }
    },
    
    components: {
        Particles
    },

    created(){
        try {
            this.bannerTitle = this.title || this.$router.currentRoute.name.replace('-', ' ');
        } catch(e){
            this.bannerTitle = '';
        }
    }
}
</script>

<style lang="scss">
@import "../styles/components/MiniBanner.scss";
</style>
