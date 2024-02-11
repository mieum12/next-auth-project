import AuthForm from '../components/auth/auth-form';
import {useEffect, useState} from "react";
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // 세션이 있는지 확인 -> 지금은 이미 인증된 상태를 가져오기 때문에
    // 세션이 있다면 어떻게 할 것인지 정해주기
    // 로그인 인증에 성공한다면 홈으로 리다이렉트하기
    getSession().then(session => {
      if(session) {
        router.replace('/')
      } else {
        setIsLoading(false)
      }
    })
  }, [router]); // router는 변하지 않아야하기 때문에 의존성 추가하기

  if (isLoading) {
    return <p>Loading...</p>
  }
  return <AuthForm />;
}

export default AuthPage;
