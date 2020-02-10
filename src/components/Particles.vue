<template>
    <div id="particles-container">
        <BannerCenterProtection v-if="skipShowingCentralParticles !== true" />
        <vue-particles 
            :color="'#ffffff'"
            :particleOpacity="0.4"
            :particlesNumber="skipShowingCentralParticles ? 40 : 80"
            :particleSize="skipShowingCentralParticles ? 4 : 2"
            :linesColor="skipShowingCentralParticles ? primaryColor : '#ffffff'"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="5"
            :hoverEffect="true"
            hoverMode="repulse"
            :clickEffect="true"
            clickMode="repulse" />
    </div>
</template>

<script>
import variables from '@/styles/setup/_variables.scss';
import BannerCenterProtection from '@/components/BannerCenterProtection';
export default {
    name: 'Particles',

    props: ['noCentralParticles'],
    
    components: {
        BannerCenterProtection
    },

    computed: {
        skipShowingCentralParticles(){
            return this.isMobile || this.noCentralParticles;
        }
    },
    
    data(){
        return {
            isMobile: true,
            primaryColor: variables.primaryColor
        }
    },

    created(){
        this.isMobile = 'ontouchstart' in window;
    }

}
</script>

<style lang="scss">
@import "../styles/components/Particles.scss";
</style>
