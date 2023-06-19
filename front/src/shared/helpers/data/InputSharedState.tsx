class InputSharedState {
    private static instance: InputSharedState;
    private state: Record<string, any>;
  
    private constructor() {
      this.state = {};
    }
  
    static getInstance(): InputSharedState {
      if (!InputSharedState.instance) {
        InputSharedState.instance = new InputSharedState();
      }
      return InputSharedState.instance;
    }
  
    getState(): Record<string, any> {
      return this.state;
    }
  
    setState(newState: Record<string, any>): void {
      this.state = { ...this.state, ...newState };
    }
  }
  
  export default InputSharedState;
  