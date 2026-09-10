const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

module.exports = function (eleventyConfig) {
  // Static passthrough
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  eleventyConfig.addCollection("blogPosts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").sort((a, b) => {
      return (b.data.date || "").localeCompare(a.data.date || "");
    });
  });

  eleventyConfig.addCollection("descargables", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/descargables/*.md");
  });

  eleventyConfig.addCollection("ebooksPodcast", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/ebooks-podcast/*.md").sort((a, b) => {
      const orderA = a.data.orden ?? 9999;
      const orderB = b.data.orden ?? 9999;
      return orderA - orderB;
    });
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addFilter("readableDate", (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
