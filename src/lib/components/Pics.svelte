<script>
  const imports = import.meta.glob(
    "/src/content/lora/favoritepics/pics/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}",
    {
      import: "default",
      eager: true,
      query: {
        enhanced: true,
        w: "2000;1200;800",
      },
    },
  );

  const images = Object.values(imports);

  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
</script>

<div class="favorite-pics">
  <div class="grid">
    {#each images as image (image.img.src)}
      <picture>
        <source srcset={image.sources.avif} type="image/avif" />
        <source srcset={image.sources.webp} type="image/webp" />
        <img
          src={image.img.src}
          alt=""
          loading="lazy"
          onload={(e) => (e.target.style.opacity = 1)}
          width={image.img.w}
          height={image.img.h}
        />
      </picture>
    {/each}
  </div>
</div>

<style>
  .favorite-pics {
    width: 100%;
  }

  .grid {
    columns: 3;
    column-gap: 1rem;
    column-fill: balance;
  }

  picture {
    display: block;
    overflow: hidden;
    break-inside: avoid;
    margin-bottom: 1rem;
  }

  img {
    transition: opacity 0.2s;
    opacity: 0;
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 1400px) {
    .grid {
      columns: 2;
    }
  }

  @media (max-width: 850px) {
    .grid {
      columns: 1;
    }
  }
</style>
