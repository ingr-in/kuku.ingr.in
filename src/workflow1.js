export default {
  async fetch(request) {

    const url = new URL(request.url);
    const host = url.hostname;

    if (host.startsWith("www.")) {

      const rootHost = host.replace(/^www\./, "");

      try {

        const res = await fetch(
          "https://" + rootHost,
          {
            method: "HEAD",
            redirect: "manual"
          }
        );

        if (res.ok) {

          return Response.redirect(
            "https://" +
            rootHost +
            url.pathname +
            url.search,
            301
          );

        }

      } catch (e) {
        console.log(e);
      }

    }

    return fetch(request);

  }
};
