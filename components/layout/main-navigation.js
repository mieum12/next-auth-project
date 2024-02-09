import Link from 'next/link';
import classes from './main-navigation.module.css';
import {useSession} from "next-auth/react";

function MainNavigation() {
  // session의 활성 상태를 나타내는 세션 객체, 로그인된 상태인지 아닌지 확인하는 요소
  const {data: session, loading} = useSession()
  console.log(session, loading)

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
              <button>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
