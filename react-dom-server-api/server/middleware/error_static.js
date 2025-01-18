// Error handling middleware
app.use(async (err, req, res, next) => {
  // log error on server
  console.error(err.message);
  const errorState = {
    message: err.message,
    status: err.status || 500,
  };
  // send error to client
  let temp;
  let html;
  let finalHtml;
  const { fullTemplatePath, fullEntryPath } = validatePage("error");
  try {
    if (isProduction) {
      temp = await renderProduction(fullTemplatePath, fullEntryPath);
    } else {
      temp = await renderDevelopment(
        "error",
        fullTemplatePath,
        fullEntryPath,
        vite
      );
    }

    html = temp.render(errorState);
    // add data error to hydrate client
    finalHtml = temp.template.replace(
      '<div id="root">',
      `<div id="root" data-error='${JSON.stringify(errorState)}'>`
    );
    finalHtml = finalHtml.replace("<!--app-html-->", html);
    // CSP : add nonce on hydrate root script
    finalHtml = finalHtml.replace("%NONCE%", res.locals.nonce);

    res.status(500).set({ "Content-Type": "text/html" }).send(finalHtml);
  } catch (renderError) {
    console.error("Error rendering error page:", renderError);
    res.status(500).send("Internal Server Error");
  }
});
