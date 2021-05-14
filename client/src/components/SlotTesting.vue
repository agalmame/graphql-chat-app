<template>
	<ul>
		<li v-for="(e , i) in users" :key="i">
			<slot :flipp="flipp" name="test" :mytest="e">{{e.name}}</slot>
		</li>
	</ul>	
</template>
<script>
	export default {
		data(){
			
		},
		props:["users"],
		methods:{
			flipp(city){
				alert(city.split("").reverse().join(""))
			}
		}
	}
</script>
<style>

</style>

