export class InventoryMachine {
  constructor(productId, initialStock, reservationDurationMs = 30000) {
    if (!Number.isInteger(initialStock) || initialStock < 0) {
      throw new RangeError("Initial stock must be a non-negative integer.");
    }

    this.productId = productId;
    this.initialStock = initialStock;
    this.availableStock = initialStock;
    this.reservedStock = 0;
    this.soldStock = 0;
    this.reservationDurationMs = reservationDurationMs;
    this.reservations = new Map();
    this.nextId = 1;
    this.listeners = new Set();
  }

  getSnapshot() {
    return {
      productId: this.productId,
      initialStock: this.initialStock,
      availableStock: this.availableStock,
      reservedStock: this.reservedStock,
      soldStock: this.soldStock,
      reservations: [...this.reservations.values()].map((item) => ({
        ...item,
      })),
    };
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.getSnapshot());

    return () => this.listeners.delete(listener);
  }

  notify() {
    const snapshot = this.getSnapshot();
    this.listeners.forEach((listener) => listener(snapshot));
  }

  assertInvariant() {
    const total = this.availableStock + this.reservedStock + this.soldStock;

    if (
      this.availableStock < 0 ||
      this.reservedStock < 0 ||
      this.soldStock < 0 ||
      total !== this.initialStock
    ) {
      throw new Error("Inventory invariant violated.");
    }
  }

  expireReservations(now = Date.now()) {
    let changed = false;

    for (const reservation of this.reservations.values()) {
      if (reservation.status === "RESERVED" && now >= reservation.expiresAt) {
        reservation.status = "EXPIRED";
        this.reservedStock -= reservation.quantity;
        this.availableStock += reservation.quantity;
        changed = true;
      }
    }

    if (changed) {
      this.assertInvariant();
      this.notify();
    }
  }

  reserve(quantity = 1, now = Date.now()) {
    this.expireReservations(now);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new RangeError("Quantity must be a positive integer.");
    }

    if (quantity > this.availableStock) {
      throw new Error("Not enough stock available.");
    }

    const reservation = {
      id: `R-${this.nextId++}`,
      productId: this.productId,
      quantity,
      status: "RESERVED",
      createdAt: now,
      expiresAt: now + this.reservationDurationMs,
    };

    this.availableStock -= quantity;
    this.reservedStock += quantity;
    this.reservations.set(reservation.id, reservation);

    this.assertInvariant();
    this.notify();

    return { ...reservation };
  }

  checkout(reservationId, now = Date.now()) {
    this.expireReservations(now);

    const reservation = this.reservations.get(reservationId);

    if (!reservation) {
      throw new Error("Reservation not found.");
    }

    if (reservation.status !== "RESERVED") {
      throw new Error(
        `Cannot checkout a ${reservation.status.toLowerCase()} reservation.`,
      );
    }

    if (now >= reservation.expiresAt) {
      this.expireReservations(now);
      throw new Error("Reservation has expired.");
    }

    reservation.status = "CHECKED_OUT";
    this.reservedStock -= reservation.quantity;
    this.soldStock += reservation.quantity;

    this.assertInvariant();
    this.notify();

    return { ...reservation };
  }

  release(reservationId, now = Date.now()) {
    this.expireReservations(now);

    const reservation = this.reservations.get(reservationId);

    if (!reservation) {
      throw new Error("Reservation not found.");
    }

    if (reservation.status !== "RESERVED") {
      throw new Error("Only active reservations can be released.");
    }

    reservation.status = "RELEASED";
    this.reservedStock -= reservation.quantity;
    this.availableStock += reservation.quantity;

    this.assertInvariant();
    this.notify();

    return { ...reservation };
  }
}
