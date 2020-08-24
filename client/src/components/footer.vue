<template>
	<footer>
		<div class="footer-gray">
			<div class="footer-custom">
				<div class="footer-lists">
					<div class="footer-list">
						<h6 class="ftr-hdr">Contact</h6>
						<ul class="ftr-links-sub">
							<li><a href="#">06 26 35 53 45</a></li>
							<li><a href="#">agalmameyassine@gmail.com</a></li>
						</ul>
					</div>
					<div class="footer-list">
						<h6 class="ftr-hdr">About Us</h6>
						<ul class="ftr-links-sub">
							<li><a href="#">location</a></li>
							<li><a href="#">Introduction</a></li>
							<li><a href="#">Goal</a></li>
						</ul>
					</div>	
					<div class="footer-list">
						<h6 class="ftr-hdr">Custom Service</h6>
						<ul class="ftr-links-sub">
							<li><a href="#">Ordering</a></li>
							<li><a href="#">Shipping</a></li>
							<li><a href="#">Gift Cards</a></li>
							<li><a href="#">Return</a></li>
						</ul>
					</div>
					<div class="footer-list">
						<h6 class="ftr-hdr">My Account</h6>
						<ul class="ftr-links-sub">
							<li><a href="#">Goal</a></li>
							<li><a href="#">Goal</a></li>
							<li><a href="#">Goal</a></li>
						</ul>
					</div>
				</div>
				<div class="footer-email">
					<h6 class="ftr-hdr">Sign up to our Newsletter for the exclusive offers</h6>
					<div id="ftr-email" class="ftr-email-form">
						<form id="ftrEmailForm" method="POST" @submit.prevent>
							<div class="error">Please enter a valid email address</div>
							<input type="text" name="email-address_" id="ftrEmailInput" class="input" placeholder="Your Email"/>
							<input type="submit" class="button" value="SUBMIT" >
						</form>
					</div>	
				</div>
				<div class="footer-social">
					<h6 class="ftr-hdr">Follow us</h6>
					<ul>
						<li><a href="#"><img width="24" height="24" src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/fb.png"></a></li>
					</ul>
					<ul>
						<li><a href="#"><img width="24" height="24" src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/instagram-badge.png"></a></li>
					</ul>
					<ul>
						<li><a href="#"><img width="60" height="60" src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/twitter.png"></a></li>
					</ul>
				</div>
				<div class="footer-legal">
					<p>&copy; codylia.com Inc. All Rights Reserved. | <a href="#">Privacy Policy</a>
					| <a href="#">Terms of Use</a> | <a href="#">Terms of Sale</a>
					</p>
				</div>
				<div class="ftr-payment">
					<ul>
						<li class="ftr-visa">
							<span title="visa secure" ></span>
						</li>
						<li class="ftr-mastercard">
							<span title="visa secure" ></span>
						</li>
						<li class="ftr-cmi">
							<span title="visa secure" ></span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	export default{
		
	}
</script>

