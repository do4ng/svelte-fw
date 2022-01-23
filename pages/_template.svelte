<script lang="ts">
  // @ts-ignore
  import Hello from '$lib/hello';
  Hello();
</script>

<div id="__root__">
  <div class="nav">
    <a href="/">home</a> <a href="/about">about</a>
    <a href="/p">posts</a>
  </div>
  <slot />
</div>

<style lang="scss">
  #__root__ {
    margin: 0;
  }
</style>
