<script lang="ts">
	import svelteLogo from '../../assets/svelte.svg';
	import { layoutStore, type Nav } from '../../stores/layout/layout.store';
	import Sidenav from './sidenav.svelte';


	function topNavClicked(topNav: Nav) {
		layoutStore.setTopNavActive(topNav.path)
	}
</script>

<Sidenav />
<header class="page-header">
  <div class="page-header__wrapper">
		<div class="logo">
			<img
				src={svelteLogo}
				alt="Logo"
				on:click={layoutStore.toggle}
				on:keypress={layoutStore.toggle}
			/>
    </div>
    <div class="topnav">
      <ul class="topnav__container">
      {#each $layoutStore.topNavs as topNav}
        <li class:active={!!topNav.active}>
          <a href={topNav.path.toString()}
					on:click={(e) => {
						topNavClicked(topNav);
					}}>{topNav.title}</a>
        </li>
      {/each}
      </ul>
    </div>
    <a href="/#track-shipment" class="button">Track</a>
  </div>
</header>

<style lang="scss">
	@use '../../styles/index.scss' as *;
	:host {
		--header-height: calc(var(--input-height) * 1);
	}
	// HEADER
	.page-header {
		background: var(--primary);
		box-shadow: 1px 1px 2px var(--shadow-color);
		max-height: var(--header-height);
		overflow: hidden;
    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .logo{
        width: 100px;
        text-align: left;
      }
      .topnav {
        text-align: left;
        align-self: flex-start;
        &__container {
          margin: 1em 0  auto 0;
	        text-align: center;
          li {
            display: inline-block;
            border: solid 2px transparent;
            padding: 0;
            a {
              display: inline-block;
              padding: var(--base-height) var(--base-height) var(--base-height)
                calc(var(--base-height) * 2);
              text-decoration: none;
              font-size: 1.2em;
              color: #818181;
              // display: inline-flex;
              transition: 0.3s;
              &:hover {
                color: var(--secondary);
              }
            }
            &.active,
            &:hover {
              border-bottom-color: var(--secondary);
            }
          }
        }
      }
    }
	}
</style>