<style scoped>
	footer{
		margin-top: auto;
		display: flex;
	}
	.footer-gray {
		background-color: #EEEFEF;
		width: 100%
	}
	.footer-custom {
		color: #888;
		font: normal normal normal 12px/1.4 "HeleveticaNeue-light", "Helvetica Neue Light", Helvetica, sans-serif;
		max-width: 1008px;
		margin: 0 auto;
		padding: 24px;
	}
	.footer-custom:after {
		display: table;
		clear: both;
		content: "";
	}
	.footer-lists:after {
		content: "";
		display: table;
		clear: both;
	}
	.ftr-hdr {
		color: #000;
		font: 22px/1.4 'BedasNeueRegular', Arial, sans-serif;
		margin: 1em 0 0 ;
	}
	.footer-list {
		width: 50%;
		float: left;
	}

	@media only screen and (min-width:568px){
		.footer-list {
			width: 33.3333%;
		}
	}
	@media only screen and (min-width:768px){
		.footer-list{
			width: 25%
		}
	}
	.ftr-links-sub {
		padding: 0;
		margin: 0
	}
	.ftr-links-sub:after {
		display: table;
		clear: both;
		content: "";
	}
	.ftr-links-sub li {
		display: block;
		list-style-type: none;
		margin: 0;
		padding: 3px;
		font: normal normal normal 12px "Helvetica-light", "Helvetica Neue Light", Arial, "Lucida Grande", sans-serif;
		text-transform: uppercase
	}
	.footer-custom a,
	.footer-custom a:link,
	.footer-custom a:visited {
		text-decoration: none;
		color: #888;
		padding: 5px 0;
		display: block;
	}
	.footer-custom .footer-legal a {
		display: inline;
	}
	.footer-custom a:hover,
	.footer-custom a:active {
		text-decoration: underline;
		color: #888;
		cursor: pointer;
	}

	@media only screen and (min-width; 768px){
		.footer-custom a, .footer-custom a:visited, .footer-custom a:link {
			padding: 0
		}
	}
	.footer-email {
		text-align:center;
	}
	#ftrEmailForm {
		height: 44px;
	}
	#ftrEmailForm .error {
		display: none;
		color: red;
		text-align: left;
	}
	#ftrEmailForm #ftrEmailInput {
		background: none repeat scroll 0 0 #FFF;
		border: 1px solid #D6D6D6;
		color: #888;
		float: left;
		font: normal normal 14px/1.4 "HelveticaNeue-light", Helvetica, Arial, sans-serif;
		padding: 5px;
		width: 70%;
		height: 100%;
	}
	#ftrEmailForm #ftrEmailInput:hover {
		border: 1px solid #888;
	}
	#ftrEmailForm #ftrEmailInput:focus{
		border: 1px solid #ef9223;
		outline: #ef9223 auto 5px;
	}
	#ftrEmailForm .button {
		width: 30%;
		height: 100%;
		padding: 5px;
		float: left;
		border: 1px solid #DFDFDF;
		color: #000;
		font: normal normal bold 18px/1 BebasFamily, Helvetica, Arial, sans-serif;
		text-align: center;
		text-transform: uppercase;
		background: #FFF;
		background: linear-gradient(to bottom,white 0, #e1e1e1 100%);
		cursor: pointer;

	}
	#ftrEmailForm .button:hover,
	#ftrEmailForm .button:active {
		background: linear-gradient(to top, white, #e1e1e1);
		
	}
	.footer-social {
		text-align: center;
	}
	.footer-social ul{
		padding: 0;
		display: inline-block;
		list-style: none;
	}
	.footer-social ul::after {
		display: table;
		clear: both;
		content: "";
	}
	.footer-social li {
		float: left;
		margin: 0 15px 0 0;
		padding: 0;
	}
	@media only screen and (min-width: 768px) {
		.footer-lists {
			width: 100%
		}
		.footer-email {
			width: 50%;
			float: left;
			text-align: left;
		}
		.footer-social {
			width: 45%;
			margin-left: 5%;
			float: left;
			text-align: left;
		}
	}
	@media only screen and (min-width: 1008px) {
  .footer-lists {
    width: 66.6666%;
    float: left;
  }
  .footer-email {
    width: 33.3333%;
  }
  .footer-social {
    width: 33.3333%;
    float: right;
    margin-left: 0;
  }
}

.footer-legal {
  padding: 15px 0 0;
  clear: left;
}

.footer-payment {
  text-align: center;
}

@media only screen and (min-width: 768px) {
  .footer-legal {
    width: 66.6666%;
    float: left;
  }
  .footer-payment {
    width: 33.3333%;
    float: left;
  }
}

@media only screen and (min-width: 1008px) {
  .footer-payment {
    text-align: left;
  }
}

.footer-payment ul {
  padding: 0;
  display: inline-block;
  list-style-type: none;
}

.footer-payment ul li {
  display: inline-block;
  margin: 0 6px;
}

@media only screen and (min-width: 1008px) {
  .footer-payment ul li.ftr-stella {
    margin-left: 0;
  }
}
 


</style>
