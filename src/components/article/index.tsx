import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Avatar, Card, Text, Button } from "@nextui-org/react";

const Article = ({ fav }: any) => (
  <Card css={{ mw: "600px", padding: '0px 25px 0px 25px', borderRadius: 10 }}>
    <Card.Header>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        <Avatar
          squared
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
        <Text h6 size={14} color="black" style={{ marginLeft: 10 }}>
          Vincent Lemesle
        </Text>
        <div style={{ marginLeft: 'auto' }}>
          {fav ? <AiFillStar color="#800080" size={25} /> : <AiOutlineStar color="#800080" size={25} />}
        </div>
      </div>
    </Card.Header>
    <Card.Body style={{ marginTop: 0, paddingTop: 0 }}>
      <Text h6 size={15} color="black" css={{ m: 0 }}>
        Aujourd'hui, une dispute éclate dans le bus entre un passager et le chauffeur. Je tente de défendre ce dernier, avant qu’il ne me lance : "Merci de me défendre, mais taisez-vous, vous puez de la gueule." VDM
      </Text>
    </Card.Body>
    <Card.Footer>
      <Button style={{ backgroundColor: "rgba(236,236,236,0.5)", marginBottom: 10 }}>
        <Text h6 size={13} color="black">
          Valider cette VDM
        </Text>
      </Button>
    </Card.Footer>
  </Card>
);

export default Article;
