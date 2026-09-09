import { withBasePath } from "@/lib/site-paths";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: "15vh 24px", color: "#263544", background: "#faf8f2", fontFamily: "Avenir Next, sans-serif", textAlign: "center" }}>
        <h1>404 — Page not found</h1>
        <p>This page does not exist.</p>
        <p lang="zh-Hans">找不到这个页面。</p>
        <p><a href={withBasePath("/")}>English home</a> · <a href={withBasePath("/zh")}>中文首页</a></p>
      </body>
    </html>
  );
}
