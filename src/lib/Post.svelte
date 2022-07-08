<script>
  import { parse } from 'node-html-parser'
  export let postData

  function unescape(s) {
    return s.replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"');
  }

  function getMp4UrlForHostedVideo(savedPost) {
    try {
      return savedPost.secure_media.reddit_video.fallback_url.split('?')[0]
    } catch (error) {
      console.log(error)
      return ''
    }
  }

  function extractRichVideoUrl() {
    try {
      const root = parse(unescape(postData.secure_media.oembed.html));
      return root.getElementsByTagName('iframe')[0].getAttribute('src');
    } catch (error) {
      console.log(error)
    }
  }

  function convertUTCToTimestamp(utc_time) {
    try {
      const date = new Date(utc_time * 1000)
      return date.toLocaleString()
    } catch(error) {
      console.log(error)
      return ''
    }
  }
</script>

<div class="py-2 m-2 shadow-lg p-3 rounded-lg bg-white">
  <!-- Stats (upvotes, subreddit, date) -->
  <div class="">
    <div class="flex-auto">
      <div class="pb-1 flow-root text-xs border border-transparent border-b-slate-100">
        <div class="flex float-left">
          <a class="ml-1 font-medium text-slate-400" href="https://reddit.com/{postData.subreddit}">r/{postData.subreddit}</a>
        </div>
        <div>
          <p class="float-right text-slate-300">{convertUTCToTimestamp(postData.created_utc)}</p>
        </div>
      </div>

      <!-- Title of post  -->
      <a class="flex text-sm font-medium text-neutral-700 hover:underline" href="https://reddit.com{postData.permalink}">
        {unescape(postData.title)}
        {#if postData.is_self}
          <p class="ml-1 font-normal text-slate-400">(self)</p>
        {:else if postData.post_hint === 'link' || postData.post_hint === undefined}
          <p class="ml-1 font-normal text-slate-300">🔗</p>
        {:else}
        <p class="ml-1 font-normal text-slate-300"></p>
        {/if}
      </a>
    </div>
  </div>

  <!-- body post (img/vid or text if self) or comment -->
  <div class="my-1 flex justify-center bg-neutral-900 rounded object-contain">
    {#if postData.post_hint === 'image'}
      <a href="https://reddit.com{postData.permalink}">
        <img class="md:max-h-screen/2 sm:max-h-screen" src="{postData.url}">
      </a>
    {:else if postData.post_hint == 'hosted:video' }
      <video controls>
        <source src="{getMp4UrlForHostedVideo(postData)}" type="video/mp4">
      </video>
    {:else if postData.post_hint == 'rich:video' && extractRichVideoUrl() }
          <iframe class="w-full aspect-video" src="{extractRichVideoUrl()}"></iframe>
    {/if}
  </div>
  <div class="pt-1">
    <p class="text-xs font-medium">👍 {postData.score}</p>
  </div>
</div>