import { Form, redirect } from "react-router-dom";
import { useSelector } from 'react-redux'


let GlobalEmail = null;

export default function SignUp2() {

  const email = useSelector((state)=> state.signUp.email)
  GlobalEmail = email;
  console.log(GlobalEmail)
  return (
    <div>
      <h1>SignUp2</h1>
        <Form method="post" >

        <input type="hidden" name="email" value={email || undefined} />

      {/* OTP sent success message */}
      <div style={{ color: 'green' }}>
        <span>✔</span> OTP sent successfully!
      </div>

      {/* OTP input fields */}
      <div style={{ fontSize: '30px' }}>
        {/* 4 separate input fields for OTP */}
        <input
          type="text"
          name="otp1"
          maxLength="1"
          style={{ width: '30px', margin: '0 5px' }}
        />
        <input
          type="text"
          name="otp2"
          maxLength="1"
          style={{ width: '30px', margin: '0 5px' }}
        />
        <input
          type="text"
          name="otp3"
          maxLength="1"
          style={{ width: '30px', margin: '0 5px' }}
        />
        <input
          type="text"
          name="otp4"
          maxLength="1"
          style={{ width: '30px', margin: '0 5px' }}
        />
      </div>

      {/* Submit button */}
      <button style={{marginTop: '5px'}} onClick={() => { /* Call action to verify OTP */ }}>
        Verify OTP
      </button>
      </Form>
    </div>
  );
}



  export async function action({ request }) {
    const otpData = await request.formData();
    const otp = `${otpData.get('otp1')}${otpData.get('otp2')}${otpData.get('otp3')}${otpData.get('otp4')}`;
  
      const sendingData = {
        email: GlobalEmail,
        otp: otp,
      }

    const response = await fetch("https://jfsd-backend-project.up.railway.app/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendingData),
    });
  

    if (response.ok) {
      const successMessage = await response.text(); 
      console.log(successMessage); 
      return redirect("/signup/3"); 
    } else {
      const errorMessage = await response.text();
      console.error(errorMessage); 
      throw new Error(errorMessage); 
    }
  }
  

 