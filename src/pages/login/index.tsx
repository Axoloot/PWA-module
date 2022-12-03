import Link from "next/link"
import Image from "next/image";
import { useEffect, useState } from "react";
import logoSvg from "/public/logo.svg";
import { Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import {useUserContext} from "../../providers/userProvider";

const Login = () => {
  const router = useRouter()
  const { user, login } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   if (user) {
  //    router.push("/home");
  //   }
  // }, [ user ])

  return (
    <div className="layout-container">
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Image alt="logo" src={logoSvg} width={150} height={150} style={{ marginTop: '-7%' }} />
        <div
          style={{
            width: '30%',
            height: '50%',
            display: 'flex',
            marginTop: '5%',
            borderRadius: 15,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#2d002d',
          }}>
          <Text h6 color="#F2F2F2">
            Email
          </Text>
          <input
            type="text"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Text h6 color="#F2F2F2">
            Password
          </Text>
          <input
            type="password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={async () => {
              await login(email, password);
            }}
            style={{ backgroundColor: '#F2F2F2', borderRadius: 15, width: 150, height: 50, cursor: 'pointer', marginTop: 60 }}
          >
            <Text h4 color="#2d002d" style={{ padding: 0, margin: 0 }}>
              LOGIN
            </Text>
          </button>
          <Link href="/register">
            <Text h6 color="#F2F2F2" style={{ textDecoration: 'underline', marginTop: 30 }}>
              créer un compte
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
