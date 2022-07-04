<script context="module">
  export async function load({session}) {
    return {
      props: {
        access_token: session.access_token,
      }
    }
  }
</script>
<script>
  export let access_token;
  $: is_authenticated = access_token !== undefined
</script>



{#if is_authenticated}
<h1>Access token: {access_token}</h1>
<a href="/logout">
  <button>Logout</button>
</a>
{:else}
<a href="/login">
  <button>Login with Reddit</button>
</a>
{/if}

