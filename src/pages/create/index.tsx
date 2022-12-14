import { Text } from "@nextui-org/react";
import { useEffect, useState } from "react";

import Layout from "../../components/layout";
import { usePostContext } from "../../providers/postsProvider";
import { useUserContext } from "../../providers/userProvider";

import Image from "next/image";

interface Coords {
  lat: number;
  lng: number;
}

const Index = () => {
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [pos, setPos] = useState<Coords | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { submitPost } = usePostContext();
  const { user } = useUserContext();

  useEffect(() => {
    if (!pos) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setPos({ lat: position.coords.latitude, lng: position.coords.longitude });
          setLoading(false);
        }, function (err) {
          setLoading(false);
        }
      );
    }
  }, []);

  return (
    <Layout menuIndex={-1}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
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
        </div>

        {pos && JSON.stringify(pos)}
        {!pos && (
          <Text h6 color="#480048" style={{ marginTop: 60 }}>
            {
              loading ?
                'chargement' :
                "ce post ne sera pas lié à une localisation (vous n'avez pas accepté de la partager)"
            }
          </Text>
        )}
        <button
          onClick={() =>
            submitPost({
              title,
              content: desc,
              author: user?.pseudo ?? 'Anonyme',
              geolocation: pos,
              userId: user?._id,
              authorImg: user?.profilImg || 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
            })
        }
          style={{ backgroundColor: '#380038', cursor: 'pointer', width: 150, height: 40, borderRadius: 5, marginTop: pos ? 60 : 5 }}
        >
          <Text h4 color="#F2F2F2" style={{ padding: 0, margin: 0 }}>
            POSTER
          </Text>
        </button>
      </div>
    </Layout>
  )
}

export default Index;
