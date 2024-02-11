import React, {useRef, useState} from 'react';
import classes from './auth-form.module.css';
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";

async function createUser(email, password) {

  // 요청 전송
  // 응답을 대기하고 처리한다
  console.log('요청 이제 시작..💙')
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({email,password}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log('요청 끝남..💙')

  console.log('======> response: ',response)

  const data = await response.json()

  if (!response.ok) {
    throw new Error(`'에러가 생겼음!!',data.message` || 'error!!!!')
  }
  console.log('data:', data)
  return data
}

function AuthForm() {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [isLogin, setIsLogin] = useState(true);
  const router =useRouter()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(e) {
    e.preventDefault();

    // ref가 있으니 데이터를 가져올 수 있다
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // 이 곳에 유효성 검사 넣을 수도 있다

    if (isLogin) {
      // 사용자를 로그인시킴
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      })
      console.log('result', result)

      //에러가 안나고 제대로 로그인에 성공하면
      // 리다이렉트 진행
      if(!result.error) {
        // auth 상태를 저장

        // window.location.herf으로 리다이렉트하면
        // 애플리케이션 전체가 재설정된다
        // 그렇게 되면 초기 페이지 로딩에는 문제 없지만
        // SPA 작업을 진행중인데 그러면 전체 페이지를 재설정해서
        // 그동안의 설정 상태를 다 잃는 위험이 있다
        // 그러므로 여기서는 useRouter hook을 사용한다
        router.replace('/profile')
      }
    } else {
      try {
        // create mode 라면 사용자를 생성하게 한다
        const result = await createUser(enteredEmail, enteredPassword)
        console.log('사용자 생성!',result)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
