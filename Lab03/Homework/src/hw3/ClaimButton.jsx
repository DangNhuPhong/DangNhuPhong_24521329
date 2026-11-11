export function ClaimButton({ disabled, onClaim }) {
  return (
    <button
      type="button"
      className="action primary"
      disabled={disabled}
      onClick={onClaim}
    >
      Claim Ticket / Crate
    </button>
  );
}
