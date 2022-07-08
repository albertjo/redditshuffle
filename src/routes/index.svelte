<script context="module">
  import { getAllSavedPosts, getRedditUser } from '../api';

  export async function load({session}) {
    if (session.access_token === undefined) {
      return {
        props: {}
      }
    }
    const redditUser = await getRedditUser(session.access_token)
    const savedPosts = await getAllSavedPosts(session.access_token, redditUser.name)

    return {
      props: {
        accessToken:  session.access_token,
        redditUser:   redditUser,
        savedPosts:   savedPosts.data.children,
      }
    }
  }
</script>
<script>
  import Navbar from '$lib/Navbar.svelte';
  import Saved from '$lib/Saved.svelte';

  export let accessToken;
  export let redditUser;
  export let savedPosts = []
  $: is_authenticated = accessToken !== undefined

  function shuffleSavedPosts() {
    for (let i = savedPosts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [savedPosts[i], savedPosts[j]] = [savedPosts[j], savedPosts[i]];
    }
  }
</script>

<Navbar>
  {#if is_authenticated}
    <button on:click={shuffleSavedPosts} class="bg-transparent hover:bg-orange-600 text-orange-600 font-semibold text-sm hover:text-white py-2 px-2 border border-orange-600 hover:border-transparent rounded">
      Shuffle Saved
    </button>
    <a href="/logout" class="text-sm text-neutral-700 no-underline">
      Logout
    </a>
  {:else}
    <a href="/login">
      <button class="bg-transparent hover:bg-orange-600 text-orange-600 font-semibold text-sm hover:text-white py-2 px-2 border border-orange-600 hover:border-transparent rounded">
        Login with Reddit
      </button>
    </a>
  {/if}
</Navbar>

<div class="bg-slate-50">
  {#if is_authenticated}
    <Saved savedPosts={savedPosts}></Saved>
  {/if}
</div>

