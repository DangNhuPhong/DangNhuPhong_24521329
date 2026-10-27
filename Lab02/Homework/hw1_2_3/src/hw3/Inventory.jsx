import { useEffect, useState } from "react";
import { InventoryMachine } from "./inventoryMachine.js";

export default function Inventory() {
  const [machine] = useState(
    () => new InventoryMachine("PRODUCT-001", 10, 30000),
  );

  const [snapshot, setSnapshot] = useState(() => machine.getSnapshot());
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("Inventory ready.");

  useEffect(() => {
    const unsubscribe = machine.subscribe(setSnapshot);

    const timer = setInterval(() => {
      machine.expireReservations();
    }, 500);

    return () => {
      unsubscribe();
      clearInterval(timer);
    };
  }, [machine]);

  function handleReserve() {
    try {
      const reservation = machine.reserve(Number(quantity));

      setMessage(`Reservation ${reservation.id} created successfully.`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleCheckout(id) {
    try {
      const reservation = machine.checkout(id);

      setMessage(`Reservation ${reservation.id} checked out successfully.`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleRelease(id) {
    try {
      const reservation = machine.release(id);

      setMessage(`Reservation ${reservation.id} released successfully.`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="panel" aria-labelledby="inventory-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">HOMEWORK 03</p>
          <h2 id="inventory-heading">Inventory Management</h2>
          <p>Stock reservations, checkout, release and expiration.</p>
        </div>

        <span className="status-pill">Inventory active</span>
      </div>

      <p className="notice" role="status" aria-live="polite">
        {message}
      </p>

      <div className="inventory-stats">
        <div className="stat-card">
          <span>Available</span>
          <strong>{snapshot.availableStock}</strong>
        </div>

        <div className="stat-card">
          <span>Reserved</span>
          <strong>{snapshot.reservedStock}</strong>
        </div>

        <div className="stat-card">
          <span>Sold</span>
          <strong>{snapshot.soldStock}</strong>
        </div>

        <div className="stat-card">
          <span>Initial stock</span>
          <strong>{snapshot.initialStock}</strong>
        </div>
      </div>

      <div className="inventory-form">
        <label className="search-field">
          Quantity to reserve
          <input
            type="number"
            min="1"
            max={snapshot.availableStock}
            step="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
        </label>

        <button
          className="button button-primary"
          onClick={handleReserve}
          disabled={
            snapshot.availableStock === 0 ||
            !Number.isInteger(Number(quantity)) ||
            Number(quantity) <= 0
          }
        >
          Reserve stock
        </button>
      </div>

      <div className="section-heading compact-heading">
        <h3>Reservations</h3>
        <span className="muted">{snapshot.reservations.length} total</span>
      </div>

      {snapshot.reservations.length === 0 ? (
        <p className="empty-state">No reservations yet.</p>
      ) : (
        <ul className="task-list">
          {snapshot.reservations.map((reservation) => (
            <li key={reservation.id} className="task-row">
              <div>
                <strong>{reservation.id}</strong>
                <p>Quantity: {reservation.quantity}</p>
                <span className="muted">Status: {reservation.status}</span>
                {reservation.status === "RESERVED" && (
                  <p className="muted">
                    Expires at:{" "}
                    {new Date(reservation.expiresAt).toLocaleTimeString()}
                  </p>
                )}
              </div>

              {reservation.status === "RESERVED" && (
                <div className="audio-controls">
                  <button
                    className="button button-primary"
                    onClick={() => handleCheckout(reservation.id)}
                  >
                    Checkout
                  </button>

                  <button
                    className="button button-secondary"
                    onClick={() => handleRelease(reservation.id)}
                  >
                    Release
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <p className="help-text">
        Reservations expire after 30 seconds. Expired or released reservations
        return their quantities to available stock. Checked-out quantities are
        counted as sold.
      </p>
    </section>
  );
}
