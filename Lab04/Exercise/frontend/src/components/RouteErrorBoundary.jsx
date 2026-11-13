import { Component } from "react";

export default class RouteErrorBoundary extends Component {
  state = {
    failed: false,
  };

  static getDerivedStateFromError() {
    return {
      failed: true,
    };
  }

  render() {
    if (this.state.failed) {
      return (
        <section className="detail-card" role="alert">
          <h3>Could not load this page</h3>

          <p>Check your connection and reload.</p>

          <button type="button" onClick={() => window.location.reload()}>
            Reload
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
