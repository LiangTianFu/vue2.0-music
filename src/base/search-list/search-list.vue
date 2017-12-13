<template>
	<div class="search-list" v-show="searches.length">
		<ul>
			<li @click="selectItem(item)" class="search-item" v-for="item in searches">
				<span class="text">{{item}}</span>
				<span class="icon" @click.stop="deleteOne(item)">
					<i class="icon-delete"></i>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			searches: {
				type: Array,
				default: []
			}
		},
		methods: {
			selectItem(item) {
				this.$emit('select', item)
			},
			deleteOne(item) {
				this.$emit('delete', item)

			}
		}
	}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";

.search-list{
	.search-item{
		display: flex;
		align-items: center;
		height: 40px;
		.text{
			flex: 1;
			/*font-size: $font-size-medium;*/
			color: $color-text-l;
		}
		.icon{
			@include extend-click();
			.icon-delete{
				font-size: $font-size-small;
				color: $color-text-d;
			}
		}
	}
}

</style>