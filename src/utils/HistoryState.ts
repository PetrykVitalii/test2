import * as H from 'history';

class HistoryState {
  private state?: string;

  private readonly history: H.History;

  public constructor(history: H.History) {
    this.history = history;
  }

  public listener = (_: H.Location, action: H.Action) => {
    this.state = action;
  };

  public goBack = () => {
    if (this.state) {
      this.history.go(-1);
    } else {
      this.history.push('/dashboard');
    }
  };
}

export default HistoryState;
