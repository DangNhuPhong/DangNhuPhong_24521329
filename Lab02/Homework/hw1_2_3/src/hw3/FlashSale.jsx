import { useEffect, useRef, useState } from "react";
import { createAntiDriftTimer } from "./antiDriftTimer.js";
import { InventoryMachine } from "./inventoryMachine.js";

const SALE_DURATION_MS = 5 * 60 * 1000;
const RESERVATION_DURATION_MS = 30 * 1000;

function formatTime(milliseconds) {
  const total = Math.max(0, Math.floor(milliseconds));
  const minutes = Math.floor(total / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  const ms = total % 1000;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

export default function FlashSale() {
  const machineRef = useRef(null);
  const [inventory, setInventory] = useState(null);
  const [remaining, setRemaining] = useState(SALE_DURATION_MS);
  const [saleEnded, setSaleEnded] = useState(false);
  const [message, setMessage] = useState("Flash sale is ready.");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const machine = new InventoryMachine(
      "FLASH-001",
      10,
      RESERVATION_DURATION_MS,
    );

    machineRef.current = machine;
    const unsubscribe = machine.subscribe(setInventory);

    const stopTimer = createAntiDriftTimer(
      SALE_DURATION_MS,
      setRemaining,
      () => {
        setSaleEnded(true);
        setMessage("Flash sale has ended. New reservations are disabled.");
      },
    );

    const expiryTimer = window.setInterval(() => {
      machine.expireReservations();
    }, 250);

    return () => {
      stopTimer();
      window.clearInterval(expiryTimer);
      unsubscribe();
    };
  }, []);

  function reserve() {
    if (saleEnded || remaining <= 0) {
      setMessage("The flash sale has ended.");
      return;
    }

    try {
      const reservation = machineRef.current.reserve(quantity);
      setSelectedReservation(reservation.id);
      setMessage(
        `${reservation.id} reserved ${reservation.quantity} unit(s). Hold expires in 30 seconds.`,
      );
    } catch (error) {
      setMessage(error.message);
    }
  }

  function checkout() {
    if (!selectedReservation) {
      setMessage("Reserve a product before checkout.");
      return;
    }

    try {
      const order = machineRef.current.checkout(selectedReservation);
      setMessage(`Checkout successful for ${order.id}.`);
      setSelectedReservation(null);
    } catch (error) {
      setMessage(error.message);
    }
  }

  function release() {
    if (!selectedReservation) {
      setMessage("There is no selected reservation to release.");
      return;
    }

    try {
      const result = machineRef.current.release(selectedReservation);
      setMessage(`Reservation ${result.id} released.`);
      setSelectedReservation(null);
    } catch (error) {
      setMessage(error.message);
    }
  }

  const reservations = inventory?.reservations ?? [];
  const activeReservation = reservations.find(
    (item) => item.id === selectedReservation && item.status === "RESERVED",
  );

  return (
    <section className="panel" aria-labelledby="sale-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">HOMEWORK 03</p>
          <h2 id="sale-heading">11.11 Flash Sale Engine</h2>
          <p>Anti-drift countdown, inventory reservations and checkout.</p>
        </div>
        <span
          className={saleEnded ? "status-pill status-danger" : "status-pill"}
        >
          {saleEnded ? "Sale ended" : "Sale active"}
        </span>
      </div>

      <div className="sale-hero">
        <p className="eyebrow">FLASH SALE ENDS IN</p>
        <output className="countdown" aria-live="off">
          {formatTime(remaining)}
        </output>
        <p className="muted">
          Timestamp-based countdown. Reservation hold: 30 seconds.
        </p>
      </div>

      <div className="product-card">
        <div className="product-art" aria-hidden="true">
          ⚡
        </div>
        <div className="product-details">
          <span className="eyebrow">LIMITED OFFER</span>
          <h3>Flash Sale Product</h3>
          <p>Demo product · Stock controlled by the inventory state machine.</p>
          <strong className="product-price">₫199,000</strong>
        </div>
      </div>

      {inventory && (
        <div className="stock-grid">
          <div className="stock-card">
            <span>Available</span>
            <strong>{inventory.availableStock}</strong>
          </div>
          <div className="stock-card">
            <span>Reserved</span>
            <strong>{inventory.reservedStock}</strong>
          </div>
          <div className="stock-card">
            <span>Sold</span>
            <strong>{inventory.soldStock}</strong>
          </div>
        </div>
      )}

      <div className="toolbar">
        <label>
          Quantity
          <select
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          >
            {[1, 2, 3].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </label>
        <button
          className="button button-primary"
          onClick={reserve}
          disabled={saleEnded}
        >
          Reserve stock
        </button>
        <button
          className="button button-primary"
          onClick={checkout}
          disabled={!activeReservation}
        >
          Checkout
        </button>
        <button
          className="button button-secondary"
          onClick={release}
          disabled={!activeReservation}
        >
          Release
        </button>
      </div>

      <p className="notice" role="status" aria-live="polite">
        {message}
      </p>

      <div className="section-heading compact-heading">
        <h3>Reservation history</h3>
        <span className="muted">{reservations.length} records</span>
      </div>

      {reservations.length === 0 ? (
        <p className="empty-state">No reservations yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <caption className="sr-only">
              Flash sale reservation history
            </caption>
            <thead>
              <tr>
                <th scope="col">Reservation</th>
                <th scope="col">Quantity</th>
                <th scope="col">Status</th>
                <th scope="col">Expires</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.quantity}</td>
                  <td>{reservation.status}</td>
                  <td>
                    {new Date(reservation.expiresAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="help-text">
        This is an in-browser simulation. A real multi-user flash sale needs
        server-side atomic stock updates and payment verification.
      </p>
    </section>
  );
}
