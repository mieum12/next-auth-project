import classes from './profile-form.module.css';
import {useRef} from "react";

function ProfileForm(props) {
  const oldPasswordRef = useRef()
  const newPasswordRef = useRef()

  function submitHandler(e) {
    e.preventDefault()
    const enteredOldPassword = oldPasswordRef.current.value
    const enteredNewPassword = newPasswordRef.current.value

    // 유효성 검사 넣어도 됨

    // HTTP 요청을 보내는 부모 컴포넌트로 해당 데이터를 전달
    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
