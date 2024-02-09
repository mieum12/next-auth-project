import UserProfile from '../components/profile/user-profile';
import {getSession} from "next-auth/react";

function ProfilePage() {
  return <UserProfile />;
}

// 로그인 하지 않은 상태에서 프로필 페이지를 들어간다면
// 순간적으로 loading...이 뜬다
// 이것은 프론트에서 리다이렉트를 설정한 것
// 대신 백에서 처리하는 방법 : 서버에서 인증여부를 확인하고 인증되지 않은 경우 리다이렉트

/**
 * getServerSideProps는 들어오는 요청에 엑세스하는 컨텍스트 객체가 생긴다
 */
export async function getServerSideProps(context) {
  // 들어오는 요청에 대한 req키를 설정한 객체를 전달
  // 그러면 자동으로 해당 요청을 살피고
  // 필요한 데이터, 바로 세션 토큰 쿠키를 추출한다
  // 쿠키가 유효한지, 사용자가 인증되었는지 시작하기 전에 쿠키가 있는지 확인
  // 인증되지 않았으면 session이 null이 된다
  const session =await getSession({req: context.req})

  if (!session) {
    // 여기서 반환한 객체는 일반적으로 컴포넌트에 프로퍼티(props)를 설정하는 객체이다
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  // 세션이 있고 로그인 되었을 경우
  return {
    props: {session},
  }
}
export default ProfilePage;
