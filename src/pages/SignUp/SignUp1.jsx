import { Form, redirect } from "react-router-dom";
import store from "../../store";
import { signUpActions } from "../../store/SignUpSlice";

export default function SignUp1() {

  return (
    <Form method="post" action="/signup/1">
      <h2>Sign Up</h2>
      
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      
      <label htmlFor="aadhar">Aadhaar Number:</label>
      <input type="text" id="aadhar" name="aadhar" required pattern="\d{12}" />
      
      <button type="submit">Submit</button>
    </Form>
  );
}

export async function action({ request }) {

    const data = await request.formData();

    const emailData = {
        email: data.get('email'),
        aadharNumber: data.get('aadhar')
    }

    store.dispatch(signUpActions.signUpStage1(emailData))


    const response = await fetch("http://localhost:8082/api/auth/send-otp", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(emailData)
})

    if(!response.ok){
        throw new Error("Could not send data")
    }
    
    return redirect('/signup/2')
}