import { FaArrowAltCircleLeft } from "react-icons/fa";

const LeftButton = (props) => {
  return (
    <div>
      <FaArrowAltCircleLeft onClick={props.left} />
    </div>
  );
};

export default LeftButton;
