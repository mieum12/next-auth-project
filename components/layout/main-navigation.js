import Link from 'next/link';
import classes from './main-navigation.module.css';
import {signOut, useSession} from "next-auth/react";

function MainNavigation() {
  // session의 활성 상태를 나타내는 세션 객체, 로그인된 상태인지 아닌지 확인하는 요소
  const {data: session, loading} = useSession()
  console.log(session, loading)

  function logoutHandler() {
    // useSession을 사용하기 때문에 session에 변화가 있을 때마다
    // 컴포넌트가 자동으로 업데이트 되어서
    // await을 쓸 필요없다
    signOut() // 쿠키와 세션 정보를 삭제
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
          <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {/*불러오는 중이나 세션이 있을때는 로그인을 표시하고싶지 않다*/}
          {!session && !loading && (
            <li>
            <Link href='/auth'>Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
