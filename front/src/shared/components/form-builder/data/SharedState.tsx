class SharedState {
    private static instance: SharedState;
  
    protected constructor() {
      // Constructor implementation
    }
  
    static getInstance(): SharedState {
      if (!this.instance) {
        this.instance = new SharedState();
      }
      return this.instance;
    }
  }
  
  export default SharedState;
  