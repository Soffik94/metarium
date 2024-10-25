import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const RightButton = (props) => {
  return (
    <div>
      <FaArrowAltCircleRight onClick={props.right} />
    </div>
  );
};

export default RightButton;
