class APIFetch extends Component {
    constructor(props){
      super(props)
      this.state = {
        data: null,
        isError: false,
        isFetching: true
      }
    }
  
    async componentWillMount(){
      const header = this.props.optionalHeader?this.props.optionalHeader:null
      await fetch(this.props.fetchPath, header)
        .then(response => response.json())
        .then(data => this.setState({data: data}))
        .catch((err) => this.setState({isError: err}))
    }
  
    render() {
      return this.props.render(this.state)
    }
  }

  const fetchHOC = (WrappedComponent, fetchPath, optionalHeader) => {
    return class extends Component {
      constructor(props){
        super(props)
        this.state = {
          data: null,
          isError: false,
          isFetching: true
        }
      }
  
      async componentWillMount(){
        var header = optionalHeader?optionalHeader:null
        await fetch(fetchPath, header)
          .then(response => response.json())
          .then(data => this.setState({data: data}))
          .catch((err) => this.setState({isError: err}))
      }
  
      render() {
        return <WrappedComponent 
                  data={this.state.data} 
                  isError={this.state.isError} 
                  isFetching={this.state.isFetching}
                  {...props} />
      }
    }
  }