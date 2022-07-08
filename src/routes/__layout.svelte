<script>
  import "../app.css";
</script>

<svelte:head>
  <title>RedditShuffle - Shuffle your saved Reddit posts</title>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-H1KNNBMQEJ"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-H1KNNBMQEJ');
  </script>
</svelte:head>

<slot />