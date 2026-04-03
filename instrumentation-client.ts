if (typeof window !== "undefined") {
  const init = () =>
    import("posthog-js").then(({ default: posthog }) => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        defaults: "2026-01-30",
      });
    });

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(init);
  } else {
    setTimeout(init, 3500);
  }
}
