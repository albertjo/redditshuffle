<script>
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
  import Post from '$lib/Post.svelte'
  export let savedPosts = []

  function isPost(item) {
    if (item.data.title) {
      return true
    }
    return false
  }
</script>

<div class="flex justify-center text-slate-400">
  <div class="lg:w-2/3 xs:w-full">
  {#each savedPosts as item, i}
    <!-- Post div -->
    {#if isPost(item)}
      <Post postData={item.data}></Post>
    {/if}
  {/each}
  </div>
</div>

