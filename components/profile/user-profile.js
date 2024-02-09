import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import {getSession, useSession} from "next-auth/react";
import {useEffect, useState} from "react";

function UserProfile() {
  // Redirect away if NOT auth
  // 보호하고싶거나 제한하고싶은 페이지에 구현하기
  // 인증되지 않았을 경우 리다이렉트하게끔

  // 인증되지 않아서 세션이 없는 것과
  // 로딩 상태에서 세션이 없는 것의 차이를 useSession이 구분하지 못한다

  // 1. useSession
  // const {data: session, loading} = useSession()
  // 2. 해결 - getSession
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=> {
    // useEffect는 async로 만들 수 없기 때문에 await 대신 .then()을 사용
    getSession().then(session => {
      if (!session) {
        window.location.href = '/auth'
      } else {
        setIsLoading(false)
      }
    })
  })

  if(isLoading) {
    return <p className={classes.profile}>Loading...</p>
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
