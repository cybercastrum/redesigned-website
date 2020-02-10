<template>
    <div class="services-description">
        <!-- Consulting Description -->
        <template v-if="type === 'consulting'">
            <div v-if="isMini">
                <p>This is the 'mini' content for cosulting</p>
            </div>

            <div v-else>
                <h3 class="services-description--heading brand-subheading">We provide consultation</h3>
                <p class="services-description--subheading">This is some description about the service. Generally this can be of a 100 characters or above</p>
                <ul>
                    <li>
                        <h4 class="brand-heading modifier--left">Custom Security Automation</h4>
                        <p>Custom security automation involves US to include some custom tools to test your application against a few cyber attacks.</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Security Code Review</h4>
                        <p>Description for "Security Code Review"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Red Team Activity</h4>
                        <p>Description for "Red Team Activity"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Threat Modeling</h4>
                        <p>Description for "Thread Modeling"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Risk Assessment</h4>
                        <p>Description for "Risk Assessment"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Software Composition Analysis</h4>
                        <p>Description for "Software Composition Analysis"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Social Engineering</h4>
                        <p>Description for "Social Engineering"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Security Operations Center (L1)</h4>
                        <p>Description for "Security Operations Center (L1)"</p>
                    </li>
                </ul>
            </div>
        </template>

        <!-- Testing Description -->
        <template v-if="type === 'testing'">
            <div v-if="isMini">
                <p>This is the 'mini' content for testing</p>
            </div>

            <div v-else>
                <h3 class="brand-subheading services-description--heading">We can test your digital products</h3>
                <p class="services-description--subheading">This is some description about the service. Generally this can be of a 100 characters or above</p>
                <ul>
                    <li>
                        <h4 class="brand-heading modifier--left">Web Application</h4>
                        <p>Description for "Web Application"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Network</h4>
                        <p>Description for "Network"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Mobile</h4>
                        <p>Description for "Mobile"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">IoT (Internet of Things)</h4>
                        <p>Description for "IoT (Internet of Things)"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Cloud</h4>
                        <p>Description for "Cloud"</p>
                    </li>
                </ul>
            </div>
        </template>

        <!-- Training Description -->
        <template v-if="type === 'training'">
            <div v-if="isMini">
                <p>This is the 'mini' content for training</p>
            </div>
            <div v-else>
                <h3 class="brand-subheading services-description--heading">We can train you on security</h3>
                <p class="services-description--subheading">This is some description about the service. Generally this can be of a 100 characters or above.</p>
                <ul>
                    <li>
                        <h4 class="brand-heading modifier--left">Web Application Security</h4>
                        <p>Description for "Web Application Security"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Network Security</h4>
                        <p>Description for "Network Security"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Source Code Review</h4>
                        <p>Description for "Source Code Review"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Red Teaming</h4>
                        <p>Description for "Red Teaming"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Cloud Security</h4>
                        <p>Description for "Cloud Security"</p>
                    </li>
                    <li>
                        <h4 class="brand-heading modifier--left">Thread Modeling</h4>
                        <p>Description for "Thread Modeling"</p>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'ServicesDescription',
    props: ['type', 'isMini']
}
</script>


<style lang="scss">
@import "../styles/components/ServicesDescription.scss";
</style>
