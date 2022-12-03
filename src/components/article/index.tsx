import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Avatar, Card, Text, Button } from "@nextui-org/react";
import { IPost } from "../../lib/models/Post";
import { HeartIcon } from "../Heart";
import { usePostContext } from "../../providers/postsProvider";

const Article = ({ fav, post }: { fav: boolean, post: IPost }) => {
  const { like } = usePostContext();

  const {
    _id,
    title,
    content,
    likes,
    author,
    geolocation
  } = post;

  return (
    <Card css={{ mw: "600px", padding: '0px 25px 0px 25px', borderRadius: 10 }}>
      <Card.Header>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Avatar
              squared
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
            <div style={{ flex: 2 }}>
              <Text h6 size={14} color="black" style={{ marginLeft: 10 }}>
                {author}
              </Text>
            </div>
          </div>
          <Text h6 size={18} color="black" >
            {title}
          </Text>
          {/* {
            <div style={{ marginLeft: 'auto' }}>
              {fav ? <AiFillStar color="#800080" size={25} /> : <AiOutlineStar color="#800080" size={25} />}
            </div>
          } */}
        </div>
      </Card.Header>
      <Card.Body style={{ marginTop: 0, paddingTop: 0 }}>
        <Text h6 size={15} color="black" css={{ m: 0 }}>
          {content}
        </Text>
      </Card.Body>
      <Card.Footer>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
          <Button style={{ backgroundColor: "rgba(236,236,236,0.5)", marginBottom: 10 }}
            onClick={() => _id && like(_id)}>
            <Text h6 size={13} color="black">
              Valider cette VDM
            </Text>
          </Button>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <HeartIcon fill="red" filled size={20} height={20} width={20} label={likes || 0} />
            {likes}
          </div>
        </div>
      </Card.Footer>
    </Card>
  )
};

export default Article;
