import PropTypes from "prop-types";

const DonHangButton = ({ title, handleFunction }) => {
  return (
    <button
      className="rounded-lg bg-black px-2 py-1 text-white hover:bg-slate-600"
      onClick={handleFunction}
    >
      {title}
    </button>
  );
};

DonHangButton.propTypes = {
  title: PropTypes.string.isRequired,
  handleFunction: PropTypes.func.isRequired,
};

export default DonHangButton;
