import PropTypes from "prop-types";

function WriteButton({ onClick }) {
  return (
    <button className="write-button" onClick={onClick}>
      Write
    </button>
  );
}

WriteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default WriteButton;
