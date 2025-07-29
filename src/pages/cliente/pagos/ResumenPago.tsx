
const ResumenPago = ({ transaccion }) => {
  const {
    transactionId,
    orderId,
    authorizationCode,
    responseMessage,
    paymentNetwork,
    cardType,
    operationDate
  } = transaccion.transactionResponse;

  const fecha = new Date(operationDate).toLocaleString();

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-success mb-4">¡Pago aprobado!</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>ID de transacción:</strong> {transactionId}
            </li>
            <li className="list-group-item">
              <strong>ID de orden:</strong> {orderId}
            </li>
            <li className="list-group-item">
              <strong>Código de autorización:</strong> {authorizationCode}
            </li>
            <li className="list-group-item">
              <strong>Red de pago:</strong> {paymentNetwork}
            </li>
            <li className="list-group-item">
              <strong>Tipo de tarjeta:</strong> {cardType}
            </li>
            <li className="list-group-item">
              <strong>Mensaje:</strong> {responseMessage}
            </li>
            <li className="list-group-item">
              <strong>Fecha de operación:</strong> {fecha}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumenPago;
