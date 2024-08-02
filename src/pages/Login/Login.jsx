import { signInWithPopup } from "firebase/auth";
import { auth, db, fbProvider } from "../../firebase/config";
import FacebookIcon from '@mui/icons-material/Facebook';
import {addDocument} from "../../firebase/services"
import { collection, getDocs, query, where } from "firebase/firestore";
export default function Login() {
  const handleLogin = async () => {
    try {
      const userCredential  = await signInWithPopup(auth, fbProvider);
      const user = userCredential.user
      console.log(user)


      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Adding to database...");
        addDocument("users", {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: user.providerData[0].providerId,
        });
      }


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="flex justify-center w-full items-center">
            <div>
              
              <button
                onClick={handleLogin}
                className="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mt-4"
              >
                <FacebookIcon/>
                <span className="ml-2">Sign in with Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
