1. `Invalid <Link> with <a> child.`

- 에러 발생 이유: Starting with Next.js 13, <Link> renders as <a>, so attempting to use <a> as a child is invalid.
- 에러 해결: `<Link><a id="link">Home</a></Link>` -> `<Link id="link">Home</Link>`.
- 참고 사이트: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor
