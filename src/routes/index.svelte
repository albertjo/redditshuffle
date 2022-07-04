<script context="module">
  export async function load({session}) {
    return {
      props: {
        user: session.user,
      }
    }
  }
</script>
<script>
  export let user;
</script>

{#if user}
<h1>Hello {user}</h1>
<a href="/logout">
  <button>Logout</button>
</a>
{:else}
<a href="/login">
  <button>Login with Reddit</button>
</a>
{/if}


