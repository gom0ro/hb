import { Helmet } from 'react-helmet-async'

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined
const YM_ID = import.meta.env.VITE_YM_ID as string | undefined

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    ym?: (id: number, action: string, ...args: unknown[]) => void
  }
}

export function Analytics() {
  return (
    <>
      {GA_ID && (
        <Helmet>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
          <script>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: true });
          `}</script>
        </Helmet>
      )}
      {YM_ID && (
        <Helmet>
          <script>{`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return;}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
            ym(${YM_ID}, 'init', { defer: true });
          `}</script>
        </Helmet>
      )}
    </>
  )
}
