import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
let defaultImage ='https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/ufo-image-nasa-155143918-16x9.jpg?VersionId=RCJwBTH93OauJFzgZf9QemLMZhkNsqkH'
export  class News extends Component {

  static defaultProps={
    PageSize: 6,
    country:'in',
    category:'general'
  }
  static propTypes ={
    pageSize:PropTypes.number,
    country: PropTypes.string,
    category:PropTypes.string
   }
  constructor(){
    super()
    this.state={
      articles:[] ,
      loading: false,
      page:1
    }

  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=8e6be48dd1384026baf1d0d130093c82&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({articles: parsedData.articles,
    totalResults:parsedData.totalResults,
    loading:false
    })
  }
  handlePrevClick= async()=>{
    if(this.state.page>1){
      let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=8e6be48dd1384026baf1d0d130093c82&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(url)
      let parsedData = await data.json()
      console.log(parsedData)
      this.setState({articles: parsedData.articles,
        page:this.state.page-1,
        loading: false
      })
    }
    
    
  }
  handleNextClick = async()=>{
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=8e6be48dd1384026baf1d0d130093c82&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json() 
      this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
      })
}

  }
  render() {
    return (
      <div className='container my-3' >
        <h1 className='container text-center'>News monkey- top headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>

         
          {!this.state.loading && this.state.articles.map((element)=>{
          return <div className='col-md-4' key={element.url}>
          <NewsItem title={element.title} description={element.description} newsUrl={element.url} imageUrl={element.urlToImage?element.urlToImage:defaultImage}/>
          </div>
          }
          )}
        
        </div>
        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page===1}type="button" className="btn btn-primary my-3" onClick={this.handlePrevClick}>&larr; prev</button>
        <button disabled={this.state.page>= Math.ceil(this.state.totalResults/this.props.pageSize)}onClick={this.handleNextClick} type="button" className="btn btn-primary my-3">next &rarr;</button>

        </div>
        
      </div>
    )
  }
}

export default News

