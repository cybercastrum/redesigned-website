<template>
    <div id="footer" class="footer">
		<div class="footer-section modifier--contact">
			<div class="container">
				<div class="footer-section--contact--statement">
					<h4 class="brand-heading">Like what you see?</h4>	
					<p>Are you interested in learing more or starting a project with us?</p>
					<p>We would love to help!</p>
				</div>
				<div class="footer-section--contact--cta">
					<router-link 
						:to="'/contact'" 
						class="fancy-brand-btn modifier--hover-default">
						<span>Contact Us</span>
					</router-link>
				</div>
			</div>
		</div>

		<div class="footer-section modifier--copyright">
			<div class="container">
				<h4>&copy; {{(new Date()).getFullYear() || '2019'}} Cyber Castrum. All rights reserved</h4>	
			</div>
		</div>
    </div>
</template>

<script>

export default {
    name: 'Footer'
}
</script>


<style lang="scss">
@import "../styles/components/Footer.scss";
</style>
