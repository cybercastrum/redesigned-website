<template>
    <div id="banner" class="banner">
        <Particles />
        <span class="banner--background"></span>
        <div class="banner--inner container">
            <div class="banner--inner--section modifier--left">
                <p class="banner--heading brand-main-heading">
                    <span>Strong</span>
                    <span>Safe</span>
                    <span>Secure</span>
                </p>
                <div class="banner--caption">
                    <p>Cyber Castrum is the fort to gaurd your digital products from cyber threats. Leveraging client organizational practices to make them digitally secure</p>
                    
                    <div class="banner--btn-container">
                        <router-link 
                            :to="'/contact'" 
                            class="fancy-brand-btn banner--btn modifier--contact">
                            <span>Contact Us</span>
                        </router-link>

                        <router-link 
                            :to="'/services'" 
                            class="fancy-brand-btn banner--btn modifier--solutions">
                            <span>Find what we offer</span>
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="banner--inner--section modifier--right">
                <div class="banner--about">
                    <div class="banner--achievements">
                        <div class="banner--achievement-item">
                            <span class="banner--achievement-item--count">8+</span>
                            <span class="banner--achievement-item--text">Years Avg. Experience</span>
                        </div>
                        <div class="banner--achievement-item">
                            <span class="banner--achievement-item--count">10</span>
                            <span class="banner--achievement-item--text">Security Certifications</span>
                        </div>
                        <div class="banner--achievement-item">
                            <span class="banner--achievement-item--count">12</span>
                            <span class="banner--achievement-item--text">Custom Security Solutions</span>
                        </div>
                    </div>
                    <div class="banner--slider--wrapper">
                        <div class="banner--slider">
                            <div class="banner--slide">
                                <div class="banner--slide--title">
                                    <h4>Mission</h4>
                                </div>
                                <div class="banner--slide--content">
                                    <p>Our mission is to create a safe place in the cyberspace. We aim to do this by delivering innovative requirement based training with a brand authorised certification, and is designed to empower cyber security careers.</p>    
                                </div>
                            </div>
                            <div class="banner--slide">
                                <div class="banner--slide--title">
                                    <h4>Vision</h4>
                                </div>
                                <div class="banner--slide--content">
                                    <p>Cybercastrum believes in branding rather than instant earning. Our vision is to become a global brand in cyber security. We tend to create Cyber warriors who will be able to defeat and protect the present and upcoming business world.</p>
                                </div>
                            </div>
                            <div class="banner--slide">
                                <div class="banner--slide--title">
                                    <h4>Core Values</h4>
                                </div>
                                <div class="banner--slide--content">
                                    <p>Our principle belief is to work with complete integrity and follow the highest professional ethics in order to build a long lasting relationship. We ensure that we provide maximum awareness to exploit every weakness in your system.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Particles from '@/components/Particles';
import {tns} from 'tiny-slider/src/tiny-slider'

export default {
    name: 'Banner',
    
    components: {
        Particles
    },

    mounted(){
        tns({
            container: '.banner--slider',
            items: 1,
            speed: 1000,
            autoplay: true,
            controls: false,
            nav: false,
            autoplayHoverPause: true,
            autoplayResetOnVisibility: true,
            autoplayButtonOutput: false
        });
    }
}
</script>

<style lang="scss">
@import "../styles/third-party/tiny-slider.scss";
</style>


<style lang="scss">
@import "../styles/components/Banner.scss";
</style>
