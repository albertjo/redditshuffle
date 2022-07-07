<script context="module">
  import { getAllSavedPosts, getRedditUser } from '../api';

  export async function load({session}) {
    const redditUser = await getRedditUser(session.access_token)
    const savedPosts = await getAllSavedPosts(session.access_token, redditUser.name)

    console.log(redditUser.name)
    savedPosts.data.children.forEach(post => {
      const data = post.data

      // saved comments do not have a title hm
      // author:      is commenter if a comment, is poster if a post
      // link_author: will be undefined if a post
      // title:       only will be present if it's a post
      // url:         only present if it's a post
      // selftext:    only if saved post is a text post

      // fields only available with posts:
      //   1. title
      //   2. url
      //   3. post_hint (self|link|image|rich:video|hosted:video) *may not always be available
      //
      //   fields only available to text posts:
      //     1. selftext (will be '' for link)
      //     2. is_self=true
      //
      //   fields only available to video link posts:
      //     1. secure_media (reddit_video:fallback_url|oembed)

      // fields only available with comments:
      //   1. link_title
      //   2. link_author
      //   3. body

      // fields available to all:
      //   1. score:
      //   2. created_utc
      //   3. subreddit
      //   4. permalink
    });
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
import { dataset_dev } from "svelte/internal";

  export let accessToken;
  export let redditUser;
  export let savedPosts = []
  $: is_authenticated = accessToken !== undefined

  function unescape(s) {
    return s.replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"');
  }
</script>

<div>
{#if is_authenticated}
<h1>Access token: {accessToken}</h1>
<h2>User: {redditUser.name}</h2>

<div class="flex justify-center bg-slate-200">
  <div class="lg:w-2/3 xs:w-full">
  {#each savedPosts as item, i}

    <!-- Post div -->
    <div class="m-2 bg-white rounded-md shadow-sm">

      <!-- Stats (upvotes, subreddit, date) -->
      <div class="px-2 pt-2">
        <h1>👍{item.data.score} r/{item.data.subreddit} {item.data.created_utc} </h1>
      </div>

      <!-- Title (if post) or LinkTitle (if comment) -->
      <div class="px-2 pb-2">
        <a href="https://reddit.com{item.data.permalink}">
          {#if item.data.title}
            <b>{unescape(item.data.title)}</b>
          {:else}
            <b>{unescape(item.data.link_title)}</b>
          {/if}
        </a>
      </div>

      <!-- body post (img/vid or text if self) or comment -->
      <div class="flex justify-center">
        {#if item.data.title} <!-- if post -->
          {#if item.data.post_hint === 'image'}
            <a href="https://reddit.com{item.data.permalink}">
              <img class="md:max-h-screen-2/3 sm:max-h-screen" src="{item.data.url}">
            </a>
          {/if}
        {:else}
          <!--{item.data.body}-->
        {/if}
      </div>

      <!--

        {:else if item.data.post_hint === 'link' || item.data.post_hint === undefined}
          <a href="{item.data.url}">url to link</a>
          <video controls>
            <source src="https://v.redd.it/5r3wdgz8p7191/DASH_720.mp4" type="video/mp4">
          </video>
      -->
    </div>
  {/each}
  </div>
</div>
<!-- Get username -->

<a href="/logout">
  <button>Logout</button>
</a>
{:else}
<a href="/login">
  <button>Login with Reddit</button>
</a>
{/if}
</div>

