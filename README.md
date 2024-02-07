# NextJs 인증 시스템: NextAuth 패키지의 사용

 next-auth 로 업데이트하기 위한 v4 마이그레이션 공식 안내서를 참조

https://next-auth.js.org/getting-started/upgrade-v4

next-auth는 스스로 작업을 수행하지 않기 때문에 사용자 계정에 대한 인증체계를 구축할때 먼저 사용자를 생성(추가)하는 로직을 구성해야한다. 그래야 NextAuth.js에서 그 사용자에 대한 인증을 진행하고 사용자에게서 토큰을 가져오기 때문이다.
