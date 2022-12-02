import { Text } from "@nextui-org/react";
import { useEffect, useState } from "react";

import Layout from "../../components/layout";

const Index = () => {
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [pos, setPos] = useState(undefined);

  useEffect(() => {
    if (!pos) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setPos({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    }
  });

  return (
    <Layout menuIndex={-1}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Text h4 color="#480048" style={{ marginTop: 100 }}>
          Titre
        </Text>
        <textarea
          className="post-input"
          style={{ width: 200, height: 50 }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Text h4 color="#480048">
          Description
        </Text>
        <textarea
          className="post-input"
          style={{ width: 400, height: 100 }}
          onChange={(e) => setDesc(e.target.value)}
        />
        {!pos && (
          <Text h6 color="#480048" style={{ marginTop: 60 }}>
            ce post ne sera pas lié à une localisation (vous n'avez pas accepté de la partager)
          </Text>
        )}
        <button style={{ backgroundColor: '#380038', cursor: 'pointer', width: 150, height: 40, borderRadius: 5, marginTop: pos ? 60 : 5 }}>
          <Text h4 color="#F2F2F2" style={{ padding: 0, margin: 0 }}>
            POSTER
          </Text>
        </button>
      </div>
    </Layout>
  )
}

export default Index;
