import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import {SessionProvider} from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // 내부 코드를 최적화 해서 useSession이 보내는
    // 추가적인 HTTP 요청 (세션 유효성 검사 요청)을 건너뛰게 함
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>

  )
}
