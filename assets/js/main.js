var Flux = DeLorean.Flux; 
// Store
var IncrementStore = Flux.createStore({
    // actions are dispatched from the disatcher, and call the method of that name on this store
    actions: {
        'increase': 'increaseTotal'
    },
    // scheme defines the properties on this store
    // that can be set with this.set and will be applied to component's state as this.state.stores[storeName][schemeProperty]
    // store state can also be retrievedfrom within a component with this.getStore('storeName')
    scheme: {
        total: {
            default: 0
        }
    },
    increaseTotal: function () {
        this.set('total', this.state.total + 1);
    }
});


// Dispatcher
var IncrementDispatcher = Flux.createDispatcher({
  // viewTriggers are made available to components with Flux storeListener mixin
  viewTriggers: {
      'increase': 'increaseTotal'
  },
  // this method will be triggered when the 'increase' view trigger is fired from the component
  // this method is a good place to put async work like a server request.
  increaseTotal: function () {
      this.dispatch('increase');
  },
  getStores: function () {
      return {
          increment: IncrementStore
      };
  }
});


// Component
var IncrementView = React.createClass({

    mixins: [Flux.mixins.storeListener],
    
    // Changes on these stores will cause state changes on this component
    // If watchStores is omitted, all stores will be watched     
    watchStores: ['increment'],

    render: function() {
        return <div className="container">
            <div>Total: {this.getStore('increment').total}</div>
            <button onClick={this.handleIncrease}>Increase</button>
        </div>;
    },
    handleIncrease: function () {
        this.trigger('increase');
    }
});
 
React.render(<IncrementView dispatcher={IncrementDispatcher} />, document.body);
