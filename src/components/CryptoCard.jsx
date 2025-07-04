const CryptoCard = ({ name, price }) => {
  return (
    <div className="col-md-2 p-1">
      <div className="card">
        <h5 className="card-header">{name.toUpperCase()}</h5>
        <div className="card-body">
          <p className="card-text">
            {price ? `$${parseFloat(price).toFixed(2)}` : "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
