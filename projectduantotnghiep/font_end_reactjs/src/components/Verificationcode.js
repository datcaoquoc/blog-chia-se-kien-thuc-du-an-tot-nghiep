import React, { useState, useEffect } from 'react';
import '../css/verificationcode.css';
import OtpInput from 'react-otp-input';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { postVerificationCode } from '../redux/features/auth/authSlice'
import { DialogContainer, dialog } from 'react-dialogify';
import { useHistory  } from 'react-router-dom';
import { Base64 } from 'js-base64';
function Verificationcode() {
  const dispatch = useDispatch()
  let history = useHistory();
  const [code, setCode] = useState('');
  const { isLoading } = useSelector((state) => state.auth);
  const email = history.location.state.account;
  const showDialog = () => {
    dialog.success({
      title: 'Xác thực tài khoản thành công !',
      text: 'Bạn đã xác thực tài khoản thành công, bây giờ bạn có thể đăng nhập và sử dụng dịch vụ của chúng tôi.',
      btnText: 'Đồng ý',
      btnOnClick() { history.push("/auth"); },
    });
  }
  useEffect(() => {
    console.log(email)
  },[])
  const onVerificationCode = () => {
      dispatch(postVerificationCode({ code, email })).unwrap()
        .then((data) => {
          if (data.message === 'Đã xác thực tài khoản') {
            showDialog();
          } else {
            toast.error(data.message)
          }
        })
  }


  return (

    <div className="background">
      {isLoading ? <div className="loader" width="500px" height="500px" ></div> : null}
      <ToastContainer />
      <div className="container-code">
        <DialogContainer />
        <span className="title">Xác thực mã OTP</span>
        <span className="email">Vui lòng nhập mã vừa gửi tới email: {email}</span>
        <OtpInput className="input-otp"
          value={code}
          onChange={setCode}
          numInputs={6}
          isInputNum={true}
          inputStyle={{
            width: "50px",
            height: "60px",
          }}
          containerStyle={{
            margin: "20px auto",
            padding: "10px"
          }}
        />
        <div>
          <span>bạn chưa nhận được mã ?</span> <button className="btn-resend">Gửi lại OTP</button>
        </div>
        <button className="btn-varicode" disabled={code.length < 6} onClick={onVerificationCode}>Xác thực</button>

      </div>
      <div>
        <span className="credit">Sản phẩm được phát triển bởi Trung tâm CNTT MobiFone</span>
      </div>
    </div>
  );
}

export default Verificationcode;