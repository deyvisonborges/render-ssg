import Document, { Html, Head, Main, NextScript } from "next/document";
import { NoScriptTagManager, ScriptTagManager } from "./scripts/tagManager";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <ScriptTagManager />
        </Head>
        <body>
          <NoScriptTagManager />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}