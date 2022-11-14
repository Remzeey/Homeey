import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Signin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.push("/");
  }
  const loginVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      y: "30vh",
      transition: {
        opacity: {
          ease: "easeIn",
          duration: 0.5,
          delay: 0.1,
        },
      },
    },
    exit: {
      opacity: 0,
      y: "-100vh",
      transition: {
        y: {
          ease: "easeOut",
          duration: 1,
          delay: 0.5,
        },
      },
    },
  };

  return (
    <div className="bg-grey-900 w-screen min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <AnimatePresence>
        <motion.div
          variants={loginVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-2/3 rounded-lg z-20 bg-white text-slate-800 shadow-2xl flex flex-col justify-center my-auto items-center mx-auto"
        >
          <h1 className="font-bold text-xl text-slate-900 ">Sign In</h1>
          {/* <label className="m-3">
            Email
            <br />
            <input
              type="text "
              className="w-11/12 rounded-md p-1 border-2 border-slate-700  "
              placeholder="Email"
            />
          </label>
          <label className="m-3">
            Password
            <br />
            <input
              type="password"
              placeholder="password"
              className="w-11/12 border-2 rounded-md p-1 border-slate-700  "
            />
          </label>
          <button className="bg-slate-900 text-white w-1/12 font-bold  m-3 p-1 rounded-md">
            Log In
          </button> */}

          <button
            className="bg-slate-900 text-white w-1/4 m-3 p-1 rounded-md"
            onClick={() => {
              signIn("google");
            }}
          >
            Sign in with Google
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default Signin;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/", //you can use environment variable to hide call back url
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
