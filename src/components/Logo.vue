<template>
    <div class="logo-wrapper" ref="logoWrapper">
        <div id="logo" ref="logo">
            <router-link to="/">
                <div 
                    class="wall" 
                    v-for="item in wallData" 
                    :ref="item.prefix + 'Wall'"
                    :key="item.prefix" 
                    :class="item.prefix + '-wall'">
                    <div 
                        class="wall--inner"
                        :class="[item.prefix + '-wall--inner', {'modifier--touch-wall--inner': isMobile}]">
                        <div 
                            class="wall--faces" 
                            :class="item.prefix + '-wall--faces'"></div>
                        <div 
                            v-if="item.type === 'boundary'"
                            class="wall--faces modifier--basement-face" 
                            :class="item.prefix + '-wall--faces'"></div>
                        <div 
                            class="wall--rods-wrapper" 
                            :class="item.prefix + '-wall--rods-wrapper'">
                            <div 
                                class="wall--rods"
                                :class="item.prefix + '-wall--rods'" 
                                v-for="i in item.rods" 
                                :key="i"></div>
                        </div>
                        <div 
                            class="wall--beams-wrapper" 
                            :class="item.prefix + '-wall--beams-wrapper'"
                            v-if="hideBeams === false && isMobile === false">
                            <div 
                                class="wall--beams" 
                                :class="item.prefix + '-wall--beams'"
                                v-for="i in item.beams" 
                                :key="i"></div>
                        </div>
                    </div>
                </div>
                <p class="logo-text">Cyber Castrum</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import {EventBus} from '@/event-bus.js';
export default {
    name: 'Logo',
    
    data(){
        return {
            isMobile: true,
            hideBeams: false,
            dayFreshVisit: false,
            wallData: [{
                type: 'fort',
                prefix: 'center',
                beams: 10,
                rods: 0
            }, {
                type: 'boundary',
                prefix: 'grey',
                beams: 18,
                rods: 3
            }, {
                type: 'boundary',
                prefix: 'white',
                beams: 30,
                rods: 6
            }]
        }
    },

    methods: {
        animate(callback, timer) {
            return new Promise(function(resolve){
                window.requestAnimationFrame(function(){
                    setTimeout(function(){
                        if (callback) {
                            callback();
                        }
                        resolve(timer);
                    }, timer);
                })
            });
        },

        animateForMobile(){
            let { centerWall, greyWall, whiteWall, logo, logoWrapper } = this.$refs;
            centerWall = centerWall && centerWall[0];
            greyWall = greyWall && greyWall[0];
            whiteWall = whiteWall && whiteWall[0];

            centerWall.classList.add('modifier--scaleout', 'modifier--show-faces');
            greyWall.classList.add('modifier--show', 'modifier--scaleout', 'modifier--show-rods');
            whiteWall.classList.add('modifier--show', 'modifier--scaleout', 'modifier--show-rods');
            logo.classList.add('modifier--turn-logo', 'modifier--reveal-logo');
            /* Hide beams, show logo text */
            this.animate(() => {
                logo.classList.add('modifier--show-logo-text');
            }, 300);

            /* Reveals C from walls */
            this.animate(() => {
                logo.classList.add('modifier--make-c');
            }, 600);

            /* Makes logo small */
            this.animate(() => {
                logoWrapper.classList.add('modifier--make-small');
                EventBus.$emit('component-logo-animation-completed')
            }, 1800);
        },

        animateForRepeat(){
            let { centerWall, greyWall, whiteWall, logo, logoWrapper } = this.$refs;
            centerWall = centerWall && centerWall[0];
            greyWall = greyWall && greyWall[0];
            whiteWall = whiteWall && whiteWall[0];

            centerWall.classList.add('modifier--scaleout', 'modifier--show-faces');
            greyWall.classList.add('modifier--show', 'modifier--scaleout', 'modifier--show-rods');
            whiteWall.classList.add('modifier--show', 'modifier--scaleout', 'modifier--show-rods');
            logo.classList.add('modifier--turn-logo', 'modifier--reveal-logo', 'modifier--show-logo-text', 'modifier--repeated-animation', 'modifier--make-c');
            logoWrapper.classList.add('modifier--make-small');
            this.animate(() => {
                EventBus.$emit('component-logo-animation-completed')
            }, 300);
        },

        animateForDesktop(){
            let { centerWall, greyWall, whiteWall, logo, logoWrapper } = this.$refs;
            centerWall = centerWall && centerWall[0];
            greyWall = greyWall && greyWall[0];
            whiteWall = whiteWall && whiteWall[0];
            
            /* Scales the logo to 1 */
            this.animate(() => {
                centerWall.classList.add('modifier--scaleout');
            }, 100);
            
            /* Shows faces of center fort, luminates them */
            centerWall.classList.add('modifier--show-faces');
            this.animate(() => {
                centerWall.classList.add('modifier--luminate');
            }, 200);

            /* Show faces of the grey and white walls */
            this.animate(() => {
                greyWall.classList.add('modifier--show');
                whiteWall.classList.add('modifier--show');
            }, 800);

            /* expand and show beams of grey and white walls */
            this.animate(() => {
                greyWall.classList.add('modifier--scaleout');
                whiteWall.classList.add('modifier--scaleout');
            }, 1000);

            /* Rotates the logo, show grey and white wall rods */
            this.animate(() => {
                logo.classList.add('modifier--turn-logo');
                whiteWall.classList.add('modifier--show-rods');
                greyWall.classList.add('modifier--show-rods');
            }, 1500);

            /* Hide beams, show logo text */
            this.animate(() => {
                this.hideBeams = true;
                logo.classList.add('modifier--reveal-logo');
                logo.classList.add('modifier--show-logo-text');
            }, 2100);

            /* Reveals C from walls */
            this.animate(() => {
                logo.classList.add('modifier--make-c');
            }, 3000);

            /* Makes logo small */
            this.animate(() => {
                logoWrapper.classList.add('modifier--make-small');
                EventBus.$emit('component-logo-animation-completed');
            }, 4800);
        },

        animateCenterWall(){
            if (this.dayFreshVisit) {
                this.animateForRepeat();
            } else if (this.isMobile || this.dayFreshVisit){
                this.animateForMobile();
            } else {
                this.animateForDesktop();
            }
        },
    },

    mounted(){
        this.animateCenterWall();
        // EventBus.$emit('component-logo-animation-completed');
    },

    created(){
        this.isMobile = 'ontouchstart' in window;
        var oldTimeStamp = localStorage.getItem('logoTimeStamp');
        var newTimeStamp = (new Date()).getTime();
        if (oldTimeStamp) {
            var msec = newTimeStamp - (+oldTimeStamp);
            var hh = Math.floor(msec / 1000 / 60 / 60);
            if (hh >= 2) {
                this.dayFreshVisit = true;
            }
        }
        // this.dayFreshVisit = true;
        localStorage.setItem('logoTimeStamp', newTimeStamp);
    }
}
</script>

<style lang="scss">
@import "../styles/components/Logo.scss";
</style>
